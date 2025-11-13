import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Work from './pages/Work'
import Tools from './pages/Tools'
import Resources from './pages/Resources'
import ReadingRecommendations from './pages/ReadingRecommendations'
import VideoRecommendations from './pages/VideoRecommendations'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/work" element={<Work />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/reading-recommendations" element={<ReadingRecommendations />} />
            <Route path="/resources/video-recommendations" element={<VideoRecommendations />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

