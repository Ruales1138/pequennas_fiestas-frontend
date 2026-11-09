import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CatalogPage from './pages/CatalogPage'
import HomePage from './pages/HomePage'
import ArtistDetailsPage from './pages/ArtistDetailsPage'
import { DashboardPage } from './pages/DashboardPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { OnboardingPage } from './pages/OnboardingPage'
import AboutPage from './pages/AboutPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import NotFoundPage from './pages/errors/NotFoundPage'
import UnauthorizedPage from './pages/errors/UnauthorizedPage'
import ServerErrorPage from './pages/errors/ServerErrorPage'
import ProtectedRoute from './components/routing/ProtectedRoute'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/detail/:id" element={<ArtistDetailsPage />} />
          <Route path="/detail" element={<Navigate to="/catalog" replace />} />
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['artista']}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/onboarding/artista' element={
            <ProtectedRoute roles={['artista']}>
              <OnboardingPage />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </ErrorBoundary>
      <Footer></Footer>
    </>
  )
}

export default App
// hola