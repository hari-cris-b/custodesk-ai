'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { OptimizedImage } from './ui/optimized-image'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }

    // Optimized section detection with offset
    const sections = document.querySelectorAll('section[id]')
    const scrollPosition = window.scrollY + window.innerHeight * 0.3

    Array.from(sections).forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop
      const sectionHeight = (section as HTMLElement).offsetHeight
      const sectionId = section.getAttribute('id') || ''

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(sectionId)
      }
    })
  }, [isScrolled])

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 10)
    window.addEventListener('scroll', debouncedScroll, { passive: true })
    
    // Initial check for active section
    handleScroll()
    
    return () => window.removeEventListener('scroll', debouncedScroll)
  }, [handleScroll])

  const openCalendly = () => {
    const url = "https://calendly.com/haricrisbfreelancer/custodesk-ai-consultation-call"
    window.open(url, '_blank')
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      const offset = 80 // Height of fixed navbar
      const targetPosition = section.offsetTop - offset
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
      
      setActiveSection(sectionId)
    }
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 z-50 w-full border-b border-zinc-800 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'bg-black/50 border-purple-600/20' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="/" 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <OptimizedImage
              src="/images/logo.png"
              alt="CustoDesk AI"
              width={32}
              height={32}
              priority
              className="rounded-lg"
            />
            <motion.span 
              className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-600"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              CustoDesk AI
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#features" 
              onClick={(e) => scrollToSection(e, 'features')}
              className={`text-sm transition-all duration-300 relative group ${
                activeSection === 'features' ? 'text-white' : 'text-zinc-400'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Features
              <motion.span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-violet-600 ${
                  activeSection === 'features' ? 'w-full' : 'w-0'
                }`}
                initial={false}
                animate={{ width: activeSection === 'features' ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a 
              href="#process" 
              onClick={(e) => scrollToSection(e, 'process')}
              className={`text-sm transition-all duration-300 relative group ${
                activeSection === 'process' ? 'text-white' : 'text-zinc-400'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Process
              <motion.span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-violet-600 ${
                  activeSection === 'process' ? 'w-full' : 'w-0'
                }`}
                initial={false}
                animate={{ width: activeSection === 'process' ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a 
              href="#demo" 
              onClick={(e) => scrollToSection(e, 'demo')}
              className={`text-sm transition-all duration-300 relative group ${
                activeSection === 'demo' ? 'text-white' : 'text-zinc-400'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Demo
              <motion.span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-violet-600 ${
                  activeSection === 'demo' ? 'w-full' : 'w-0'
                }`}
                initial={false}
                animate={{ width: activeSection === 'demo' ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <Button
              onClick={openCalendly}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="flex flex-col space-y-4 pt-4 pb-8">
                <a
                  href="#features"
                  className="text-zinc-400 hover:text-purple-400"
                  onClick={() => {
                    setIsOpen(false)
                    const section = document.getElementById('features')
                    if (section) {
                      const offset = 80 // Height of fixed navbar
                      const targetPosition = section.offsetTop - offset
                      
                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      })
                      
                      setActiveSection('features')
                    }
                  }}
                >
                  Features
                </a>
                <a
                  href="#process"
                  className="text-zinc-400 hover:text-purple-400"
                  onClick={() => {
                    setIsOpen(false)
                    const section = document.getElementById('process')
                    if (section) {
                      const offset = 80 // Height of fixed navbar
                      const targetPosition = section.offsetTop - offset
                      
                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      })
                      
                      setActiveSection('process')
                    }
                  }}
                >
                  Process
                </a>
                <a
                  href="#demo"
                  className="text-zinc-400 hover:text-purple-400"
                  onClick={() => {
                    setIsOpen(false)
                    const section = document.getElementById('demo')
                    if (section) {
                      const offset = 80 // Height of fixed navbar
                      const targetPosition = section.offsetTop - offset
                      
                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      })
                      
                      setActiveSection('demo')
                    }
                  }}
                >
                  Demo
                </a>
                <Button
                  onClick={() => {
                    setIsOpen(false)
                    openCalendly()
                  }}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 w-full"
                >
                  Book a Call
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}