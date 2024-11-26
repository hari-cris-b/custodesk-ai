'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { MessageCircle, Send, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

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

  const handleChatOpen = () => {
    setIsOpen(true);
    setShowNotification(false);
    setHasInteracted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const responseText = await response.text()
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: responseText 
      }
      
      // Animate the response appearing word by word
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseText
      }])

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }
      setMessages(prev => [...prev, errorMessage])
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="h-[400px] overflow-y-auto p-4 space-y-4" id="chat-messages">
              {messages.length === 0 && (
                <div className="text-center text-zinc-500 mt-8">
                  👋 Hi! I'm the CustoDesk AI assistant. How can I help you today?
                </div>
              )}
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-zinc-800 text-zinc-100'
                      }`}
                    >
                      <ReactMarkdown 
                        className="prose prose-invert prose-sm"
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer" />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul {...props} className="list-disc list-inside" />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol {...props} className="list-decimal list-inside" />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-zinc-800 rounded-lg p-3 flex space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
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
      <motion.button
        onClick={handleChatOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full p-4 shadow-lg flex items-center justify-center relative group"
      >
        <Image
          src="/images/logo.png"
          alt="CustoDesk AI"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <MessageCircle className="w-4 h-4 text-white absolute bottom-1 right-1" />
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </motion.button>
    </div>
  )
}
