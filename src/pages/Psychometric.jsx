import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle, 
  Trophy,
  Star,
  BarChart3,
  Download,
  Share2,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react'
import psychometricData from '../data/psychometric.json'

const Psychometric = () => {
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [isTestActive, setIsTestActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [detailedResults, setDetailedResults] = useState(null)
  const [xp, setXp] = useState(1250)

  const currentTest = psychometricData[currentTestIndex]

  useEffect(() => {
    let interval = null
    if (isTestActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTestActive) {
      submitTest()
    }
    return () => clearInterval(interval)
  }, [isTestActive, timeLeft])

  const startTest = () => {
    setIsTestActive(true)
    setTimeLeft(currentTest.timeLimit * 60) // Convert minutes to seconds
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTestSubmitted(false)
    setScore(0)
    setDetailedResults(null)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const submitTest = () => {
    let correctAnswers = 0
    let sectionScores = {}
    
    currentTest.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
        if (!sectionScores[question.section]) {
          sectionScores[question.section] = { correct: 0, total: 0 }
        }
        sectionScores[question.section].correct++
      }
      if (!sectionScores[question.section]) {
        sectionScores[question.section] = { correct: 0, total: 0 }
      }
      sectionScores[question.section].total++
    })
    
    const newScore = Math.round((correctAnswers / currentTest.questions.length) * 100)
    setScore(newScore)
    setTestSubmitted(true)
    setIsTestActive(false)
    
    // Calculate detailed results
    const detailed = Object.keys(sectionScores).map(section => ({
      section,
      score: Math.round((sectionScores[section].correct / sectionScores[section].total) * 100),
      correct: sectionScores[section].correct,
      total: sectionScores[section].total
    }))
    
    setDetailedResults(detailed)
    
    // Award XP based on score
    const xpEarned = Math.round((newScore / 100) * 200)
    setXp(prev => prev + xpEarned)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score) => {
    if (score >= 90) return 'ممتاز! أداء رائع في الاختبار!'
    if (score >= 80) return 'جيد جداً! أنت على الطريق الصحيح!'
    if (score >= 60) return 'جيد، لكن يمكنك التحسن أكثر!'
    return 'حاول مرة أخرى، الممارسة تؤدي إلى الكمال!'
  }

  const getRecommendations = (detailedResults) => {
    const recommendations = []
    
    detailedResults.forEach(section => {
      if (section.score < 60) {
        recommendations.push(`تحتاج إلى ممارسة أكثر في ${section.section}`)
      } else if (section.score < 80) {
        recommendations.push(`يمكنك التحسن في ${section.section}`)
      }
    })
    
    if (recommendations.length === 0) {
      recommendations.push('أداء ممتاز في جميع الأقسام!')
    }
    
    return recommendations
  }

  const shareResults = () => {
    const message = `أنهيت اختبار البسيخومتري في تطبيق تعلم الإنجليزية - حصلت على درجة ${score}% وحققت سلسلة مدة 7 أيام! 🌟📚`
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const downloadResults = () => {
    // Create a simple text summary for download
    const resultsText = `
نتائج اختبار البسيخومتري
========================
الاختبار: ${currentTest.title}
الدرجة الإجمالية: ${score}%
الوقت المستغرق: ${formatTime((currentTest.timeLimit * 60) - timeLeft)}

النتائج التفصيلية:
${detailedResults.map(section => 
  `${section.section}: ${section.score}% (${section.correct}/${section.total})`
).join('\n')}

التوصيات:
${getRecommendations(detailedResults).join('\n')}

تاريخ الاختبار: ${new Date().toLocaleDateString('ar-SA')}
    `
    
    const blob = new Blob([resultsText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `psychometric-results-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetTest = () => {
    setIsTestActive(false)
    setTimeLeft(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTestSubmitted(false)
    setScore(0)
    setDetailedResults(null)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">تدريبات البسيخومتري</h1>
        <p className="text-gray-600">اختبر مهاراتك في اللغة الإنجليزية مع اختبارات محاكاة للبسيخومتري</p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Trophy className="w-5 h-5 text-accent-gold" />
              <span className="font-semibold text-gray-700">{xp} XP</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Star className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700">المستوى 5</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Brain className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-700">اختبارات مكتملة: 3</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            الاختبار {currentTestIndex + 1} من {psychometricData.length}
          </div>
        </div>
      </motion.div>

      {/* Test Selection */}
      {!isTestActive && !testSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {psychometricData.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{test.title}</h3>
                <p className="text-gray-600 mb-4">{test.description}</p>
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-between">
                    <span>المدة:</span>
                    <span>{test.timeLimit} دقيقة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>الأسئلة:</span>
                    <span>{test.questions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>المستوى:</span>
                    <span>{test.level}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentTestIndex(index)
                    startTest()
                  }}
                  className="w-full bg-gradient-primary text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-animate"
                >
                  ابدأ الاختبار
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Active Test */}
      {isTestActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          {/* Test Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentTest.title}</h2>
              <p className="text-gray-600">السؤال {currentQuestionIndex + 1} من {currentTest.questions.length}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-500">متبقي</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <motion.div
              className="bg-gradient-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / currentTest.questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Current Question */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {currentTest.questions[currentQuestionIndex].question}
              </h3>
              
              <div className="space-y-3">
                {currentTest.questions[currentQuestionIndex].options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={selectedAnswers[currentQuestionIndex] === option}
                      onChange={() => handleAnswerSelect(currentQuestionIndex, option)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>السابق</span>
              </button>

              <div className="flex items-center space-x-2 space-x-reverse">
                {currentTest.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 ${
                      index === currentQuestionIndex
                        ? 'bg-blue-500 text-white'
                        : selectedAnswers[index]
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                {currentQuestionIndex === currentTest.questions.length - 1 ? (
                  <button
                    onClick={submitTest}
                    className="px-6 py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-animate"
                  >
                    إنهاء الاختبار
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 btn-animate"
                  >
                    <span>التالي</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Test Results */}
      {testSubmitted && detailedResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{getScoreMessage(score)}</h2>
            <p className="text-gray-600 mb-6">اختبار: {currentTest.title}</p>
            
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <button
                onClick={shareResults}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة النتائج</span>
              </button>
              <button
                onClick={downloadResults}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>تحميل النتائج</span>
              </button>
              <button
                onClick={resetTest}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>اختبار جديد</span>
              </button>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">النتائج التفصيلية</h3>
            <div className="space-y-4">
              {detailedResults.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">{section.section}</h4>
                    <p className="text-sm text-gray-600">{section.correct} من {section.total} صحيح</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(section.score)}`}>
                      {section.score}%
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          section.score >= 80 ? 'bg-green-500' :
                          section.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${section.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">التوصيات</h3>
            <div className="space-y-3">
              {getRecommendations(detailedResults).map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Psychometric
