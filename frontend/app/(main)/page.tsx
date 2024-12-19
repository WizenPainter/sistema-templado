'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Search, Truck, AlertCircle } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"


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

type Line = {
  id: string
  size: string
  quantity: number
  process: string
}

const OrderSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-1/2 mb-2" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </CardContent>
  </Card>
)

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
  </TableRow>
)

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClientComponentClient()


  useEffect(() => {
    const fetchOrdersAndLines = async () => {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession()
        
        if (authError) {
          console.error('Auth error:', authError)
          setError('Authentication error')
          return
        }

        if (!session) {
          console.error('No session found')
          setError('No active session')
          return
        }

        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')

        if (ordersError) {
          console.error('Orders fetch error:', ordersError)
          setError('Error fetching orders')
          return
        }

        const ordersWithLines = await Promise.all(
          ordersData.map(async (order) => {
            const { data: linesData, error: linesError } = await supabase
              .from('lines')
              .select('*')
              .eq('order_id', order.id)

            if (linesError) {
              console.error(`Error fetching lines for order ${order.id}:`, linesError)
              return { ...order, lines: [] }
            }

            return { ...order, lines: linesData }
          })
        )

        console.log('Fetched orders with lines:', ordersWithLines)
        setOrders(ordersWithLines)
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('Unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchOrdersAndLines()
  }, [supabase])

  const filteredOrders = searchTerm
    ? orders.filter(order => 
        order.id.includes(searchTerm) || 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orders

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for an order..."
          className="pl-8"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Active Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
            </>
          ) : (
            filteredOrders.filter(order => order.status === 'In Process').map(order => (
              <Link key={order.id} href={`/orders/${order.id}`} className="hover:scale-105 transition-transform">
                <Card>
                  <CardHeader>
                    <CardTitle>Order {order.id} - {order.customer}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {order.status ? order.status === "Produccion" ? (
                      <p>Area: {order.area}</p>
                    ) : <p>Status: {order.status}</p> : null}
                    {order.lines?.map(line => (
                      <div key={line.id} className="mt-2">
                        <Badge>{line.process}</Badge>
                        <span className="ml-2">Linea: {line.id} - Piezas: {line.quantity}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Finished Orders (Not Embarked)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
            </>
          ) : (
            filteredOrders.filter(order => order.status === 'Finished').map(order => (
              <Link key={order.id} href={`/orders/${order.id}`} className="hover:scale-105 transition-transform">
                <Card className={isOverdue(order.deliveryDate) ? "border-red-500 border-2" : ""}>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>Order {order.id} - {order.customer}</span>
                      {isOverdue(order.deliveryDate) && <AlertCircle className="text-red-500" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Status: {order.status}</p>
                    <p>Delivery Date: {formatDate(order.deliveryDate)}</p>
                    <Truck className="mt-2" />
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Active Orders</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </>
            ) : (
              filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.area || 'N/A'}</TableCell>
                  <TableCell>
                    <Link 
                      href={`/orders/${order.id}`}
                      className="text-blue-500 hover:text-blue-700 hover:underline"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}