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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
    const handleScroll = () => {
      if (!hasInteracted && !showNotification) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const halfwayPoint = (documentHeight - windowHeight) / 2;

        if (scrollPosition > halfwayPoint) {
          setShowNotification(true);
          // Remove scroll listener after showing notification
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasInteracted, showNotification]);

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
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-4">
      <div className="relative">
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-full right-0 mb-4 bg-violet-600 text-white px-4 py-3 rounded-lg shadow-lg w-64"
          >
            <div className="flex items-start justify-between space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium">Need help with anything?</p>
                <p className="text-xs text-white/80 mt-1">Chat with our AI assistant!</p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white/80 hover:text-white mt-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-violet-600"></div>
          </motion.div>
        )}
        
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setHasInteracted(true);
              setShowNotification(false);
            }
          }}
          size="icon"
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg relative"
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </Button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
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
            
            <div className="h-[400px] overflow-y-auto p-4" id="chat-messages">
              <div className="space-y-4">
                {messages.length === 0 && !isTyping && (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-center text-zinc-500 mt-8"
                  >
                    <ReactMarkdown>{INITIAL_MESSAGE}</ReactMarkdown>
                  </motion.div>
                )}
                
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                    className={clsx(
                      "flex items-start space-x-3 p-3 rounded-lg",
                      message.role === 'assistant'
                        ? message.error
                          ? "bg-violet-500 dark:bg-violet-600 text-white"
                          : "bg-violet-500 dark:bg-violet-600 text-white shadow-sm"
                        : "bg-blue-500 dark:bg-blue-600 text-white shadow-sm"
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <div className="relative">
                        <Image
                          src="/images/logo.png"
                          alt="CustoDesk AI"
                          width={28}
                          height={28}
                          className="rounded-full ring-2 ring-white/50"
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
                    key="typing-indicator"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-violet-500 dark:bg-violet-600 text-white shadow-sm"
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
                <div ref={messagesEndRef} />
              </div>
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
