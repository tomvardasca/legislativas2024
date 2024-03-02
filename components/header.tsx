import * as React from 'react'
import Image from 'next/image'
import Logo from './logo.png'


export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-end space-x-2">
      <Image src={Logo} alt='Logo' width={50} height={50} className='mx-5'/>
          Eleições legislativas 2024 - Programas Eleitorais
      </div>
    </header>
  )
}
