import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Projects from './pages/Projects'
import Tools from './pages/Tools'
import Resources from './pages/Resources'
import ReadingRecommendations from './pages/ReadingRecommendations'
import VideoRecommendations from './pages/VideoRecommendations'
import './App.css'

function AppContent() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('fadeIn')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut')
    }
  }, [location.pathname, displayLocation.pathname])

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('fadeIn')
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [transitionStage, location])

  return (
    <div className="app">
      <Navigation />
      <main className={`main-content page-transition-${transitionStage}`}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tools" element={<Tools />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/reading-recommendations" element={<ReadingRecommendations />} />
          <Route path="/resources/video-recommendations" element={<VideoRecommendations />} />
        </Routes>
      </main>
      <BackToTop />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

