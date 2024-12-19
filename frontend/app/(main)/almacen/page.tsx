import { Suspense } from 'react'
import { createClient } from '@supabase/supabase-js'
import { InventoryList } from './inventory-list'
import { InventorySkeleton } from './inventory-skeleton'
import AddGlassForm from './add-glass-form'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getInventory() {
  const { data, error } = await supabase
    .from('almacenes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log('Error fetching inventory:', error)
    return []
  }

  return data
}

export default async function AlmacenPage() {
  const inventory = await getInventory()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Glass Inventory</h1>
      <Suspense fallback={<InventorySkeleton />}>
        {inventory.length > 0 ? (
          <InventoryList inventory={inventory} />
        ) : (
          <AddGlassForm />
        )}
      </Suspense>
    </div>
  )
}

