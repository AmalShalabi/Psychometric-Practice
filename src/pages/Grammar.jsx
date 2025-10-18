import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  Play,
  Target,
  Trophy,
  Star
} from 'lucide-react'
import grammarData from '../data/grammar.json'

const Grammar = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [xp, setXp] = useState(1250)

  const currentLesson = grammarData[currentLessonIndex]

  const nextLesson = () => {
    setCurrentLessonIndex((prev) => (prev + 1) % grammarData.length)
    setShowQuiz(false)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setScore(0)
  }

  const prevLesson = () => {
    setCurrentLessonIndex((prev) => (prev - 1 + grammarData.length) % grammarData.length)
    setShowQuiz(false)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setScore(0)
  }

  const startQuiz = () => {
    setShowQuiz(true)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setScore(0)
  }

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const submitQuiz = () => {
    let correctAnswers = 0
    currentLesson.quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    const newScore = Math.round((correctAnswers / currentLesson.quiz.length) * 100)
    setScore(newScore)
    setQuizSubmitted(true)
    
    // Award XP based on score
    const xpEarned = Math.round((newScore / 100) * 50)
    setXp(prev => prev + xpEarned)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score) => {
    if (score >= 90) return 'ممتاز! أنت خبير في القواعد!'
    if (score >= 80) return 'جيد جداً! استمر في التقدم!'
    if (score >= 60) return 'جيد، لكن يمكنك التحسن أكثر!'
    return 'حاول مرة أخرى، الممارسة تؤدي إلى الكمال!'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">قواعد اللغة الإنجليزية</h1>
        <p className="text-gray-600">تعلم القواعد بطريقة سهلة ومفهومة</p>
      </motion.div>

      {/* Progress & Stats */}
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
          </div>
          <div className="text-sm text-gray-500">
            الدرس {currentLessonIndex + 1} من {grammarData.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentLessonIndex + 1) / grammarData.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Lesson Content */}
      <motion.div
        key={currentLessonIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        {!showQuiz ? (
          <div className="space-y-6">
            {/* Lesson Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentLesson.title}</h2>
              <p className="text-gray-600">{currentLesson.description}</p>
            </div>

            {/* Lesson Content */}
            <div className="space-y-6">
              {currentLesson.content.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{section.heading}</h3>
                  
                  {section.explanation && (
                    <p className="text-gray-700 leading-relaxed">{section.explanation}</p>
                  )}

                  {section.examples && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">أمثلة:</h4>
                      <ul className="space-y-2">
                        {section.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start space-x-3 space-x-reverse">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <div>
                              <p className="ltr text-gray-800 font-medium">{example.english}</p>
                              <p className="text-gray-600">{example.arabic}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.rules && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">قواعد مهمة:</h4>
                      <ul className="space-y-1">
                        {section.rules.map((rule, ruleIndex) => (
                          <li key={ruleIndex} className="text-yellow-700 text-sm">
                            • {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">اختبار: {currentLesson.title}</h2>
              <p className="text-gray-600">اختر الإجابة الصحيحة لكل سؤال</p>
            </div>

            {/* Quiz Questions */}
            <div className="space-y-6">
              {currentLesson.quiz.map((question, questionIndex) => (
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
                  disabled={Object.keys(selectedAnswers).length !== currentLesson.quiz.length}
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
                      onClick={() => setShowQuiz(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      مراجعة الدرس
                    </button>
                    <button
                      onClick={nextLesson}
                      className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 btn-animate"
                    >
                      الدرس التالي
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
            onClick={prevLesson}
            disabled={currentLessonIndex === 0}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="text-sm text-gray-500">
              {currentLessonIndex + 1} / {grammarData.length}
            </div>
          </div>

          <button
            onClick={nextLesson}
            disabled={currentLessonIndex === grammarData.length - 1}
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

export default Grammar
