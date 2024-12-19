'use client'

import { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import Select from 'react-select'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search } from 'lucide-react'

type Line = {
  id: string
  glassType: string
  glassSize: string
  width: number
  height: number
  quantity: number
  processes: string[]
  separator?: string
  secondGlassType?: string
  secondGlassSize?: string
  secondWidth?: number
  secondHeight?: number
}

type Order = {
  id: string
  customer: string
  status: string
  area?: string
  deliveryDate: string
  vendor: string
  lines: Line[]
  obra: string
  sub: string
}

const processOptions = [
  { value: 'tempering', label: 'Tempering' },
  { value: 'insulating', label: 'Insulating' },
  { value: 'duovent', label: 'Duovent' },
  { value: 'cpb', label: 'CPB' },
  { value: 'laminated', label: 'Laminated' },
  { value: 'welding', label: 'Welding' },
]

const glassTypeOptions = [
  { value: 'clear', label: 'Clear' },
  { value: 'tinted', label: 'Tinted' },
  { value: 'reflective', label: 'Reflective' },
  { value: 'low-e', label: 'Low-E' },
]

const glassSizeOptions = [
  { value: '4', label: '4mm' },
  { value: '6', label: '6mm' },
  { value: '10', label: '10mm' },
]

const separatorOptions = [
  { value: 'aluminum', label: 'Aluminum' },
  { value: 'warm-edge', label: 'Warm Edge' },
  { value: 'stainless-steel', label: 'Stainless Steel' },
]

