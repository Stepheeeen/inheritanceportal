"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CheckCircle, FileText } from "lucide-react"

interface InitialFormProps {
  onSubmit: (data: any) => void
}

interface FormData {
  fullName: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  // replaced text fields with file metadata
  proofOfRelationshipFileName: string
  nationalIdFileName: string
  will: string
  lawyerName: string
  bankName: string
  accountNumber: string
  accountHolder: string
}

export default function InitialForm({ onSubmit }: InitialFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    proofOfRelationshipFileName: "",
    nationalIdFileName: "",
    will: "",
    lawyerName: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  })

  // load saved data (text + file names) from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("initialFormData")
      if (saved) {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }))
      }
    } catch {}
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange =
    (key: "proofOfRelationshipFileName" | "nationalIdFileName") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setFormData((prev) => ({ ...prev, [key]: file.name }))
      }
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // persist (excluding actual file binary)
    try {
      localStorage.setItem("initialFormData", JSON.stringify(formData))
    } catch {}
    setSubmitted(true)
    setTimeout(() => {
      onSubmit(formData)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-16 h-16 text-[#CDAA4A]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0C1B33] mb-4">Application Received</h1>
          <p className="text-gray-600 mb-2">Your inheritance claim information has been securely submitted.</p>
          <p className="text-sm text-gray-500">Redirecting to your case overview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0C1B33] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Inheritance Portal</h1>
          <p className="text-lg text-gray-200">Submit your inheritance claim information and required documents.</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                <FormField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <div className="md:col-span-2">
                  <FormField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Document Information (file uploads) */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Required Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UploadField
                  label="Proof of Relationship Document"
                  fileName={formData.proofOfRelationshipFileName}
                  onChange={handleFileChange("proofOfRelationshipFileName")}
                />
                <UploadField
                  label="National ID / Passport"
                  fileName={formData.nationalIdFileName}
                  onChange={handleFileChange("nationalIdFileName")}
                />
                <FormField
                  label="Will (if available)"
                  name="will"
                  placeholder="Reference or description"
                  value={formData.will}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Name of Lawyer Handling the Matter"
                  name="lawyerName"
                  value={formData.lawyerName || "John Richardson, Esq."}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Banking Information */}
            <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
              <h2 className="text-xl font-bold text-[#0C1B33] mb-6">Banking Information (For Fund Transfer)</h2>
              <p className="text-sm text-gray-600 mb-6">
                This information will be used solely for processing your inheritance disbursement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                />
                <div className="md:col-span-2">
                  <FormField
                    label="Account Holder Name"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-[#F5F5F5] border-l-4 border-[#CDAA4A] p-6 rounded">
              <p className="text-sm text-[#0C1B33] font-semibold mb-3">Data Security & Compliance</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✔ End-to-end encryption for all submissions</li>
                <li>✔ GDPR and data protection compliance</li>
                <li>✔ Secure document storage and processing</li>
                <li>✔ Your information will never be shared with third parties without consent</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#0C1B33] hover:bg-[#1a2a47] text-white font-bold py-4 px-6 rounded-lg transition duration-200"
              >
                Submit Claim & Continue
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
  placeholder?: string
  required?: boolean
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}: FormFieldProps) {
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
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-[#D4D4D4] rounded-lg focus:outline-none focus:border-[#0C1B33] focus:ring-2 focus:ring-[#E8D9B5] bg-white text-[#0C1B33] placeholder-gray-400"
      />
    </div>
  )
}

interface UploadFieldProps {
  label: string
  fileName: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
}

function UploadField({ label, fileName, onChange, accept = ".pdf,.jpg,.jpeg,.png" }: UploadFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#0C1B33] mb-3">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative border-2 border-dashed border-[#D4D4D4] rounded-lg p-6 hover:border-[#0C1B33] transition cursor-pointer text-center">
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          required
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <FileText className="w-6 h-6 text-[#CDAA4A] mx-auto mb-2" />
        <p className="text-sm font-semibold text-[#0C1B33]">
          {fileName ? `Selected: ${fileName}` : "Click or drag file here"}
        </p>
        <p className="text-xs text-gray-500 mt-1">Accepted: PDF, JPG, PNG</p>
      </div>
    </div>
  )
}
