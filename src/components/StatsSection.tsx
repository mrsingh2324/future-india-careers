import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const stats = [
  { 
    value: 70, 
    label: 'Students Confused About Career Choice', 
    suffix: '%',
    color: 'text-primary'
  },
  { 
    value: 85, 
    label: 'Make Wrong Career Decisions', 
    suffix: '%',
    color: 'text-destructive'
  },
  { 
    value: 60, 
    label: 'Change Career Within 5 Years', 
    suffix: '%',
    color: 'text-accent'
  },
  { 
    value: 95, 
    label: 'Success Rate with Proper Guidance', 
    suffix: '%',
    color: 'text-secondary'
  }
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-gradient">Reality</span> of Career Confusion
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Statistics reveal the urgent need for proper career guidance among Indian students
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="card-elevated p-8 h-full">
                <div className={`text-5xl md:text-6xl font-bold mb-4 ${stat.color}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {stat.label}
                </p>
              </div>
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
          <div className="card-gradient p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Don't be part of the statistics. Let AI guide you to the right career path.
            </h3>
            <p className="text-muted-foreground mb-6">
              Our AI-powered platform has helped thousands of students make informed career decisions with 95% success rate.
            </p>
            <Link to="/assessment" className="btn-secondary">
              Take Free Assessment
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}