export default function CreateOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentObra, setCurrentObra] = useState('')
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm<Order>({
    defaultValues: {
      id: uuidv4(),
      status: 'Pending',
      lines: [{ id: uuidv4(), glassType: '', glassSize: '', width: 0, height: 0, quantity: 1, processes: [] }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lines"
  })

  const onSubmit = async (data: Order) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your API
    console.log(data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    // Reset form or redirect as needed
  }

  const handleObraSelect = (obraName: string) => {
    setCurrentObra(obraName)
  }

  const handleAddSub = () => {
    // Logic to add description to obra
    console.log('Adding description to obra:', currentObra)
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Input id="customer" {...register("customer", { required: "Customer is required" })} />
                {errors.customer && <p className="text-red-500 text-sm mt-1">{errors.customer.message}</p>}
              </div>
              <div>
                <Label htmlFor="vendor">Vendor</Label>
                <Input id="vendor" {...register("vendor", { required: "Vendor is required" })} />
                {errors.vendor && <p className="text-red-500 text-sm mt-1">{errors.vendor.message}</p>}
              </div>
              <div>
                <Label htmlFor="area">Area</Label>
                <Input id="area" {...register("area")} />
              </div>
              <div>
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input id="deliveryDate" type="date" {...register("deliveryDate", { required: "Delivery date is required" })} />
                {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate.message}</p>}
              </div>
              <div>
                <Label>Obra</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {currentObra || 'Link to Obra'}
                      <Search className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Search or Create Obra</DialogTitle>
                    </DialogHeader>
                    <Input placeholder="Search obras..." />
                    <Button onClick={() => handleObraSelect('New Obra')}>Create New Obra</Button>
                    {/* Add list of existing obras here */}
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <Label>Sub</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start" disabled={!currentObra}>
                      {currentObra ? 'Add description to obra' : 'Select an obra first'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Input placeholder="Add description..." />
                    <Button onClick={handleAddSub} className="mt-2">Add Description</Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Order</h3>
              {fields.map((field, index) => (
                <Card key={field.id} className="mb-4">
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                    <div>
                      <Label htmlFor={`lines.${index}.glassType`}>Glass Type</Label>
                      <Controller
                        name={`lines.${index}.glassType` as const}
                        control={control}
                        rules={{ required: "Glass type is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={glassTypeOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select glass type"
                            aria-label="Select glass type"
                          />
                        )}
                      />
                      {errors.lines?.[index]?.glassType && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.glassType?.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor={`lines.${index}.glassSize`}>Glass Size</Label>
                      <Controller
                        name={`lines.${index}.glassSize` as const}
                        control={control}
                        rules={{ required: "Glass size is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={glassSizeOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select glass size"
                            aria-label="Select glass size"
                          />
                        )}
                      />
                      {errors.lines?.[index]?.glassSize && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.glassSize?.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor={`lines.${index}.width`}>Width (mm)</Label>
                      <Input 
                        id={`lines.${index}.width`} 
                        type="number" 
                        {...register(`lines.${index}.width` as const, { required: "Width is required", min: 1 })} 
                      />
                      {errors.lines?.[index]?.width && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.width?.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor={`lines.${index}.height`}>Height (mm)</Label>
                      <Input 
                        id={`lines.${index}.height`} 
                        type="number" 
                        {...register(`lines.${index}.height` as const, { required: "Height is required", min: 1 })} 
                      />
                      {errors.lines?.[index]?.height && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.height?.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor={`lines.${index}.quantity`}>Quantity</Label>
                      <Input 
                        id={`lines.${index}.quantity`} 
                        type="number" 
                        {...register(`lines.${index}.quantity` as const, { required: "Quantity is required", min: 1 })} 
                      />
                      {errors.lines?.[index]?.quantity && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.quantity?.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor={`lines.${index}.processes`}>Processes</Label>
                      <Controller
                        name={`lines.${index}.processes` as const}
                        control={control}
                        rules={{ required: "At least one process is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            options={processOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select processes"
                            aria-label="Select processes"
                          />
                        )}
                      />
                      {errors.lines?.[index]?.processes && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.processes?.message}</p>}
                    </div>
                    {watch(`lines.${index}.processes`)?.some(process => process.value === 'duovent') && (
                      <>
                        <div>
                          <Label htmlFor={`lines.${index}.separator`}>Separator</Label>
                          <Controller
                            name={`lines.${index}.separator` as const}
                            control={control}
                            rules={{ required: "Separator is required for duovent" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={separatorOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select separator"
                                aria-label="Select separator"
                              />
                            )}
                          />
                          {errors.lines?.[index]?.separator && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.separator?.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor={`lines.${index}.secondGlassType`}>Second Glass Type</Label>
                          <Controller
                            name={`lines.${index}.secondGlassType` as const}
                            control={control}
                            rules={{ required: "Second glass type is required for duovent" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={glassTypeOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select second glass type"
                                aria-label="Select second glass type"
                              />
                            )}
                          />
                          {errors.lines?.[index]?.secondGlassType && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.secondGlassType?.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor={`lines.${index}.secondGlassSize`}>Second Glass Size</Label>
                          <Controller
                            name={`lines.${index}.secondGlassSize` as const}
                            control={control}
                            rules={{ required: "Second glass size is required for duovent" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={glassSizeOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select second glass size"
                                aria-label="Select second glass size"
                              />
                            )}
                          />
                          {errors.lines?.[index]?.secondGlassSize && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.secondGlassSize?.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor={`lines.${index}.secondWidth`}>Second Width (mm)</Label>
                          <Input 
                            id={`lines.${index}.secondWidth`} 
                            type="number" 
                            {...register(`lines.${index}.secondWidth` as const, { required: "Second width is required for duovent", min: 1 })} 
                          />
                          {errors.lines?.[index]?.secondWidth && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.secondWidth?.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor={`lines.${index}.secondHeight`}>Second Height (mm)</Label>
                          <Input 
                            id={`lines.${index}.secondHeight`} 
                            type="number" 
                            {...register(`lines.${index}.secondHeight` as const, { required: "Second height is required for duovent", min: 1 })} 
                          />
                          {errors.lines?.[index]?.secondHeight && <p className="text-red-500 text-sm mt-1">{errors.lines[index]?.secondHeight?.message}</p>}
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove Line</Button>
                  </CardFooter>
                </Card>
              ))}
              <Button type="button" onClick={() => append({ id: uuidv4(), glassType: '', glassSize: '', width: 0, height: 0, quantity: 1, processes: [] })}>
                Add Line
              </Button>
            </div>

            <CardFooter className="flex justify-end mt-6">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Order...' : 'Create Order'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

