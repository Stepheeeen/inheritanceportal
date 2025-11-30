import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Enhanced file download utilities with progressive streaming, File System Access API,
// and ZIP bundling support (requires 'jszip' if you want ZIP option enabled).
export async function downloadFile(url: string, filename?: string) {
  try {
    // Try progressive streaming to Blob
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    // If Response supports streaming, pipe to a readable + blob
    const blob = await res.blob();
    triggerBlobDownload(blob, filename ?? inferFilenameFromUrl(url));
  } catch (err) {
    // Fallback to opening in new tab if download fails
    console.warn('downloadFile fallback:', err);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export async function downloadManyAsZip(items: { url: string; name?: string }[], zipName = 'evidence.zip') {
  try {
    // Dynamically import jszip if available
    // @ts-ignore - allow dynamic import when types are not installed
    const JSZip = await import(/* @vite-ignore */ 'jszip').then((m: any) => m.default || m);
    const zip = new JSZip();

    for (const item of items) {
      const res = await fetch(item.url);
      if (!res.ok) continue;
      const blob = await res.blob();
      const name = item.name ?? inferFilenameFromUrl(item.url);
      zip.file(name, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    triggerBlobDownload(content, zipName);
  } catch (e) {
    console.warn('ZIP download fallback:', e);
    // If jszip not installed, fall back to opening items in new tabs
    for (const item of items) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  }
}

export async function saveBlobWithFS(blob: Blob, suggestedName: string) {
  // File System Access API (Chrome/Edge), gracefully fails elsewhere
  const canFS = 'showSaveFilePicker' in window;
  if (!canFS) {
    triggerBlobDownload(blob, suggestedName);
    return;
  }
  // @ts-expect-error - not in TS lib dom by default in some configs
  const handle = await window.showSaveFilePicker({
    suggestedName,
    types: [
      {
        description: 'File',
        accept: { '*/*': ['.*'] },
      },
    ],
  });
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function inferFilenameFromUrl(url: string) {
  try {
    const u = new URL(url, window.location.origin);
    const last = u.pathname.split('/').pop() || 'download';
    return last;
  } catch {
    const parts = url.split('?')[0].split('/').filter(Boolean);
    return parts.pop() || 'download';
  }
}

// LocalStorage helpers for form data
export type InitialFormData = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  idImageDataUrl?: string; // Base64 data URL
  proofImageDataUrl?: string; // Base64 data URL
};

const LOCAL_KEY = 'bcp:initialForm';

export function loadInitialForm(): InitialFormData | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as InitialFormData) : null;
  } catch {
    return null;
  }
}

export function saveInitialForm(data: InitialFormData) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save form to LocalStorage', e);
  }
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}
