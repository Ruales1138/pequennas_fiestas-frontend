import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CatalogPage from './legacy-pages/CatalogPage'
import HomePage from './legacy-pages/HomePage'
import ArtistDetailsPage from './legacy-pages/ArtistDetailsPage'
import { DashboardPage } from './legacy-pages/DashboardPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RegisterPage } from './legacy-pages/RegisterPage'
import { LoginPage } from './legacy-pages/LoginPage'
import { OnboardingPage } from './legacy-pages/OnboardingPage'
import AboutPage from './legacy-pages/AboutPage'
import TermsPage from './legacy-pages/TermsPage'
import PrivacyPage from './legacy-pages/PrivacyPage'
import ContactPage from './legacy-pages/ContactPage'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import NotFoundPage from './legacy-pages/errors/NotFoundPage'
import UnauthorizedPage from './legacy-pages/errors/UnauthorizedPage'
import ForbiddenPage from './legacy-pages/errors/ForbiddenPage'
import ServerErrorPage from './legacy-pages/errors/ServerErrorPage'
import ProtectedRoute from './components/routing/ProtectedRoute'
import AdminPage from './legacy-pages/AdminPage'

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
          <Route path="/403" element={<ForbiddenPage />} />
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
