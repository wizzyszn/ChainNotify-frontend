import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Contact() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  })

  return (
    <div id="contact" className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <animated.div style={fadeIn}>
            <form className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required></textarea>
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300">Send Message</button>
            </form>
          </animated.div>
          <animated.div style={fadeIn} className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-purple-600 mr-2" />
                  <span>contact@cryptonotify.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-purple-600 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-purple-600 mr-2" />
                  <span>123 Blockchain Street, Crypto City, CC 12345</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Space+Needle,Seattle+WA"
                allowFullScreen
              ></iframe>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  )
}

