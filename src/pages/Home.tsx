import  { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { Navbar } from '@/components/Home/Navbar'
import { Hero } from '@/components/Home/Hero'
import { Features } from '@/components/Home/Features'
import { About } from '@/components/Home/About'
import { Contact } from '@/components/Home/Contact'
import { Footer } from '@/components/Home/Footer'
export function Home() {
  const parallaxRef = useRef<IParallax>(null)

 /* const scrollTo = (page: number) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(page)
    }
  }
    */

  return (
    <div className="h-screen w-full">
      <Navbar />
      <Parallax pages={5} ref={parallaxRef}>
        <ParallaxLayer offset={0} speed={0.5}>
          <Hero />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.2}>
          <Features />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.3}>
          <About />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.4}>
          <Contact />
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0.5}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

