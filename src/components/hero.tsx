'use client'

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from 'react';

export default function Hero() {
  const openCalendly = () => {
    const url = "https://calendly.com/haricrisbfreelancer/custodesk-ai-consultation-call";
    window.open(url, '_blank');
  };

  const services = [
    "customer support",
    "data analysis",
    "content writing",
    "market research",
    "email automation",
    "social media",
    "lead generation",
    "sales assistance"
  ];

  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % services.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-transparent"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 grid-pattern"
        />
      </div>

      {/* Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-7xl mx-auto px-6 py-32 text-center"
      >
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          Transform your{' '}<br/>
          <motion.span
            key={serviceIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 animate-gradient"
          >
            {services[serviceIndex]}
          </motion.span>
          {' '}<br/>with CustoDesk AI
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto"
        >
          Supercharge your customer support, streamline your lead generation, and automate workflows seamlessly.
          Book a call today to explore a tailor-made strategy that fits your needs perfectly.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={openCalendly}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 hover:scale-105 group text-lg transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Let's Talk
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            delay: 1,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full mx-auto" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
