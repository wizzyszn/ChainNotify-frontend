import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { Bell, Clock, Shield, Sliders, Smartphone, Layout, Network } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  })

  return (
    <animated.div style={fadeIn} className="bg-white p-6 rounded-lg shadow-lg">
      <Icon className="w-12 h-12 text-purple-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </animated.div>
  )
}

export function Features() {
  const features: FeatureCardProps[] = [
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description: "Get instant alerts for token transfers, wallet updates, and more via push or email notifications."
    },
    {
      icon: Clock,
      title: "Transaction History",
      description: "View detailed records of your wallet activities, including sender/receiver, amounts, and timestamps."
    },
    {
      icon: Shield,
      title: "Secure Wallet Tracking",
      description: "Safely connect your wallet with no risk to your assets. Track balances and transactions seamlessly."
    },
    {
      icon: Sliders,
      title: "Customizable Alerts",
      description: "Choose how you want to stay informed—via email, push notifications, or both."
    },
    {
      icon: Layout,
      title: "User-Friendly Design",
      description: "An intuitive dashboard for managing your wallet, viewing activities, and customizing preferences."
    },
    {
      icon: Network,
      title: "Multi-Network Support",
      description: "Monitor wallets and transactions across popular blockchain networks."
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Access your notifications on the go with a fully responsive design and push notifications."
    }
  ]

  return (
    <div id="features" className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  )
}

