import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getSingleton, listDocs } from '../services/apiService.js'
import {
  defaultSettings, defaultContact, defaultHero, defaultAbout,
  defaultServices, defaultPortfolio, defaultTestimonials, defaultFaqs,
} from '../utils/defaultData.js'

const SiteDataContext = createContext(null)

export function SiteDataProvider({ children }) {
  const [data, setData] = useState({
    settings: defaultSettings,
    contact: defaultContact,
    hero: defaultHero,
    about: defaultAbout,
    services: defaultServices,
    portfolio: defaultPortfolio,
    testimonials: defaultTestimonials,
    faqs: defaultFaqs,
  })
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    // Every read is wrapped so a missing/unreachable backend API (e.g. local
    // preview without the server running) silently falls back to default
    // content instead of crashing the whole site.
    try {
      const [settings, contact, hero, about, services, portfolio, testimonials, faqs] =
        await Promise.all([
          getSingleton('siteContent', 'settings').catch(() => null),
          getSingleton('siteContent', 'contact').catch(() => null),
          getSingleton('siteContent', 'hero').catch(() => null),
          getSingleton('siteContent', 'about').catch(() => null),
          listDocs('services', 'createdAt').catch(() => []),
          listDocs('portfolio', 'createdAt').catch(() => []),
          listDocs('testimonials', 'createdAt').catch(() => []),
          listDocs('faqs', 'createdAt').catch(() => []),
        ])

      setData({
        settings: settings || defaultSettings,
        contact: contact || defaultContact,
        hero: hero || defaultHero,
        about: about || defaultAbout,
        services: services.length ? services : defaultServices,
        portfolio: portfolio.length ? portfolio : defaultPortfolio,
        testimonials: testimonials.length ? testimonials : defaultTestimonials,
        faqs: faqs.length ? faqs : defaultFaqs,
      })
    } catch (err) {
      console.warn('Using default content — API not reachable/configured yet:', err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  return (
    <SiteDataContext.Provider value={{ ...data, loading, refresh }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider')
  return ctx
}
