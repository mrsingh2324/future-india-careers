import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AssessmentData {
  answers: Array<{
    question: string;
    answer: string;
  }>;
  currentQuestionIndex: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, assessmentData } = await req.json();

    if (action === 'generateNextQuestion') {
      const nextQuestion = await generateNextQuestion(assessmentData);
      return new Response(JSON.stringify({ question: nextQuestion }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'generateResults') {
      const results = await generateCareerResults(assessmentData);
      return new Response(JSON.stringify({ results }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');
  } catch (error) {
    console.error('Error in ai-counseling function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateNextQuestion(assessmentData: AssessmentData) {
  const previousAnswers = assessmentData.answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n');
  
  const prompt = `You are an AI career counselor. Based on the previous answers, generate the next most relevant question to understand the person's career preferences and skills.

Previous Q&A:
${previousAnswers}

Generate a single, specific question that will help determine their ideal career path. The question should be personalized based on their previous answers and dig deeper into their interests, skills, or work preferences.

Return only the question text, nothing else.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert career counselor who asks insightful, personalized questions.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function generateCareerResults(assessmentData: AssessmentData) {
  const allAnswers = assessmentData.answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n');
  
  const prompt = `Based on this career assessment, provide personalized career recommendations:

Assessment Results:
${allAnswers}

Analyze the responses and provide:
1. Top 3 career recommendations with detailed descriptions
2. Skills assessment and development suggestions
3. Specific next steps for career development

Format as JSON with this structure:
{
  "careerRecommendations": [
    {
      "title": "Career Title",
      "description": "Detailed description",
      "matchPercentage": 85,
      "averageSalary": "$75,000 - $120,000",
      "growthOutlook": "High",
      "requiredSkills": ["skill1", "skill2"],
      "educationRequired": "Education level"
    }
  ],
  "skillsAssessment": {
    "strengths": ["strength1", "strength2"],
    "areasForDevelopment": ["area1", "area2"]
  },
  "nextSteps": ["step1", "step2", "step3"]
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert career counselor who provides detailed, actionable career advice.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}