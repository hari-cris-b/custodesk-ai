'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { MessageCircle, Send, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { knowledgeBase } from '@/lib/knowledge-base'
import { clsx } from 'clsx'

const INITIAL_MESSAGE = `👋 Hi! I'm the CustoDesk AI assistant. I can help you with:

${Object.values(knowledgeBase.services)
  .map(service => `• ${service.title}`)
  .join('\n')}

I can provide details about our services or help you schedule a free consultation call to discuss your specific needs.

How can I assist you today?`

const CONSULTATION_MESSAGE = `Would you like to schedule a free 30-minute consultation call?

[Click here to schedule your consultation](${knowledgeBase.company.consultation.link})`

interface Message {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
  id: string
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Function to simulate typing and add messages with delay
  const addMessageWithDelay = async (message: Message, delay: number) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, delay))
    setMessages(prev => [...prev, message])
    setIsTyping(false)
  }

  // Initialize welcome messages when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant' as const,
        content: "👋 Hi! I'm your friendly AI assistant",
        id: `welcome-${Date.now()}`
      }
      const consultationMessage: Message = {
        role: 'assistant' as const,
        content: `Would you like to schedule a free 30-minute consultation call?\n\n[Click here to schedule your consultation](${knowledgeBase.company.consultation.link})`,
        id: `consultation-${Date.now()}`
      }

      // Add messages with typing animation
      addMessageWithDelay(welcomeMessage, 500).then(() => {
        addMessageWithDelay(consultationMessage, 1000)
      })
    }
  }, [isOpen])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (hasInteracted || isOpen) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      const halfwayPoint = (documentHeight - windowHeight) / 2;

      // Only show notification when scrolled past halfway and scrolling down
      if (scrollPosition > halfwayPoint && window.scrollY > lastScrollY) {
        clearTimeout(scrollTimeout);
        setShowNotification(true);
        scrollTimeout = setTimeout(() => {
          setShowNotification(false);
        }, 5000); // Hide after 5 seconds
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [hasInteracted, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      id: `user-${Date.now()}`
    }])

    // Check if message is about booking/scheduling
    if (userMessage.toLowerCase().includes('book') || 
        userMessage.toLowerCase().includes('schedule') || 
        userMessage.toLowerCase().includes('consultation') ||
        userMessage.toLowerCase().includes('call')) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: CONSULTATION_MESSAGE,
        id: `assistant-${Date.now()}`
      }])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      if (!response.ok) throw new Error('Network response was not ok')
      
      const data = await response.json()
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message,
        id: `assistant-${Date.now()}`
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or schedule a consultation call.",
        error: true,
        id: `error-${Date.now()}`
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 bg-violet-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm">Need help? Chat with our AI assistant!</span>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Chat Button */}
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setHasInteracted(true);
              setShowNotification(false);
            }
          }}
          size="icon"
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </Button>

        {/* Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 right-0 w-96 bg-zinc-900 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="rounded-lg"
                />
                <span className="font-semibold">CustoDesk Assistant</span>
              </div>
            </div>
            <div className="h-[400px] overflow-y-auto p-4 space-y-4" id="chat-messages">
              {messages.length === 0 && !isTyping && (
                <div className="text-center text-zinc-500 mt-8">
                  <ReactMarkdown>{INITIAL_MESSAGE}</ReactMarkdown>
                </div>
              )}
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={clsx(
                      "flex items-start gap-2 rounded-lg p-4",
                      message.role === 'assistant'
                        ? message.error
                          ? "bg-violet-500 dark:bg-violet-600 text-white"
                          : "bg-violet-500 dark:bg-violet-600 text-white shadow-sm"
                        : "bg-violet-500 dark:bg-violet-600 text-white shadow-sm"
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <div className="relative">
                        <Image
                          src="/images/logo.png"
                          alt="CustoDesk AI"
                          width={28}
                          height={28}
                          className={clsx(
                            "rounded-full ring-2 ring-white/50"
                          )}
                        />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
                        <span className="text-xs text-white font-medium">You</span>
                      </div>
                    )}
                    <div className="flex-1 overflow-hidden">
                      <ReactMarkdown 
                        className="prose max-w-none space-y-2 prose-white"
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              className="underline transition-colors duration-200 text-white/90 hover:text-white"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p {...props} className="leading-relaxed text-white" />
                          )
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-start gap-2 rounded-lg p-4 bg-violet-500 dark:bg-violet-600 text-white shadow-sm"
                  >
                    <div className="relative">
                      <Image
                        src="/images/logo.png"
                        alt="CustoDesk AI"
                        width={28}
                        height={28}
                        className="rounded-full ring-2 ring-white/50"
                      />
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-zinc-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
