'use client'

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from 'next/image'

const navigation = {
  main: [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Process', href: '#process' },
    { name: 'Demo', href: '#demo' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logo.png"
              alt="EchoLine AI Logo"
              width={48}
              height={48}
              className="w-auto h-12"
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-600">
            CustoDesk AI
            </span>
          </div>
          <p className="text-sm text-zinc-400">Intelligent Customer Service Platform</p>
        </div>
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6 text-center">
              <a href={item.href} className="text-sm leading-6 text-zinc-400 hover:text-white transition-colors">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-zinc-400 hover:text-white transition-colors">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-zinc-400">
          &copy; {new Date().getFullYear()} CustoDesk AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
