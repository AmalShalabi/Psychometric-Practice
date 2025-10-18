import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  BookOpen, 
  FileText, 
  BookMarked, 
  Brain, 
  Trophy, 
  Star, 
  Target,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const dailyChallenge = {
    title: "تحدي الكلمة اليومية",
    description: "تعلم كلمة جديدة واحصل على 10 XP",
    word: "Achievement",
    meaning: "إنجاز، تحقيق",
    xp: 10,
    timeLeft: "23:45:12"
  }

  const stats = {
    xp: 1250,
    level: 5,
    streak: 7,
    weeklyProgress: [65, 80, 45, 90, 75, 85, 95]
  }

  const quickActions = [
    {
      title: "تدريب المفردات",
      description: "تعلم كلمات جديدة",
      icon: BookOpen,
      href: "/vocabulary",
      color: "from-blue-500 to-blue-600",
      count: "150 كلمة"
    },
    {
      title: "قواعد اللغة",
      description: "تعلم القواعد الأساسية",
      icon: FileText,
      href: "/grammar",
      color: "from-purple-500 to-purple-600",
      count: "12 درس"
    },
    {
      title: "القراءة",
      description: "حسّن مهارات القراءة",
      icon: BookMarked,
      href: "/reading",
      color: "from-green-500 to-green-600",
      count: "8 نصوص"
    },
    {
      title: "البسيخومتري",
      description: "تدريبات الامتحان",
      icon: Brain,
      href: "/psychometric",
      color: "from-orange-500 to-orange-600",
      count: "5 اختبارات"
    }
  ]

  const achievements = [
    { title: "أول خطوة", description: "أكمل أول درس", icon: Award, earned: true },
    { title: "مثابر", description: "7 أيام متتالية", icon: Star, earned: true },
    { title: "خبير المفردات", description: "100 كلمة جديدة", icon: BookOpen, earned: false },
    { title: "قارئ ماهر", description: "أكمل 5 نصوص", icon: BookMarked, earned: false }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-primary rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">مرحباً بك في رحلة التعلم! 🌟</h1>
          <p className="text-lg opacity-90 mb-6">
            استعد لتطوير مهاراتك في اللغة الإنجليزية بطريقة تفاعلية وممتعة
          </p>
          <div className="flex items-center space-x-4 space-x-reverse text-sm">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString('ar-SA')}</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Target className="w-4 h-4" />
              <span>الهدف اليومي: 30 دقيقة</span>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
      </motion.div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{dailyChallenge.title}</h2>
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>متبقي: {dailyChallenge.timeLeft}</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 ltr">{dailyChallenge.word}</h3>
            <p className="text-lg text-gray-600 mb-4">{dailyChallenge.meaning}</p>
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <Trophy className="w-5 h-5 text-accent-gold" />
              <span className="font-semibold text-gray-700">+{dailyChallenge.xp} XP</span>
            </div>
          </div>
        </div>
        
        <Link
          to="/vocabulary"
          className="w-full bg-gradient-primary text-white py-3 px-6 rounded-xl font-semibold text-center block hover:shadow-lg transition-all duration-200 btn-animate"
        >
          ابدأ التحدي الآن
        </Link>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.xp}</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">النقاط</h3>
          <p className="text-sm text-gray-500">المستوى {stats.level}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{stats.streak}</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">الأيام المتتالية</h3>
          <p className="text-sm text-gray-500">استمر في التقدم!</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">85%</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">التقدم الأسبوعي</h3>
          <p className="text-sm text-gray-500">ممتاز هذا الأسبوع!</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">ابدأ التعلم</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Link
                  to={action.href}
                  className="block bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{action.count}</span>
                    <Play className="w-4 h-4 text-gray-400 group-hover:text-deep-blue transition-colors duration-200" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">الإنجازات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  achievement.earned
                    ? 'border-accent-gold bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  achievement.earned ? 'bg-accent-gold' : 'bg-gray-300'
                }`}>
                  <Icon className={`w-5 h-5 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${
                  achievement.earned ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-xs ${
                  achievement.earned ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default Home
