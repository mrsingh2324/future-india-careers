import { create } from 'zustand';

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  type: 'personality' | 'interest' | 'scenario';
}

export interface CareerSuggestion {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  growthRate: string;
  requiredSkills: string[];
  stream: string;
  topColleges: string[];
  roadmap: {
    phase: string;
    duration: string;
    description: string;
  }[];
}

interface AssessmentStore {
  currentQuestion: number;
  responses: AssessmentResponse[];
  isCompleted: boolean;
  careerSuggestions: CareerSuggestion[];
  isLoading: boolean;
  
  // Actions
  setCurrentQuestion: (question: number) => void;
  addResponse: (response: AssessmentResponse) => void;
  setCareerSuggestions: (suggestions: CareerSuggestion[]) => void;
  setIsLoading: (loading: boolean) => void;
  resetAssessment: () => void;
  completeAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  currentQuestion: 0,
  responses: [],
  isCompleted: false,
  careerSuggestions: [],
  isLoading: false,

  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  
  addResponse: (response) => set((state) => ({
    responses: [...state.responses.filter(r => r.questionId !== response.questionId), response]
  })),

  setCareerSuggestions: (suggestions) => set({ careerSuggestions: suggestions }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  resetAssessment: () => set({
    currentQuestion: 0,
    responses: [],
    isCompleted: false,
    careerSuggestions: [],
    isLoading: false
  }),

  completeAssessment: () => set({ isCompleted: true })
}));