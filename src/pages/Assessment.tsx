import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const questions = [
  {
    id: 'personality_1',
    type: 'personality',
    question: 'How do you prefer to solve problems?',
    options: [
      { value: 'systematic', label: 'Step-by-step, methodical approach' },
      { value: 'creative', label: 'Creative and innovative solutions' },
      { value: 'collaborative', label: 'Working with others to find solutions' },
      { value: 'analytical', label: 'Data-driven analysis and research' }
    ]
  },
  {
    id: 'personality_2',
    type: 'personality',
    question: 'In a group project, you naturally tend to:',
    options: [
      { value: 'leader', label: 'Take charge and lead the team' },
      { value: 'supporter', label: 'Support and help team members' },
      { value: 'innovator', label: 'Come up with new ideas and solutions' },
      { value: 'organizer', label: 'Plan and organize tasks efficiently' }
    ]
  },
  {
    id: 'interest_1',
    type: 'interest',
    question: 'Rate your interest in STEM subjects (Science, Technology, Engineering, Math):',
    options: [
      { value: 5, label: 'Very High Interest' },
      { value: 4, label: 'High Interest' },
      { value: 3, label: 'Moderate Interest' },
      { value: 2, label: 'Low Interest' },
      { value: 1, label: 'Very Low Interest' }
    ]
  },
  {
    id: 'interest_2',
    type: 'interest',
    question: 'Rate your interest in Creative Arts (Design, Music, Writing, etc.):',
    options: [
      { value: 5, label: 'Very High Interest' },
      { value: 4, label: 'High Interest' },
      { value: 3, label: 'Moderate Interest' },
      { value: 2, label: 'Low Interest' },
      { value: 1, label: 'Very Low Interest' }
    ]
  },
  {
    id: 'interest_3',
    type: 'interest',
    question: 'Rate your interest in Business and Entrepreneurship:',
    options: [
      { value: 5, label: 'Very High Interest' },
      { value: 4, label: 'High Interest' },
      { value: 3, label: 'Moderate Interest' },
      { value: 2, label: 'Low Interest' },
      { value: 1, label: 'Very Low Interest' }
    ]
  },
  {
    id: 'scenario_1',
    type: 'scenario',
    question: 'You have to choose between two internships. Which would you prefer?',
    options: [
      { value: 'tech', label: 'A tech startup working on AI applications' },
      { value: 'healthcare', label: 'A hospital researching new treatments' },
      { value: 'finance', label: 'A finance company analyzing market trends' },
      { value: 'creative', label: 'A creative agency designing brand campaigns' }
    ]
  },
  {
    id: 'scenario_2',
    type: 'scenario',
    question: 'What motivates you most in your future career?',
    options: [
      { value: 'impact', label: 'Making a positive impact on society' },
      { value: 'innovation', label: 'Working on cutting-edge technology' },
      { value: 'stability', label: 'Job security and steady income' },
      { value: 'growth', label: 'Rapid career growth and leadership' }
    ]
  }
];

export default function Assessment() {
  const { currentQuestion, responses, addResponse } = useAssessmentStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedAnswer) {
      addResponse({
        questionId: questions[currentQuestion].id,
        answer: selectedAnswer,
        type: questions[currentQuestion].type as 'personality' | 'interest' | 'scenario'
      });
      
      if (currentQuestion < questions.length - 1) {
        useAssessmentStore.getState().setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        // Complete assessment
        useAssessmentStore.getState().completeAssessment();
        navigate('/results');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      useAssessmentStore.getState().setCurrentQuestion(currentQuestion - 1);
      // Load previous answer
      const prevResponse = responses.find(r => r.questionId === questions[currentQuestion - 1].id);
      setSelectedAnswer(prevResponse?.answer || '');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Career Assessment
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="question-card"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option.value)}
                  className={`option-button ${
                    selectedAnswer === option.value ? 'selected' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {selectedAnswer === option.value && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}