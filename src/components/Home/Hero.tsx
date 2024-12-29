import { useSpring, animated } from '@react-spring/web'
import { useNavigate } from 'react-router-dom'

export function Hero() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  })
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4">
      <animated.div style={fadeIn} className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Stay Connected to Your Crypto World</h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
          Real-time notifications for wallet activities, token transfers, and more. Keep track of your transactions effortlessly.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <button className="w-full md:w-auto bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300" onClick={() => navigate('/login') }>
            Connect Wallet
          </button>
          <button className="w-full md:w-auto bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
            Learn More
          </button>
        </div>
      </animated.div>
    </div>
  )
}

