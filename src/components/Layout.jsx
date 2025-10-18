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
      {/* Header - Mobile optimized */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo - Mobile optimized */}
            <motion.div 
              className="flex items-center space-x-2 md:space-x-3 space-x-reverse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold gradient-text">تعلم الإنجليزية</h1>
                <p className="text-xs md:text-sm text-gray-500">منصة تعليمية تفاعلية</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-sm font-bold gradient-text">تعلم الإنجليزية</h1>
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

            {/* User Stats - Mobile optimized */}
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

            {/* Mobile stats - compact */}
            <div className="md:hidden flex items-center space-x-2 space-x-reverse">
              <div className="flex items-center space-x-1 space-x-reverse bg-yellow-50 px-2 py-1 rounded-lg">
                <Trophy className="w-3 h-3 text-accent-gold" />
                <span className="text-xs font-medium text-gray-700">1,250</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse bg-green-50 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-green-500" />
                <span className="text-xs font-medium text-gray-700">7</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-600 hover:text-deep-blue hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Compact */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-2 py-1 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 space-x-reverse px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-gradient-primary text-white'
                          : 'text-gray-600 hover:text-deep-blue hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content - Mobile optimized */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 md:py-8">
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
