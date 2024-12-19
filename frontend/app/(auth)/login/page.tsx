'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent, action: 'login' | 'sign-up') => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
  
    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      
      const response = await fetch(`/auth/${action}`, {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        const data = await response.statusText
        throw new Error(data || 'Authentication failed')
      }
      
      router.refresh()
      router.replace('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={(e) => handleSubmit(e, 'login')} 
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={(e) => handleSubmit(e, 'sign-up')} 
            disabled={isLoading}
          >
            Sign Up
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login

// 'use client'

// import { useState } from 'react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"


// import type { Database } from '@/lib/database.types'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()
//   const supabase = createClientComponentClient<Database>()

//   const handleSignUp = async () => {
//     setIsLoading(true)
//     try {
//       await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: `${location.origin}/auth/callback`,
//         },
//       })
//       router.refresh()
//     } catch (error) {
//       console.error('Error signing up:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSignIn = async () => {
//     setIsLoading(true)
//     try {
//       console.log(email, password)
//       await supabase.auth.signInWithPassword({
//         email,
//         password,
//       })
//       router.refresh()
//     } catch (error) {
//       console.error('Error signing in:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSignOut = async () => {
//     setIsLoading(true)
//     try {
//       console.log('signout')
//       await supabase.auth.signOut()
//       router.refresh()
//     } catch (error) {
//       console.error('Error signing out:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Card className="w-[350px]">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
//           <CardDescription className="text-center">
//             Enter your email and password to sign in
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-2">
//           <Button className="w-full" onClick={handleSignIn} disabled={isLoading}>
//             {/* {isLoading && < className="mr-2 h-4 w-4 animate-spin" />} */}
//             Sign in
//           </Button>
//           <Button className="w-full" variant="outline" onClick={handleSignUp} disabled={isLoading}>
//           */}
//             Sign up
//           </Button>
//           <Button className="w-full" variant="ghost" onClick={handleSignOut} disabled={isLoading}>
//           */}
//             Sign out
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }