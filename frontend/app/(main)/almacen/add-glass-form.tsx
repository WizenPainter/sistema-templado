'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addGlassItem } from '@/app/actions/add-glass'
import { getLocations, addLocation } from '@/app/actions/location-actions'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'

import type { Location } from '@/lib/types'

const glassTypes = [
  { value: 'CLARO', label: 'Cristal Claro' },
  { value: 'FILTRASOL', label: 'Cristal Filtrasol' },
  { value: 'SKN', label: 'Cristal SKN' },
  { value: 'SKS', label: 'Cristal SKS' },
  { value: 'ESPEJO', label: 'Espejo' },
  { value: 'GRIS', label: 'Cristal Gris' },
  { value: 'BRONCE', label: 'Cristal Bronce' },
  { value: 'ULTRA_CLARO', label: 'Cristal Ultra Claro' },
  { value: 'SATINADO', label: 'Cristal Satinado' },
]

const thicknessOptions = [3, 4, 6, 8, 10, 12, 19]

export default function AddGlassForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<Location[]>([])
  const [showNewLocationForm, setShowNewLocationForm] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [selectedThickness, setSelectedThickness] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  useEffect(() => {
    async function fetchLocations() {
      const locationsData: Location[] = await getLocations()
      setLocations(locationsData)
    }
    fetchLocations()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('type', selectedType)
      formData.append('thickness', selectedThickness)
      formData.append('width', event.currentTarget.width.value)
      formData.append('height', event.currentTarget.height.value)
      formData.append('quantity', event.currentTarget.quantity.value)
      formData.append('location', selectedLocation)

      const result = await addGlassItem(formData)
      if (result.success) {
        toast.success('Glass item added successfully')
        router.push('/almacen')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to add glass item')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddLocation(formData: FormData) {
    try {
      const result = await addLocation(formData)
      if (result.success) {
        toast.success('Location added successfully')
        setShowNewLocationForm(false)
        const updatedLocations = await getLocations()
        setLocations(updatedLocations)
      } else {
        toast.error('Failed to add location')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add Glass Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Glass Type</Label>
            <Select name="type" required value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {glassTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="thickness">Thickness (mm)</Label>
            <Select name="thickness" required value={selectedThickness} onValueChange={setSelectedThickness}>
              <SelectTrigger>
                <SelectValue placeholder="Select thickness" />
              </SelectTrigger>
              <SelectContent>
                {thicknessOptions.map((thickness) => (
                  <SelectItem key={thickness} value={thickness.toString()}>
                    {thickness} mm
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (mm)</Label>
            <Input
              id="width"
              name="width"
              type="number"
              placeholder="Enter width in mm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (mm)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              placeholder="Enter height in mm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex space-x-2">
              <Select name="location" required value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations && locations.length > 0 && locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">Add New</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Location</DialogTitle>
                  </DialogHeader>
                  <form action={handleAddLocation} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager</Label>
                      <Input id="manager" name="manager" />
                    </div>
                    <Button type="submit">Add Location</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Adding...' : 'Add Glass Item'}
        </Button>
      </form>
    </Card>
  )
}

