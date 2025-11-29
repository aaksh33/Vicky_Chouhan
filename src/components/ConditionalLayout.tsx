'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from './ui/Navbar'
import BottomNav from './BottomNav'
import TopBanner from './TopBanner'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showBanner, setShowBanner] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const bannerClosed = sessionStorage.getItem('bannerClosed')
    if (bannerClosed) {
      setShowBanner(false)
    }
  }, [])

  const handleCloseBanner = () => {
    setShowBanner(false)
    sessionStorage.setItem('bannerClosed', 'true')
  }

  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  const bannerVisible = pathname === '/' && showBanner

  return (
    <>
      <Navbar offsetTop="0px" />
      <div className={`${mounted ? 'pt-16' : 'pt-10 md:pt-16'} pb-12 md:pb-0 transition-all duration-500`}>
        {bannerVisible && <TopBanner onClose={handleCloseBanner} />}
        {children}
      </div>
      <BottomNav />
    </>
  )
}
