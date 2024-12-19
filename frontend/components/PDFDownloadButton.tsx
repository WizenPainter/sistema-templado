// components/PDFDownloadButton.tsx
'use client'

import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { useParams } from "next/navigation"

interface PDFDownloadButtonProps {
  orderId: string
}

export function PDFDownloadButton({ orderId }: PDFDownloadButtonProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/orders/${orderId}/pdf`)
      if (!response.ok) throw new Error('Failed to generate PDF')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `order_${orderId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      // Handle error (show toast notification, etc.)
    }
  }

  return (
    <Button onClick={handleDownload} variant="outline" size="sm">
      <FileDown className="mr-2 h-4 w-4" />
      Download PDF
    </Button>
  )
}

// Add to your order detail page
export default function OrderDetail() {
  const { id } = useParams()

  if (!id) return null
  
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Order {id}</h1>
        <PDFDownloadButton orderId={id} />
      </div>
      {/* Rest of your order detail content */}
    </div>
  )
}