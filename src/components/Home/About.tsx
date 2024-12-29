import { useSpring, animated } from '@react-spring/web'

export function About() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  })

  return (
    <div id="about" className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 py-20 px-4">
      <div className="container mx-auto">
        <animated.div style={fadeIn} className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-purple-600">About Us</h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            We're transforming the way you stay informed about your cryptocurrency transactions. Our blockchain-powered notification system ensures you never miss a wallet activity, whether it's a token transfer or a balance update. With a focus on security, real-time updates, and user-friendly interfaces, our mission is to make blockchain more accessible and transparent for everyone.
          </p>
        </animated.div>
      </div>
    </div>
  )
}

