import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Brain, MapPin, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Take Assessment',
    description: 'Complete our comprehensive 10-question assessment covering personality, interests, and career scenarios.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes your responses using proven psychological models and career frameworks.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    icon: MapPin,
    title: 'Get Roadmap',
    description: 'Receive personalized career paths with detailed roadmaps, college recommendations, and skill requirements.',
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    icon: MessageCircle,
    title: 'AI Mentorship',
    description: 'Chat with our AI mentor for personalized guidance and answers to your career-related questions.',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform guides you through a simple 4-step process to discover your ideal career path
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-elevated text-center h-full">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${step.bgColor} rounded-full mb-6`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/assessment" className="btn-hero">
            Start Your Journey Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}