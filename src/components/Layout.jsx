import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  FileText, 
  BookMarked, 
  Brain, 
  User,
  Menu,
  X,
  Trophy,
  Star
} from 'lucide-react'

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'المفردات', href: '/vocabulary', icon: BookOpen },
    { name: 'القواعد', href: '/grammar', icon: FileText },
    { name: 'القراءة', href: '/reading', icon: BookMarked },
    { name: 'البسيخومتري', href: '/psychometric', icon: Brain },
    { name: 'الملف الشخصي', href: '/profile', icon: User },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 space-x-reverse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">تعلم الإنجليزية</h1>
                <p className="text-sm text-gray-500">منصة تعليمية تفاعلية</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 space-x-reverse">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-gradient-primary text-white shadow-lg'
                        : 'text-gray-600 hover:text-deep-blue hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Stats */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse bg-yellow-50 px-3 py-2 rounded-lg">
                <Trophy className="w-4 h-4 text-accent-gold" />
                <span className="text-sm font-medium text-gray-700">1,250 XP</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-2 rounded-lg">
                <Star className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">7 أيام</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-deep-blue hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 space-x-reverse px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-gradient-primary text-white'
                          : 'text-gray-600 hover:text-deep-blue hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                
                {/* Mobile User Stats */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse bg-yellow-50 px-3 py-2 rounded-lg">
                      <Trophy className="w-4 h-4 text-accent-gold" />
                      <span className="text-sm font-medium text-gray-700">1,250 XP</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse bg-green-50 px-3 py-2 rounded-lg">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">7 أيام</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

export default Layout
