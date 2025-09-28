'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AuthDialog } from '@/components/auth-dialog'

export default function SignInPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showAuthDialog, setShowAuthDialog] = useState(true)
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [session, router, callbackUrl])

  const handleDialogClose = () => {
    setShowAuthDialog(false)
    router.push('/')
  }

  if (session) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={handleDialogClose} 
        mode="signin" 
      />
    </div>
  )
}