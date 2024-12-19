import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import type { InventoryItem } from '@/lib/types'

export function InventoryList({ inventory }: { inventory: InventoryItem[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Current Inventory</h2>
        <Link href="/almacen/add">
          <Button>Add New Item</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Thickness (mm)</TableHead>
            <TableHead>Width (mm)</TableHead>
            <TableHead>Height (mm)</TableHead>
            <TableHead>Quantity</TableHead>
            {/* <TableHead>Location</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.thickness}</TableCell>
              <TableCell>{item.width}</TableCell>
              <TableCell>{item.height}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              {/* <TableCell>{item.location.name || 'N/A'}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

