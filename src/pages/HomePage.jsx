import HeroSection from '../features/landing/HeroSection'
import FeatureGrid from '../features/landing/FeatureGrid'

export default function HomePage() {
    return (
        <main className="hero-gradient min-h-screen">
            <HeroSection />
            <FeatureGrid />
        </main>
    )
}
