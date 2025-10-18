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
    <div className="max-w-6xl mx-auto mobile-optimized">
      {/* Header - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center compact-section"
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 md:mb-2 arabic-text">تدريب المفردات المتقدم</h1>
        <p className="text-sm md:text-base text-gray-600 arabic-text">تعلم كلمات متقدمة للطلاب الثانويين وامتحانات البسيخومتري</p>
      </motion.div>

      {/* Compact Stats - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="compact-stats"
      >
        <div className="compact-stat">
          <div className="compact-stat-value">{xp}</div>
          <div className="compact-stat-label arabic-text mobile-hidden md:block">نقاط XP</div>
          <div className="compact-stat-label arabic-text md:hidden">XP</div>
        </div>
        <div className="compact-stat">
          <div className="compact-stat-value">{streak}</div>
          <div className="compact-stat-label arabic-text mobile-hidden md:block">أيام متتالية</div>
          <div className="compact-stat-label arabic-text md:hidden">أيام</div>
        </div>
        <div className="compact-stat">
          <div className="compact-stat-value">{getAccuracy()}%</div>
          <div className="compact-stat-label arabic-text mobile-hidden md:block">دقة الإجابات</div>
          <div className="compact-stat-label arabic-text md:hidden">دقة</div>
        </div>
        <div className="compact-stat">
          <div className="compact-stat-value">{currentWordIndex + 1}/{vocabularyData.length}</div>
          <div className="compact-stat-label arabic-text mobile-hidden md:block">الكلمة الحالية</div>
          <div className="compact-stat-label arabic-text md:hidden">موضع</div>
        </div>
      </motion.div>

      {/* Compact Study Mode Selector - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-1 md:space-x-2 space-x-reverse justify-center compact-section"
      >
        {[
          { id: 'flashcards', name: 'البطاقات', mobileName: 'بطاقات', icon: BookOpen },
          { id: 'multipleChoice', name: 'اختيار متعدد', mobileName: 'اختيار', icon: Target }
        ].map((mode) => {
          const Icon = mode.icon
          return (
            <button
              key={mode.id}
              onClick={() => setStudyMode(mode.id)}
              className={`compact-nav-item flex items-center space-x-1 md:space-x-2 space-x-reverse ${
                studyMode === mode.id
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-3 h-3 md:w-4 md:h-4" />
              <span className="arabic-text text-xs md:text-sm">
                <span className="md:hidden">{mode.mobileName}</span>
                <span className="hidden md:inline">{mode.name}</span>
              </span>
            </button>
          )
        })}
      </motion.div>

      {/* Compact Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="compact-section"
      >
        <div className="compact-progress">
          <motion.div
            className="compact-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${((currentWordIndex + 1) / vocabularyData.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        key={currentWordIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="compact-vocab-card"
      >
        {studyMode === 'flashcards' ? (
          <div className="space-y-4">
            {/* Word Level and Category - Mobile optimized */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-1 md:space-x-2 space-x-reverse">
                <span className={`px-1 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium ${
                  currentWord.level === 'advanced' 
                    ? 'bg-red-100 text-red-800' 
                    : currentWord.level === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {currentWord.level === 'advanced' ? 'متقدم' : 
                   currentWord.level === 'intermediate' ? 'متوسط' : 'مبتدئ'}
                </span>
                <span className="px-1 md:px-2 py-0.5 md:py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {currentWord.category}
                </span>
              </div>
              <button
                onClick={playAudio}
                className="p-1.5 md:p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200"
              >
                <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
              </button>
            </div>

            {/* English Word - Mobile optimized */}
            <div className="text-center mb-3">
              <h2 className="compact-vocab-english text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 break-words">{currentWord.english}</h2>
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
                  <h3 className="compact-vocab-arabic text-xl md:text-2xl font-bold text-center break-words">{currentWord.arabic}</h3>
                  <p className="compact-vocab-meaning text-center break-words">{currentWord.meaning}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                    <p className="text-xs md:text-sm text-gray-700 mb-2 arabic-text">مثال:</p>
                    <p className="compact-grammar-example-english text-sm md:text-base break-words">{currentWord.example}</p>
                    <p className="compact-grammar-example-arabic mt-2 text-sm md:text-base break-words">{currentWord.exampleArabic}</p>
                  </div>
                  
                  {currentWord.tip && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 md:p-3">
                      <p className="text-xs md:text-sm text-yellow-800 arabic-text break-words">
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
                  className="text-center"
                >
                  <p className="text-gray-600 arabic-text">اضغط على "إظهار الإجابة" لرؤية الترجمة والمعنى</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons - Mobile optimized */}
            <div className="flex items-center justify-center space-x-2 md:space-x-3 space-x-reverse">
              <button
                onClick={toggleAnswer}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-animate text-xs md:text-sm"
              >
                <span className="md:hidden">{showAnswer ? 'إخفاء' : 'إظهار'}</span>
                <span className="hidden md:inline">{showAnswer ? 'إخفاء الإجابة' : 'إظهار الإجابة'}</span>
              </button>
              <button
                onClick={toggleSaveWord}
                className={`p-1.5 md:p-2 rounded-lg transition-all duration-200 ${
                  savedWords.includes(currentWord.id)
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-3 h-3 md:w-4 md:h-4 ${savedWords.includes(currentWord.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Word Level and Category */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2 space-x-reverse">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentWord.level === 'advanced' 
                    ? 'bg-red-100 text-red-800' 
                    : currentWord.level === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {currentWord.level === 'advanced' ? 'متقدم' : 
                   currentWord.level === 'intermediate' ? 'متوسط' : 'مبتدئ'}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {currentWord.category}
                </span>
              </div>
              <button
                onClick={playAudio}
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="text-center mb-4">
              <h2 className="compact-vocab-english text-2xl md:text-3xl font-bold mb-2">{currentWord.english}</h2>
              <p className="text-gray-600 arabic-text">اختر الترجمة الصحيحة:</p>
            </div>

            <div className="compact-grid">
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
                  className={`compact-quiz-option ${
                    showResult
                      ? option === currentWord.arabic
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : selectedAnswer === option
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="arabic-text">{option}</span>
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
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <span className="font-semibold arabic-text">
                    {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm arabic-text">الإجابة الصحيحة: {currentWord.arabic}</p>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Compact Navigation - Mobile optimized */}
        <div className="flex items-center justify-between mt-4 md:mt-6">
          <button
            onClick={prevWord}
            className="flex items-center space-x-1 md:space-x-2 space-x-reverse px-2 md:px-3 py-1.5 md:py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-xs md:text-sm"
          >
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            <span className="arabic-text hidden md:inline">السابق</span>
            <span className="arabic-text md:hidden">←</span>
          </button>

          <div className="flex items-center space-x-1 md:space-x-2 space-x-reverse">
            <button
              onClick={resetProgress}
              className="p-1.5 md:p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              title="إعادة تعيين التقدم"
            >
              <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>

          <button
            onClick={nextWord}
            className="flex items-center space-x-1 md:space-x-2 space-x-reverse px-2 md:px-3 py-1.5 md:py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 btn-animate text-xs md:text-sm"
          >
            <span className="arabic-text hidden md:inline">التالي</span>
            <span className="arabic-text md:hidden">→</span>
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </motion.div>

      {/* Compact Saved Words - Mobile optimized */}
      {savedWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="compact-card"
        >
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 arabic-text">الكلمات المحفوظة ({savedWords.length})</h3>
          <div className="compact-grid">
            {savedWords.map((wordId) => {
              const word = vocabularyData.find(w => w.id === wordId)
              return (
                <div key={wordId} className="bg-gray-50 rounded-lg p-2 md:p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold compact-vocab-english text-xs md:text-sm break-words">{word.english}</p>
                      <p className="text-xs md:text-sm text-gray-600 compact-vocab-arabic break-words">{word.arabic}</p>
                      <div className="flex space-x-1 space-x-reverse mt-1">
                        <span className={`px-1 py-0.5 rounded text-xs ${
                          word.level === 'advanced' 
                            ? 'bg-red-100 text-red-800' 
                            : word.level === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {word.level === 'advanced' ? 'متقدم' : 
                           word.level === 'intermediate' ? 'متوسط' : 'مبتدئ'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSavedWords(savedWords.filter(id => id !== wordId))}
                      className="text-red-400 hover:text-red-600 p-1 flex-shrink-0"
                    >
                      <XCircle className="w-3 h-3 md:w-4 md:h-4" />
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
