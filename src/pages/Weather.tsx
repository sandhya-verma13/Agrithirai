
import Layout from '@/components/Layout';
import WeatherWidget from '@/components/WeatherWidget';
import { motion } from 'framer-motion';

const Weather = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl font-display font-bold mb-4">Weather Forecast</h1>
            <p className="text-xl text-muted-foreground">
              Get real-time weather data and forecasts tailored for your agricultural needs.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <WeatherWidget />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-display font-semibold mb-4">
              How Weather Affects Your Crops
            </h2>
            <p className="text-muted-foreground mb-8">
              Understanding weather patterns is crucial for successful farming. Our AI-powered forecasts help you make informed decisions about planting, irrigation, and harvesting.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-background rounded-lg p-5 shadow-sm border">
                <h3 className="font-semibold mb-2">Temperature</h3>
                <p className="text-sm text-muted-foreground">
                  Affects growth rate, germination, and flowering. Each crop has optimal temperature ranges.
                </p>
              </div>
              <div className="bg-background rounded-lg p-5 shadow-sm border">
                <h3 className="font-semibold mb-2">Rainfall</h3>
                <p className="text-sm text-muted-foreground">
                  Critical for irrigation planning and determining soil moisture levels for your crops.
                </p>
              </div>
              <div className="bg-background rounded-lg p-5 shadow-sm border">
                <h3 className="font-semibold mb-2">Wind</h3>
                <p className="text-sm text-muted-foreground">
                  Can affect pollination, cause physical damage, and increase water evaporation rates.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Weather;
