
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  // Text animation variables for the welcome text
  const welcomeText = "Welcome to the Screen of Future";
  
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 -left-32 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute -bottom-40 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-30" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2 max-w-3xl"
          >
            <div className="overflow-hidden">
              {welcomeText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.03,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  style={{
                    color: index % 3 === 0 ? 'hsl(var(--primary))' : 'currentColor'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-2xl mx-auto italic">
              "AI doesn't replace the farmer- it amplifies their potential"
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/ai-assistant">
              <Button size="lg" className="bg-gradient-to-r from-primary to-agri-green-600 hover:from-agri-green-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group">
                {t('try-ai-assistant')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/schemes">
              <Button variant="outline" size="lg" className="border-primary hover:bg-primary/5">
                {t('explore-schemes')}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full max-w-5xl mt-16 relative"
          >
            <div className="aspect-video rounded-xl overflow-hidden border shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-agri-green-400/20 to-agri-green-700/40 flex items-center justify-center">
                <img 
                  src="/farming-assistant.jpg" 
                  alt="AI Farming Assistant" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                    target.parentElement!.innerHTML = '<span class="font-display text-xl text-primary font-medium">Intelligent farming solutions for modern agriculture</span>';
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <span className="font-bold text-accent-foreground">New</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
