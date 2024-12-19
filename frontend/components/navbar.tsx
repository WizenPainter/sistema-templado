'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Home, Plus, FolderOpen, Package, FileText, ChevronDown, User, Computer } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { User as AuthUser }  from '@/lib/types'

interface NavItemProps {
    href: string
    icon: React.ReactNode
    children: React.ReactNode
}

const useUserCache = () => {
  const [cachedUser, setCachedUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem('cached_user')
      if (cached) setCachedUser(JSON.parse(cached))
    }
  }, [])

  const updateCache = (user: AuthUser) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cached_user', JSON.stringify(user))
      setCachedUser(user)
    }
  }

  return { cachedUser, updateCache }
}

export default function Navbar() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClientComponentClient()

  const { cachedUser, updateCache } = useUserCache()
  const [userData, setUserData] = useState<AuthUser | null>(cachedUser)

  useEffect(() => {
    const fetchUserAndRoleData = async () => {
      try {
        const { data: { user: authData }, error: authError } = await supabase.auth.getUser()
        
        if (authError) throw authError
        if (!authData) throw new Error('No user found')
        
  
        const [{ data: userData, error: userError }, { data: roleData, error: roleError }] = await Promise.all([
          !cachedUser ? supabase.from('users').select('*').eq('user_id', authData.id).single() : { data: null, error: null },
          supabase.from('users').select('role').eq('user_id', authData.id).single()
        ])
  
        if (userError) throw userError
        if (roleError) throw roleError
  
        if (userData) {
          updateCache(userData)
          setUserData(userData)
        }
        
        setIsAdmin(roleData?.role === 'admin')
      } catch (err) {
        console.log('Error fetching user:', err)
      }
    }
  
    if (!cachedUser) fetchUserAndRoleData()
  
    const { data: { subscription } } = supabase.auth.onAuthStateChange(fetchUserAndRoleData)
    
    return () => subscription.unsubscribe()
  }, [supabase, cachedUser])

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        router.push('/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  return (
    <nav className="bg-slate-700 text-primary-foreground p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </Link>
        <div className="flex items-center space-x-6">
          <NavItem href="/" icon={<Home className="mr-2 h-4 w-4" />}>
            Home
          </NavItem>
          <NavItem href="/orders/create" icon={<Plus className="mr-2 h-4 w-4" />}>
            Create Order
          </NavItem>
          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center hover:font-bold transition-colors">
                Administration
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/admin/users">Manage Users</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/admin/settings">System Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <DropdownMenu open={isClientDropdownOpen} onOpenChange={setIsClientDropdownOpen}>
            <DropdownMenuTrigger className="flex items-center hover:font-bold transition-colors">
              Clients
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/clients/new">Create New Client</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/clients">Client List</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavItem href="/projects" icon={<FolderOpen className="mr-2 h-4 w-4" />}>
            Projects
          </NavItem>
          <NavItem href="/almacen" icon={<Package className="mr-2 h-4 w-4" />}>
            Almacen
          </NavItem>
          <NavItem href="/reports" icon={<FileText className="mr-2 h-4 w-4" />}>
            Reports
          </NavItem>
          <NavItem href="/optimizer" icon={<Computer className="mr-2 h-4 w-4" />}>
            Optimizer
          </NavItem>
        </div>
        <div>
          <DropdownMenu open={isUserDropdownOpen} onOpenChange={setIsUserDropdownOpen}>
          <DropdownMenuTrigger className="flex items-center hover:font-bold transition-colors">
              <User className="mr-2 h-4 w-4" />
              {userData?.username || 'User'}
              <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

function NavItem({ href, icon, children }: NavItemProps) {
  return (
    <Link href={href} className="group flex items-center relative">
      {icon}
      <span className="group-hover:font-bold transition-all">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-foreground transition-all group-hover:w-full"></span>
    </Link>
  )
}