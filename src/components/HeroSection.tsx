import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Target, Sparkles, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { icon: Users, value: '50K+', label: 'Students Guided' },
  { icon: Target, value: '95%', label: 'Success Rate' },
  { icon: Star, value: '4.9', label: 'Rating' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="hero-title">
                Discover Your
                <br />
                <span className="text-gradient">Perfect Career</span>
                <br />
                Path
              </h1>
              
              <p className="hero-subtitle">
                AI-powered career guidance specifically designed for Indian 12th-grade students. 
                Get personalized recommendations, detailed roadmaps, and expert mentorship to 
                make the right career choice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/assessment" className="btn-hero group">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="btn-outline">
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-8 pt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Main Visual Container */}
            <div className="relative w-full h-[500px] rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-20 left-20 w-32 h-32 bg-primary/30 rounded-full blur-xl"
                  animate={{ 
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/30 rounded-full blur-xl"
                  animate={{ 
                    y: [0, 20, 0],
                    scale: [1, 0.9, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-full blur-xl"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Central Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-6xl shadow-2xl">
                    🎯
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-16 right-16"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary/80 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  🚀
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-16 left-16"
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent/80 rounded-full flex items-center justify-center text-xl shadow-lg">
                  💡
                </div>
              </motion.div>
            </div>
            
            {/* Floating Career Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-4 -left-4 glass-card p-4 floating-element"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <div className="text-primary font-semibold">Engineering</div>
              </div>
              <div className="text-sm text-muted-foreground">₹8-25 LPA</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-4 -right-4 glass-card p-4 floating-element"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-secondary" />
                <div className="text-secondary font-semibold">Medical</div>
              </div>
              <div className="text-sm text-muted-foreground">₹10-50 LPA</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute top-1/2 -right-8 glass-card p-4 floating-element"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                <div className="text-accent font-semibold">Business</div>
              </div>
              <div className="text-sm text-muted-foreground">₹6-30 LPA</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}