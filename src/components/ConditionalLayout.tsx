'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from './ui/Navbar'
import BottomNav from './BottomNav'
import TopBanner from './TopBanner'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showBanner, setShowBanner] = useState(true)

  // Admin routes don't need navbar or padding
  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  const [bannerHeight, setBannerHeight] = React.useState(38)
  
  React.useEffect(() => {
    const updateHeight = () => {
      setBannerHeight(window.innerWidth >= 768 ? 56 : 40)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const bannerVisible = pathname === '/' && showBanner

  return (
    <>
      {bannerVisible && <TopBanner onClose={() => setShowBanner(false)} />}
      <Navbar offsetTop={bannerVisible ? `${bannerHeight}px` : '0px'} />
      <div className={`pt-10 md:pt-14 pb-12 md:pb-0 ${bannerVisible ? 'mt-14' : ''}`}>
        {children}
      </div>
      <BottomNav />
    </>
  )
}