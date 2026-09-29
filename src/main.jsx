import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react'
import './styles.css'
import heroArtwork from './assets/hero-artwork.png'

// Paste your deployed Google Apps Script web-app URL here, or use VITE_FORM_ENDPOINT.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''

const businessFields = [
  ['name', 'Your name', 'text'], ['business', 'Business / brand name', 'text'], ['email', 'Work email', 'email'], ['whatsapp', 'WhatsApp number', 'tel'],
  ['offer', 'What do you sell?', 'text'], ['price', 'Price per customer', 'text'], ['commission', 'Commission per paying customer', 'text'], ['demo', 'Link to demo or product', 'url'],
]
const sellerFields = [
  ['name', 'Your name', 'text'], ['email', 'Email', 'email'], ['whatsapp', 'WhatsApp number', 'tel'], ['city', 'City', 'text'],
  ['about', 'What best describes you?', 'select'], ['find', 'How would you find buyers?', 'textarea'], ['why', 'Why do you want in?', 'textarea'],
]
const tickerItems = ['real offers', 'real buyers', 'no joining fee', 'seller-owned leads', 'official demos', 'commission after payment', 'no MLM']

function App() {
  const route = window.location.pathname
  if (route === '/apply/business' || route === '/apply/seller') return <ApplicationPage type={route.endsWith('business') ? 'business' : 'seller'} />
  return <Landing />
}

function Brand() { return <a className="brand" href="/" aria-label="Vouch home"><span className="brand-mark">V</span><span>vouch<span className="brand-dot">.</span></span><small>private beta</small></a> }

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="header"><Brand /><nav className={open ? 'nav open' : 'nav'}><a href="#model" onClick={() => setOpen(false)}>The model</a><a href="#how" onClick={() => setOpen(false)}>How it works</a><a href="#rules" onClick={() => setOpen(false)}>Trust rules</a></nav><a className="header-action" href="/apply/seller">Apply for the pilot <ArrowUpRight size={15} /></a><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button></header>
}

function Landing() {
  return <div className="site dark-site"><Header /><main>
    <section className="hero-new page-width"><div className="hero-text reveal"><div className="status-pill"><i /> curated pilot for Malaysian B2B</div><h1>Good businesses.<br /><em>Better introductions.</em></h1><p>Vouch helps SaaS, automation, and service businesses find customers through independent sellers — people who know who to call.</p><div className="hero-actions"><a className="solid-button" href="/apply/business">I have an offer <ArrowUpRight size={16} /></a><a className="ghost-button" href="/apply/seller">I have a network <ArrowUpRight size={16} /></a></div><span className="hero-note">One seller. One buyer. One fair commission.</span></div><HeroArtwork /></section>
    <div className="ticker"><div>{[...tickerItems, ...tickerItems].map((item, i) => <span key={`${item}-${i}`}><b>◆</b>{item}</span>)}</div></div>
    <section id="model" className="story page-width"><div className="section-kicker">01 / the model</div><div className="story-grid"><h2>It’s not an affiliate link.<br /><em>It’s a trusted intro.</em></h2><div><p className="large-copy">A business has something useful to sell. A seller knows who might need it. Vouch gives them a clear way to meet — and protects the seller’s credit when the buyer becomes a customer.</p><p className="muted-copy">The business gives the real demo. The buyer pays the business directly. The seller gets paid when the payment is real.</p></div></div></section>
    <section id="how" className="process section-light"><div className="page-width"><div className="section-kicker">02 / how it works</div><div className="process-head"><h2>From “I know someone”<br /><em>to paid.</em></h2><p>Simple enough to explain in a WhatsApp message. Clear enough to build trust around.</p></div><div className="process-line" /><div className="process-grid"><ProcessStep number="01" title="A business lists an offer" body="Clear product, clear customer, clear price, clear commission. No mystery offers." tag="business" /><ProcessStep number="02" title="A seller opens a door" body="They find a fit through their own network — a referral, a call, a message, whatever works." tag="seller" /><ProcessStep number="03" title="The right person takes over" body="The business runs the demo and closes. When the buyer pays, the seller earns." tag="commission" /></div></div></section>
    <section id="rules" className="trust page-width"><div className="section-kicker">03 / the promise</div><div className="trust-head"><h2>Useful offers.<br /><em>Clean rules.</em></h2><p>Vouch is built around the parts that make commission selling feel fair — for everyone involved.</p></div><div className="trust-grid"><TrustCard n="01" title="No pay to play" body="Businesses pay after a real customer pays. Sellers never pay to join." /><TrustCard n="02" title="No pyramid nonsense" body="You earn from your own sales. Never from recruiting another seller." /><TrustCard n="03" title="No made-up promises" body="Official demos, honest scripts, real prices. The buyer gets the truth." /></div></section>
    <section className="final-cta"><div className="page-width"><div className="final-inner"><div><div className="section-kicker">04 / start small</div><h2>Find one good offer.<br /><em>Open one real door.</em></h2></div><div className="final-actions"><a className="solid-button" href="/apply/business">Sign up as a business <ArrowRight size={16} /></a><a className="ghost-button" href="/apply/seller">Sign up as a seller <ArrowRight size={16} /></a></div></div></div></section>
  </main><Footer /></div>
}

