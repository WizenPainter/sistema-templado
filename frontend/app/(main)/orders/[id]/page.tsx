'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Printer, MapPin } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for demonstration
const orderData = {
  id: 'ORD-001',
  client: 'Acme Corporation',
  paymentStatus: 'Paid',
  productionStatus: 'In Progress',
  deliveryAddress: '123 Main St, Anytown, AN 12345',
  items: [
    { id: 1, name: 'Glass Panel A', quantity: 5, status: 'Cutting', lastUpdated: '2023-06-15T10:30:00Z' },
    { id: 2, name: 'Glass Panel B', quantity: 3, status: 'Tempering', lastUpdated: '2023-06-16T14:45:00Z' },
    { id: 3, name: 'Glass Panel C', quantity: 2, status: 'Finished', lastUpdated: '2023-06-17T09:15:00Z' },
  ],
}

export default function OrderDetails() {
  const { id } = useParams()
  const [printType, setPrintType] = useState('sticker')

  const handlePrint = () => {
    // Implement print logic here
    console.log(`Printing ${printType} for order ${orderData.id}`)
  }

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(orderData.deliveryAddress)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Order Details: {orderData.id}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Client</Label>
              <p className="font-medium">{orderData.client}</p>
            </div>
            <div>
              <Label>Payment Status</Label>
              <p className="font-medium">{orderData.paymentStatus}</p>
            </div>
            <div>
              <Label>Production Status</Label>
              <p className="font-medium">{orderData.productionStatus}</p>
            </div>
            <div>
              <Label>Delivery Address</Label>
              <p className="font-medium">{orderData.deliveryAddress}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={openGoogleMaps}>
                <MapPin className="mr-2 h-4 w-4" />
                View on Google Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{item.status}</td>
                    <td className="py-2">{formatDate(item.lastUpdated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Print Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Select value={printType} onValueChange={setPrintType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select print type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sticker">Sticker</SelectItem>
                <SelectItem value="order-pdf">Order PDF</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print {printType === 'sticker' ? 'Sticker' : 'Order PDF'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}