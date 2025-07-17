import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AssessmentAnswer {
  question: string;
  answer: string;
}

interface AssessmentData {
  answers: AssessmentAnswer[];
  currentQuestionIndex: number;
}

interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  averageSalary: string;
  growthOutlook: string;
  requiredSkills: string[];
  educationRequired: string;
}

interface AssessmentResults {
  careerRecommendations: CareerRecommendation[];
  skillsAssessment: {
    strengths: string[];
    areasForDevelopment: string[];
  };
  nextSteps: string[];
}

export const useAIAssessment = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    answers: [],
    currentQuestionIndex: 0,
  });
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const startAssessment = async () => {
    setIsLoading(true);
    try {
      // Initial question
      const initialQuestion = "What field or industry interests you the most, and what draws you to it?";
      setCurrentQuestion(initialQuestion);
      setAssessmentData({
        answers: [],
        currentQuestionIndex: 0,
      });
    } catch (error) {
      console.error('Error starting assessment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answer: string) => {
    setIsLoading(true);
    try {
      const newAnswer: AssessmentAnswer = {
        question: currentQuestion,
        answer,
      };

      const updatedData: AssessmentData = {
        answers: [...assessmentData.answers, newAnswer],
        currentQuestionIndex: assessmentData.currentQuestionIndex + 1,
      };

      setAssessmentData(updatedData);

      // If we have enough answers (5), generate results
      if (updatedData.answers.length >= 5) {
        await generateResults(updatedData);
      } else {
        // Generate next question
        const { data, error } = await supabase.functions.invoke('ai-counseling', {
          body: {
            action: 'generateNextQuestion',
            assessmentData: updatedData,
          },
        });

        if (error) throw error;
        setCurrentQuestion(data.question);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResults = async (data: AssessmentData) => {
    setIsLoading(true);
    try {
      const { data: response, error } = await supabase.functions.invoke('ai-counseling', {
        body: {
          action: 'generateResults',
          assessmentData: data,
        },
      });

      if (error) throw error;
      setResults(response.results);
    } catch (error) {
      console.error('Error generating results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAssessment = () => {
    setAssessmentData({
      answers: [],
      currentQuestionIndex: 0,
    });
    setCurrentQuestion('');
    setResults(null);
  };

  return {
    assessmentData,
    currentQuestion,
    isLoading,
    results,
    startAssessment,
    submitAnswer,
    resetAssessment,
    isComplete: results !== null,
    progress: Math.min((assessmentData.answers.length / 5) * 100, 100),
  };
};