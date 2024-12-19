'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function addGlassItem(formData: FormData) {
  try {
    const data = {
      type: formData.get('type'),
      thickness: parseFloat(formData.get('thickness') as string),
      width: parseFloat(formData.get('width') as string),
      height: parseFloat(formData.get('height') as string),
      quantity: parseInt(formData.get('quantity') as string),
      location_id: formData.get('location'),
    }

    const { error } = await supabase
      .from('almacen')
      .insert([data])

    if (error) throw error

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to add glass item' }
  }
}

