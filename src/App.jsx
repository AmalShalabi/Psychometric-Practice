import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Vocabulary from './pages/Vocabulary'
import Grammar from './pages/Grammar'
import Reading from './pages/Reading'
import Psychometric from './pages/Psychometric'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-bg" dir="rtl">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/psychometric" element={<Psychometric />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

export default App
