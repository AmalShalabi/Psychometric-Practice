import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Star
} from 'lucide-react'
import readingData from '../data/reading.json'

const Reading = () => {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
  const [showQuestions, setShowQuestions] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [highlightedText, setHighlightedText] = useState('')
  const [xp, setXp] = useState(1250)

  const currentPassage = readingData[currentPassageIndex]

  useEffect(() => {
    let interval = null
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerActive(false)
      if (showQuestions) {
        submitQuiz()
      }
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timeLeft])

  const startReading = () => {
    setShowQuestions(false)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setScore(0)
    setTimeLeft(currentPassage.timeLimit * 60) // Convert minutes to seconds
    setIsTimerActive(true)
  }

  const startQuiz = () => {
    setShowQuestions(true)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setScore(0)
    setTimeLeft(currentPassage.quizTimeLimit * 60)
    setIsTimerActive(true)
  }

  const nextPassage = () => {
    setCurrentPassageIndex((prev) => (prev + 1) % readingData.length)
    setShowQuestions(false)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setScore(0)
    setIsTimerActive(false)
    setTimeLeft(0)
  }

  const prevPassage = () => {
    setCurrentPassageIndex((prev) => (prev - 1 + readingData.length) % readingData.length)
    setShowQuestions(false)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setScore(0)
    setIsTimerActive(false)
    setTimeLeft(0)
  }

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const submitQuiz = () => {
    let correctAnswers = 0
    currentPassage.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    const newScore = Math.round((correctAnswers / currentPassage.questions.length) * 100)
    setScore(newScore)
    setQuizSubmitted(true)
    setIsTimerActive(false)
    
    // Award XP based on score
    const xpEarned = Math.round((newScore / 100) * 100)
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
    if (score >= 90) return 'ممتاز! فهمت النص بشكل رائع!'
    if (score >= 80) return 'جيد جداً! استمر في التقدم!'
    if (score >= 60) return 'جيد، لكن يمكنك التحسن أكثر!'
    return 'حاول مرة أخرى، الممارسة تؤدي إلى الكمال!'
  }

  const handleTextHighlight = (text) => {
    setHighlightedText(text)
    // Here you could add translation or explanation functionality
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">القراءة والفهم</h1>
        <p className="text-gray-600">حسّن مهارات القراءة والفهم باللغة الإنجليزية</p>
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
              <Target className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-700">المستوى: {currentPassage.level}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            النص {currentPassageIndex + 1} من {readingData.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPassageIndex + 1) / readingData.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Timer */}
      {isTimerActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="text-lg font-bold text-red-600">
              {formatTime(timeLeft)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        key={currentPassageIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        {!showQuestions ? (
          <div className="space-y-6">
            {/* Passage Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentPassage.title}</h2>
              <div className="flex items-center justify-center space-x-4 space-x-reverse text-sm text-gray-600">
                <span>المستوى: {currentPassage.level}</span>
                <span>•</span>
                <span>وقت القراءة: {currentPassage.timeLimit} دقيقة</span>
                <span>•</span>
                <span>الكلمات: {currentPassage.wordCount}</span>
              </div>
            </div>

            {/* Passage Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-6 leading-relaxed">
                {currentPassage.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-800 ltr">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Highlighted Text Translation */}
            {highlightedText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-blue-800 mb-2">ترجمة النص المحدد:</h4>
                <p className="text-blue-700">{highlightedText}</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 space-x-reverse pt-6">
              <button
                onClick={startQuiz}
                className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-animate"
              >
                <Target className="w-5 h-5" />
                <span>ابدأ الاختبار</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quiz Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">أسئلة الفهم</h2>
              <p className="text-gray-600">اقرأ الأسئلة واختر الإجابة الصحيحة</p>
            </div>

            {/* Quiz Questions */}
            <div className="space-y-6">
              {currentPassage.questions.map((question, questionIndex) => (
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: questionIndex * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {questionIndex + 1}. {question.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedAnswers[questionIndex] === option
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={option}
                          checked={selectedAnswers[questionIndex] === option}
                          onChange={() => handleAnswerSelect(questionIndex, option)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quiz Actions */}
            <div className="flex items-center justify-center space-x-4 space-x-reverse pt-6">
              {!quizSubmitted ? (
                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(selectedAnswers).length !== currentPassage.questions.length}
                  className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-animate disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تصحيح الإجابات
                </button>
              ) : (
                <div className="text-center space-y-4">
                  <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                  <p className="text-lg text-gray-700">{getScoreMessage(score)}</p>
                  <div className="flex items-center justify-center space-x-4 space-x-reverse">
                    <button
                      onClick={() => setShowQuestions(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      مراجعة النص
                    </button>
                    <button
                      onClick={nextPassage}
                      className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 btn-animate"
                    >
                      النص التالي
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={prevPassage}
            disabled={currentPassageIndex === 0}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="text-sm text-gray-500">
              {currentPassageIndex + 1} / {readingData.length}
            </div>
          </div>

          <button
            onClick={nextPassage}
            disabled={currentPassageIndex === readingData.length - 1}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 btn-animate disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Reading
