export const performance = {
  // Image optimization
  images: {
    quality: 75,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Cache durations
  cache: {
    revalidate: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 24 hours
  },

  // Animation settings
  animation: {
    reducedMotion: true, // Respect user's reduced motion preference
    defaultDuration: 0.2,
    defaultEasing: [0.4, 0, 0.2, 1],
  },

  // Scroll settings
  scroll: {
    debounceTime: 10,
    throttleTime: 16,
  },

  // Resource hints
  resourceHints: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    prefetch: [
      '/images/logo.png',
    ],
  },

  // SEO settings
  seo: {
    titleTemplate: '%s | CustoDesk AI',
    defaultTitle: 'CustoDesk AI - Intelligent Customer Support Platform',
    description: 'Transform your customer support with AI-powered automation. CustoDesk AI delivers instant, accurate responses and exceptional support 24/7.',
  },
}
