'use server'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getLocations() {
  const supabase = await createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from('almacenes')
    .select('id, name')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching locations:', error)
    return []
  }

  return data
}

export async function addLocation(formData: FormData) {
  const supabase = createServerComponentClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('Not authenticated')
  }

  const data = {
    name: formData.get('name'),
    address: formData.get('address'),
    manager: formData.get('manager'),
  }

  const { error } = await supabase
    .from('almacenes')
    .insert([data])

  if (error) throw error

  return { success: true }
}