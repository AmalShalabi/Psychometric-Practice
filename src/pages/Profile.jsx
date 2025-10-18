import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Trophy, 
  Star, 
  Target, 
  Calendar, 
  BookOpen, 
  Brain, 
  FileText,
  Award,
  TrendingUp,
  Clock,
  Share2,
  Settings,
  Edit3
} from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [xp, setXp] = useState(1250)
  const [level, setLevel] = useState(5)
  const [streak, setStreak] = useState(7)
  const [totalLessons, setTotalLessons] = useState(24)
  const [totalTests, setTotalTests] = useState(8)

  const userStats = {
    xp: xp,
    level: level,
    streak: streak,
    totalLessons: totalLessons,
    totalTests: totalTests,
    accuracy: 85,
    weeklyGoal: 5,
    completedThisWeek: 4
  }

  const achievements = [
    { id: 1, title: 'أول خطوة', description: 'أكمل أول درس', icon: Award, earned: true, date: '2024-01-15' },
    { id: 2, title: 'مثابر', description: '7 أيام متتالية', icon: Star, earned: true, date: '2024-01-22' },
    { id: 3, title: 'خبير المفردات', description: '100 كلمة جديدة', icon: BookOpen, earned: true, date: '2024-01-20' },
    { id: 4, title: 'قارئ ماهر', description: 'أكمل 5 نصوص', icon: FileText, earned: true, date: '2024-01-18' },
    { id: 5, title: 'عاشق القواعد', description: 'أكمل 10 دروس قواعد', icon: Brain, earned: false, date: null },
    { id: 6, title: 'بطل البسيخومتري', description: 'احصل على 90% في اختبار', icon: Trophy, earned: false, date: null }
  ]

  const weeklyProgress = [
    { day: 'السبت', completed: true, xp: 50 },
    { day: 'الأحد', completed: true, xp: 75 },
    { day: 'الاثنين', completed: false, xp: 0 },
    { day: 'الثلاثاء', completed: true, xp: 60 },
    { day: 'الأربعاء', completed: true, xp: 80 },
    { day: 'الخميس', completed: false, xp: 0 },
    { day: 'الجمعة', completed: true, xp: 45 }
  ]

  const recentActivity = [
    { type: 'vocabulary', title: 'درس المفردات', xp: 25, time: '2 ساعات مضت' },
    { type: 'grammar', title: 'قواعد اللغة', xp: 30, time: '5 ساعات مضت' },
    { type: 'reading', title: 'القراءة والفهم', xp: 40, time: 'أمس' },
    { type: 'psychometric', title: 'اختبار البسيخومتري', xp: 100, time: 'أمس' },
    { type: 'vocabulary', title: 'مراجعة المفردات', xp: 20, time: '2 أيام مضت' }
  ]

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: User },
    { id: 'achievements', name: 'الإنجازات', icon: Trophy },
    { id: 'progress', name: 'التقدم', icon: TrendingUp },
    { id: 'activity', name: 'النشاط الأخير', icon: Clock }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'vocabulary': return BookOpen
      case 'grammar': return FileText
      case 'reading': return BookOpen
      case 'psychometric': return Brain
      default: return Target
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'vocabulary': return 'text-blue-600'
      case 'grammar': return 'text-purple-600'
      case 'reading': return 'text-green-600'
      case 'psychometric': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const shareProfile = () => {
    const message = `تحقق من تقدمي في تعلم الإنجليزية! حصلت على ${xp} XP ووصلت للمستوى ${level}! 🌟📚`
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">الملف الشخصي</h1>
        <p className="text-gray-600">تتبع تقدمك وإنجازاتك في رحلة التعلم</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">المتعلم المثابر</h2>
              <p className="text-gray-600">المستوى {level} • {xp} XP</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={shareProfile}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{xp}</div>
            <div className="text-sm text-gray-600">XP</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{streak}</div>
            <div className="text-sm text-gray-600">أيام متتالية</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{totalLessons}</div>
            <div className="text-sm text-gray-600">دروس مكتملة</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Brain className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{totalTests}</div>
            <div className="text-sm text-gray-600">اختبارات مكتملة</div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-2 shadow-lg border border-gray-100"
      >
        <div className="flex space-x-2 space-x-reverse">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">نظرة عامة</h3>
            
            {/* Weekly Goal */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-2">الهدف الأسبوعي</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {userStats.completedThisWeek} من {userStats.weeklyGoal} دروس
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {Math.round((userStats.completedThisWeek / userStats.weeklyGoal) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userStats.completedThisWeek / userStats.weeklyGoal) * 100}%` }}
                />
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-2">دقة الإجابات</h4>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-green-600">{userStats.accuracy}%</span>
                <div className="text-right">
                  <div className="text-sm text-gray-600">متوسط الدقة</div>
                  <div className="text-xs text-gray-500">آخر 30 يوم</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">الإنجازات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      achievement.earned
                        ? 'border-accent-gold bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        achievement.earned ? 'bg-accent-gold' : 'bg-gray-300'
                      }`}>
                        <Icon className={`w-5 h-5 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          achievement.earned ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h4>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-gray-500">
                            {new Date(achievement.date).toLocaleDateString('ar-SA')}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">التقدم الأسبوعي</h3>
            
            {/* Weekly Calendar */}
            <div className="grid grid-cols-7 gap-2">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${
                    day.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {day.completed ? '✓' : '○'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{day.xp} XP</div>
                </div>
              ))}
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">رسم بياني للتقدم سيظهر هنا قريباً</p>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">النشاط الأخير</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={index} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type).replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <Icon className={`w-5 h-5 ${getActivityColor(activity.type)}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-800">+{activity.xp} XP</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Profile
