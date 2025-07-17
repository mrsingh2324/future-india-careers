import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-card border-t border-border">
      <div className="absolute inset-0 bg-gradient-glass opacity-50"></div>
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-gradient">CareerGuide</h3>
              <p className="text-muted-foreground">
                Empowering your career journey with AI-driven insights and personalized guidance.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:shadow-glow transition-all duration-300">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:shadow-glow transition-all duration-300">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:shadow-glow transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:shadow-glow transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
              <ul className="space-y-3">
                {['Assessment', 'Career Paths', 'Resources', 'Blog'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-foreground">Services</h4>
              <ul className="space-y-3">
                {['AI Counseling', 'Skill Assessment', 'Career Matching', 'Industry Insights'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-foreground">Get in Touch</h4>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Ready to transform your career?
                </p>
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Start Your Journey
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-2 text-muted-foreground"
            >
              <span>© 2024 CareerGuide. Made with</span>
              <Heart className="h-4 w-4 text-destructive animate-pulse" />
              <span>for your success</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="hover:shadow-glow transition-all duration-300"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;