function HeroArtwork() {
  return <div className="hero-artwork-panel reveal delay-1"><img src={heroArtwork} alt="Illustration of two hands exchanging a deal, with lead, customer, service value, and commission markers" /></div>
}
function ProcessStep({ number, title, body, tag }) { return <article className="process-step"><span className="step-number">{number}</span><div className="step-tag">{tag}</div><h3>{title}</h3><p>{body}</p><ArrowUpRight className="step-arrow" size={17} /></article> }
function TrustCard({ n, title, body }) { return <article className="trust-card"><span>{n}</span><h3>{title}</h3><p>{body}</p></article> }

function ApplicationPage({ type }) {
  const business = type === 'business'
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const fields = business ? businessFields : sellerFields
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const submit = async (event) => { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; setError(''); const data = new FormData(event.currentTarget); if (data.get('website')) return; try { if (FORM_ENDPOINT) await fetch(FORM_ENDPOINT, { method: 'POST', body: data, mode: 'no-cors' }); setSubmitted(true) } catch { setError('We could not send that just now. Please try again or WhatsApp us directly.') } }
  return <div className="site form-site"><Header /><main className="form-page page-width"><div className="form-intro reveal"><a className="back-link" href="/">← Back to the homepage</a><div className="section-kicker">05 / pilot application</div><h1>{business ? <>Put your offer<br /><em>in the room.</em></> : <>Put your network<br /><em>to work.</em></>}</h1><p>{business ? 'We are looking for a few real Malaysian B2B offers with a clear outcome, a working demo, and room to serve new customers.' : 'You do not need a following or a product. You need curiosity, good judgment, and a few doors you can open.'}</p><div className="form-aside">{business ? 'Businesses are reviewed manually before joining.' : 'Sellers start with one offer, a clear script, and fair rules.'}</div></div><div className="application-card reveal delay-1">{submitted ? <div className="success"><div className="success-mark"><Check /></div><div className="section-kicker">application received</div><h2>You’re on the list.</h2><p>Thanks for putting your hand up. We’ll read through this and get back to you soon.</p><a className="text-link" href="/">Return to Vouch <ArrowRight size={15} /></a></div> : <form onSubmit={submit} noValidate><input className="honeypot" name="website" tabIndex="-1" autoComplete="off" /><input type="hidden" name="application_type" value={type} /><div className="form-top"><div><span className="form-label">{business ? 'Business application' : 'Seller application'}</span><h2>{business ? 'Tell us about the offer.' : 'Tell us about you.'}</h2></div><span className="required-note">Required fields</span></div><div className="field-grid">{fields.map(([name, label, fieldType]) => <Field key={name} name={name} label={label} type={fieldType} required />)}</div>{error && <p className="form-error">{error}</p>}<button className="solid-button submit-button" type="submit">Send application <ArrowUpRight size={16} /></button><p className="privacy-note">Your details are only used to review the Vouch pilot application.</p></form>}</div></main><Footer /></div>
}

function Field({ name, label, type, required }) { if (type === 'select') return <label className="field"><span>{label}</span><select name={name} defaultValue="" required={required}><option value="" disabled>Select one</option><option>Student</option><option>Freelancer</option><option>Salesperson</option><option>Creator</option><option>Other</option></select><ChevronDown size={15} /></label>; if (type === 'textarea') return <label className="field full"><span>{label}</span><textarea name={name} rows="4" placeholder="Tell us a little more..." required={required} /></label>; return <label className="field"><span>{label}</span><input name={name} type={type} placeholder={label} required={required} /></label> }
function Footer() { return <footer className="footer"><Brand /><span>Real offers. Real buyers. Fair commissions.</span><span>© 2026 Vouch</span></footer> }
createRoot(document.getElementById('root')).render(<App />)
