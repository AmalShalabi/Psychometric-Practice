import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RotateCcw, 
  Volume2, 
  Heart, 
  Star, 
  Trophy, 
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  BookOpen,
  Target
} from 'lucide-react'
import vocabularyData from '../data/vocabulary.json'

const Vocabulary = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studyMode, setStudyMode] = useState('flashcards') // flashcards, multipleChoice, review
  const [savedWords, setSavedWords] = useState([])
  const [xp, setXp] = useState(1250)
  const [streak, setStreak] = useState(7)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const currentWord = vocabularyData[currentWordIndex]

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.english)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % vocabularyData.length)
    setShowAnswer(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const prevWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + vocabularyData.length) % vocabularyData.length)
    setShowAnswer(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const toggleSaveWord = () => {
    const wordId = currentWord.id
    if (savedWords.includes(wordId)) {
      setSavedWords(savedWords.filter(id => id !== wordId))
    } else {
      setSavedWords([...savedWords, wordId])
    }
  }

  const handleMultipleChoiceAnswer = (answer) => {
    setSelectedAnswer(answer)
    const correct = answer === currentWord.arabic
    setIsCorrect(correct)
    setShowResult(true)
    setTotalQuestions(prev => prev + 1)
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1)
      setXp(prev => prev + 10)
    }
  }

  const resetProgress = () => {
    setCurrentWordIndex(0)
    setShowAnswer(false)
    setSelectedAnswer(null)
    setShowResult(false)
    setCorrectAnswers(0)
    setTotalQuestions(0)
  }

  const getAccuracy = () => {
    if (totalQuestions === 0) return 0
    return Math.round((correctAnswers / totalQuestions) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">تدريب المفردات</h1>
        <p className="text-gray-600">تعلم كلمات جديدة بطريقة تفاعلية وممتعة</p>
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
              <span className="font-semibold text-gray-700">{streak} أيام</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-700">{getAccuracy()}% دقة</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {currentWordIndex + 1} من {vocabularyData.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentWordIndex + 1) / vocabularyData.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Study Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-4 space-x-reverse justify-center"
      >
        {[
          { id: 'flashcards', name: 'البطاقات', icon: BookOpen },
          { id: 'multipleChoice', name: 'اختيار متعدد', icon: Target }
        ].map((mode) => {
          const Icon = mode.icon
          return (
            <button
              key={mode.id}
              onClick={() => setStudyMode(mode.id)}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                studyMode === mode.id
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{mode.name}</span>
            </button>
          )
        })}
      </motion.div>

      {/* Main Content */}
      <motion.div
        key={currentWordIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
      >
        {studyMode === 'flashcards' ? (
          <div className="text-center space-y-6">
            {/* English Word */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-deep-blue ltr">{currentWord.english}</h2>
              <button
                onClick={playAudio}
                className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200"
              >
                <Volume2 className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            {/* Answer Section */}
            <AnimatePresence mode="wait">
              {showAnswer ? (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">{currentWord.arabic}</h3>
                  <p className="text-lg text-gray-600">{currentWord.meaning}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">مثال:</p>
                    <p className="ltr text-gray-800">{currentWord.example}</p>
                    <p className="text-gray-600 mt-2">{currentWord.exampleArabic}</p>
                  </div>
                  {currentWord.tip && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>نصيحة:</strong> {currentWord.tip}
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="text-gray-600">اضغط على "إظهار الإجابة" لرؤية الترجمة</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <button
                onClick={toggleAnswer}
                className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-animate"
              >
                {showAnswer ? 'إخفاء الإجابة' : 'إظهار الإجابة'}
              </button>
              <button
                onClick={toggleSaveWord}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  savedWords.includes(currentWord.id)
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${savedWords.includes(currentWord.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-deep-blue ltr mb-4">{currentWord.english}</h2>
              <p className="text-gray-600">اختر الترجمة الصحيحة:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                currentWord.arabic,
                vocabularyData[(currentWordIndex + 1) % vocabularyData.length].arabic,
                vocabularyData[(currentWordIndex + 2) % vocabularyData.length].arabic,
                vocabularyData[(currentWordIndex + 3) % vocabularyData.length].arabic
              ].sort(() => Math.random() - 0.5).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoiceAnswer(option)}
                  disabled={showResult}
                  className={`p-4 rounded-lg border-2 text-right font-medium transition-all duration-200 ${
                    showResult
                      ? option === currentWord.arabic
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : selectedAnswer === option
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center p-4 rounded-lg ${
                  isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                  <span className="font-semibold">
                    {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm">الإجابة الصحيحة: {currentWord.arabic}</p>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevWord}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={resetProgress}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={nextWord}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 btn-animate"
          >
            <span>التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Saved Words */}
      {savedWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">الكلمات المحفوظة ({savedWords.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedWords.map((wordId) => {
              const word = vocabularyData.find(w => w.id === wordId)
              return (
                <div key={wordId} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold ltr">{word.english}</p>
                      <p className="text-sm text-gray-600">{word.arabic}</p>
                    </div>
                    <button
                      onClick={() => setSavedWords(savedWords.filter(id => id !== wordId))}
                      className="text-red-400 hover:text-red-600"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Vocabulary
