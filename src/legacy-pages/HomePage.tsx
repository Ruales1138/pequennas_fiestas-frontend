import HeroSection from '../features/landing/HeroSection'
import FeatureGrid from '../features/landing/FeatureGrid'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fbf8ff]">
      <HeroSection />
      <FeatureGrid />
    </main>
  )
}
