import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { TrendingUp, Users, BookOpen, MapPin, Star } from 'lucide-react';

// Mock career suggestions - in real app, this would come from AI processing
const mockCareerSuggestions = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Design and develop software applications, systems, and websites. Work with cutting-edge technologies and solve complex problems.',
    salaryRange: '₹8-25 LPA',
    growthRate: '22%',
    requiredSkills: ['Programming', 'Problem Solving', 'System Design', 'Databases', 'APIs'],
    stream: 'Science (PCM)',
    topColleges: ['IIT Delhi', 'IIT Bombay', 'BITS Pilani'],
    roadmap: [
      { phase: 'Class 12', duration: '1 year', description: 'Focus on Mathematics and Physics. Start learning programming basics.' },
      { phase: 'BTech/BE', duration: '4 years', description: 'Pursue Computer Science or related engineering degree.' },
      { phase: 'Internships', duration: '2-3 months', description: 'Gain practical experience through internships in tech companies.' },
      { phase: 'Specialization', duration: '1-2 years', description: 'Specialize in areas like AI, Web Development, or Mobile Apps.' }
    ]
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make informed decisions. Use statistical methods and machine learning.',
    salaryRange: '₹12-40 LPA',
    growthRate: '35%',
    requiredSkills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization', 'Business Understanding'],
    stream: 'Science (PCM) or Commerce with Math',
    topColleges: ['IIT Kharagpur', 'IIM Bangalore', 'ISI Kolkata'],
    roadmap: [
      { phase: 'Class 12', duration: '1 year', description: 'Strong foundation in Mathematics and Statistics.' },
      { phase: 'Degree', duration: '3-4 years', description: 'BSc Statistics, BTech CSE, or BBA with Analytics.' },
      { phase: 'Certifications', duration: '6-12 months', description: 'Get certified in Python, R, and machine learning.' },
      { phase: 'Experience', duration: '2-3 years', description: 'Work on real projects and build portfolio.' }
    ]
  },
  {
    id: '3',
    title: 'Product Manager',
    description: 'Lead product development from conception to launch. Work with cross-functional teams and understand market needs.',
    salaryRange: '₹15-50 LPA',
    growthRate: '28%',
    requiredSkills: ['Product Strategy', 'Market Research', 'Communication', 'Analytics', 'Leadership'],
    stream: 'Any stream with strong analytical skills',
    topColleges: ['IIM Ahmedabad', 'IIT Bombay', 'FMS Delhi'],
    roadmap: [
      { phase: 'Class 12', duration: '1 year', description: 'Focus on analytical and communication skills.' },
      { phase: 'Degree', duration: '3-4 years', description: 'Engineering, Business, or related field.' },
      { phase: 'MBA/Experience', duration: '2-3 years', description: 'Get MBA or gain experience in product roles.' },
      { phase: 'Leadership', duration: '3-5 years', description: 'Develop leadership and strategic thinking skills.' }
    ]
  }
];

export default function Results() {
  const { careerSuggestions, responses, isCompleted } = useAssessmentStore();

  // Use mock data for now
  const suggestions = careerSuggestions.length > 0 ? careerSuggestions : mockCareerSuggestions;

  if (!isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Not Completed</h2>
          <p className="text-muted-foreground">Please complete the assessment first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Career <span className="text-gradient">Recommendations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your assessment, here are the top career paths that match your personality, interests, and goals.
          </p>
        </motion.div>

        {/* Career Suggestions */}
        <div className="space-y-8">
          {suggestions.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="career-card"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{career.title}</h2>
                    <p className="text-muted-foreground">{career.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium">Match Score: {95 - index * 5}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="salary-badge mb-2">
                      {career.salaryRange}
                    </div>
                    <p className="text-sm text-muted-foreground">Salary Range</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="growth-badge mb-2">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      {career.growthRate}
                    </div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span className="font-medium">{career.stream}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Required Stream</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="font-medium">High Demand</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Job Market</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Required Skills */}
                  <div>
                    <h3 className="font-semibold mb-3">Required Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Colleges */}
                  <div>
                    <h3 className="font-semibold mb-3">Top Colleges in India:</h3>
                    <div className="flex flex-wrap gap-2">
                      {career.topColleges.map((college, collegeIndex) => (
                        <span key={collegeIndex} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {college}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Roadmap */}
                  <div>
                    <h3 className="font-semibold mb-3">Career Roadmap:</h3>
                    <div className="space-y-3">
                      {career.roadmap.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {phaseIndex + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{phase.phase}</h4>
                              <span className="text-sm text-muted-foreground">({phase.duration})</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{phase.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-hero flex-1">
                      Get Detailed Roadmap
                    </button>
                    <button className="btn-secondary flex-1">
                      Chat with AI Mentor
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card-gradient p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Chat with our AI mentor to get personalized guidance and detailed roadmaps for your chosen career path.
            </p>
            <button className="btn-hero">
              Start AI Mentorship
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}