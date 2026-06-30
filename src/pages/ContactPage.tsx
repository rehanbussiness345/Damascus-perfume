import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../components/SocialIcons';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <img
            src="https://images.pexels.com/photos/13068356/pexels-photo-13068356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1920"
            alt="Contact Damascus Perfumes"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative flex items-center justify-center h-full text-center">
          <div className="container-main">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4">Get In Touch</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">Contact Us</h1>
            <p className="text-white/60 text-base md:text-lg font-body max-w-md mx-auto mt-4">
              We'd love to hear from you. Reach out for fragrance advice, order inquiries, or wholesale opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left Column — Contact Info */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4">We're Here To Help</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
                  Let's Start a<br />
                  <span className="italic font-elegant font-normal text-gold">Conversation</span>
                </h2>
                <p className="text-warm-gray font-body leading-relaxed mb-12">
                  Whether you're looking for the perfect signature scent, have questions about an order, or want to discuss wholesale opportunities — our team is ready to assist you.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                      <MapPin size={22} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-charcoal mb-1">Our Location</h4>
                      <p className="text-warm-gray text-sm font-body">Vienna, Austria</p>
                      <p className="text-xs text-warm-gray/70 font-body mt-1">EU-wide shipping available</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                      <Mail size={22} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-charcoal mb-1">Email Us</h4>
                      <a href="mailto:info@damascusperfumes.com" className="text-warm-gray text-sm font-body hover:text-gold transition-colors">
                        info@damascusperfumes.com
                      </a>
                      <p className="text-xs text-warm-gray/70 font-body mt-1">We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                      <Phone size={22} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-charcoal mb-1">Call Us</h4>
                      <a href="tel:+43123456789" className="text-warm-gray text-sm font-body hover:text-gold transition-colors">
                        +43 123 456 789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                      <Clock size={22} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-charcoal mb-1">Business Hours</h4>
                      <p className="text-warm-gray text-sm font-body">Monday — Friday: 9:00 — 18:00</p>
                      <p className="text-warm-gray text-sm font-body">Saturday: 10:00 — 16:00</p>
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="mt-12">
                  <h4 className="font-display text-sm font-semibold text-charcoal mb-4">Follow Us</h4>
                  <div className="flex items-center gap-4">
                    <a href="https://www.instagram.com/damascus_perfumes_/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-gold/20 flex items-center justify-center text-charcoal/60 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300">
                      <InstagramIcon size={19} />
                    </a>
                    <a href="#" className="w-11 h-11 border border-gold/20 flex items-center justify-center text-charcoal/60 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300">
                      <FacebookIcon size={19} />
                    </a>
                    <a href="#" className="w-11 h-11 border border-gold/20 flex items-center justify-center text-charcoal/60 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300">
                      <WhatsAppIcon size={19} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-12 border border-gold/10">
                <h3 className="font-display text-2xl font-semibold text-charcoal mb-2">Send Us a Message</h3>
                <p className="text-warm-gray text-sm font-body mb-10">Our team typically responds within 24 hours.</p>

                {submitted ? (
                  <div className="py-12 text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 text-sage rounded-full mb-6">
                      <Send size={28} />
                    </div>
                    <h4 className="font-display text-xl font-semibold text-charcoal mb-2">Thank You!</h4>
                    <p className="text-warm-gray max-w-xs mx-auto">
                      Your message has been received. We will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-[0.15em] text-charcoal mb-3">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-6 py-4 border border-gold/15 text-sm font-body placeholder:text-warm-gray/40 focus:outline-none focus:border-gold transition-colors duration-300 bg-ivory"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-[0.15em] text-charcoal mb-3">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-6 py-4 border border-gold/15 text-sm font-body placeholder:text-warm-gray/40 focus:outline-none focus:border-gold transition-colors duration-300 bg-ivory"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-[0.15em] text-charcoal mb-3">Subject *</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-6 py-4 border border-gold/15 text-sm font-body placeholder:text-warm-gray/40 focus:outline-none focus:border-gold transition-colors duration-300 bg-ivory"
                        placeholder="Order inquiry, fragrance recommendation..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-[0.15em] text-charcoal mb-3">Your Message *</label>
                      <textarea
                        required
                        rows={7}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-6 py-4 border border-gold/15 text-sm font-body placeholder:text-warm-gray/40 focus:outline-none focus:border-gold transition-colors duration-300 bg-ivory resize-none"
                        placeholder="Please tell us how we can help you today..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-charcoal text-white py-4 text-sm uppercase tracking-[0.15em] font-body font-medium hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-3"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-cream">
        <div className="container-main text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4">Our Location</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Based in <span className="italic font-elegant font-normal text-gold">Vienna, Austria</span>
          </h2>
          <p className="text-warm-gray text-base font-body max-w-lg mx-auto">
            Our online boutique ships authentic Arabic fragrances across Austria and the European Union with free shipping on orders over €50.
          </p>
          <div className="mt-10 bg-white border border-gold/10 aspect-video flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gold mx-auto mb-4" />
              <p className="font-display text-xl text-charcoal">Vienna, Austria</p>
              <p className="text-xs text-warm-gray font-body tracking-wider mt-1">EU-WIDE DELIVERY AVAILABLE</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
