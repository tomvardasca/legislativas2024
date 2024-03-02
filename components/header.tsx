"use client"

import * as React from 'react'
import Image from 'next/image'
import Logo from './logo.png'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from './ui/button'
import { AboutDialog } from './about-dialog'

export function Header() {
  const [aboutDialogOpen, setaboutDialogOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-end space-x-2">
        <Image src={Logo} alt='Logo' width={50} height={50} className='mx-5' />
        Eleições legislativas 2024 - Programas Eleitorais
      </div>
      <div>
        <ThemeToggle />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            React.startTransition(() => {
              setaboutDialogOpen(true);
            })
          }}>
          Sobre
        </Button>
      </div>
      <AboutDialog
        open={aboutDialogOpen}
        onOpenChange={setaboutDialogOpen}
      />
    </header>
  )
}
