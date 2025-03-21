
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Cloud, FileText, Tractor, Leaf, Bot, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language, t } = useLanguage();

  // Feature list for the home page
  const features = [
    {
      icon: Cloud,
      title: t('weather-forecasts'),
      description: t('weather-description'),
      path: '/weather'
    },
    {
      icon: FileText,
      title: t('government-schemes'),
      description: t('schemes-description'),
      path: '/schemes'
    },
    {
      icon: Tractor,
      title: t('equipment'),
      description: t('equipment-description'),
      path: '/equipment'
    },
    {
      icon: Leaf,
      title: t('crop-management'),
      description: t('crop-description'),
      path: '/crops'
    },
    {
      icon: Bot,
      title: t('ai-assistant'),
      description: t('assistant-description'),
      path: '/ai-assistant'
    },
    {
      icon: BarChart3,
      title: t('market-prices'),
      description: t('prices-description'),
      path: '/market-prices'
    }
  ];

  return (
    <Layout>
      {/* Background image for the home page */}
      <div className="home-background"></div>
      <Hero />

      <section className="py-20 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              {t('ai-powered-features')}
            </h2>
            <p className="text-muted-foreground">
              {t('agrithirai-leverages')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card h-full hover:bg-background/40 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{feature.description}</p>
                    <Link to={feature.path} className="mt-auto inline-flex items-center text-primary hover:underline">
                      <span>{t('learn-more')}</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-agri-green-400/20 to-agri-green-700/40 flex items-center justify-center">
                <img 
                  src="/farming-assistant.jpg" 
                  alt="AI Farming Assistant"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                    target.parentElement!.innerHTML = '<span class="font-display text-xl">AI Farming Assistant</span>';
                  }}
                />
              </div>
            </motion.div>
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold">
                {t('transforming-agriculture')}
              </h2>
              <p className="text-muted-foreground">
                {t('dedicated-text')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
                  <span>{t('ai-crop')}</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
                  <span>{t('market-analysis')}</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
                  <span>{t('weather-forecast')}</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
                  <span>{t('personalized-scheme')}</span>
                </li>
              </ul>
              <div>
                <Link to="/ai-assistant">
                  <Button size="lg" className="mt-4">
                    {t('talk-to-ai')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary/5">
        <div className="container px-4 md:px-6 text-center">
          <motion.div 
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold">
              {t('join-thousands')}
            </h2>
            <p className="text-muted-foreground">
              {t('ready-transform')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/login">
                <Button size="lg" variant="default">
                  {t('create-account')}
                </Button>
              </Link>
              <Link to="/ai-assistant">
                <Button size="lg" variant="outline">
                  {t('try-demo')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
