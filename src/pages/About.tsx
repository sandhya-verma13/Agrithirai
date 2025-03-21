
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl px-4 py-16 md:py-24"
      >
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">About AgriThirai</h1>
            <p className="text-xl text-muted-foreground">Transforming agriculture through intelligent technology</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              AgriThirai is a comprehensive platform designed to empower farmers with cutting-edge AI technology, 
              local insights, and timely information to optimize farming practices. Our mission is to bridge the 
              gap between traditional agricultural wisdom and modern technological advancements.
            </p>

            <h2>Our Vision</h2>
            <p>
              We envision a world where farmers can make informed decisions based on data-driven insights, 
              reducing risk and increasing productivity while maintaining sustainable farming practices. 
              AgriThirai aims to be the trusted companion for farmers across India, providing localized, 
              relevant, and actionable information in their native languages.
            </p>

            <h2>What We Offer</h2>
            <ul>
              <li>
                <strong>AI-Powered Farming Assistant:</strong> Get personalized recommendations for crop 
                management, pest control, and optimal harvesting times.
              </li>
              <li>
                <strong>Weather Forecasts:</strong> Access hyperlocal weather predictions to plan your 
                farming activities.
              </li>
              <li>
                <strong>Government Schemes:</strong> Stay updated on the latest agricultural schemes and 
                subsidies you might be eligible for.
              </li>
              <li>
                <strong>Market Prices:</strong> Monitor live market prices to sell your produce at the 
                best rates.
              </li>
              <li>
                <strong>Crop Management:</strong> Track your crops from planting to harvest with our 
                intelligent monitoring system.
              </li>
              <li>
                <strong>Equipment Information:</strong> Discover modern farming equipment that can 
                increase your efficiency.
              </li>
            </ul>

            <h2>Our Approach</h2>
            <p>
              AgriThirai combines the power of artificial intelligence with localized agricultural knowledge. 
              We understand that farming practices vary widely across different regions, soil types, and climate zones. 
              Our platform tailors recommendations to your specific context, ensuring that the advice you receive is 
              relevant and practical for your farm.
            </p>

            <p>
              We believe in the power of community and knowledge sharing. AgriThirai facilitates connections 
              between farmers, agricultural experts, and technology specialists to create a supportive ecosystem 
              that benefits everyone involved in agriculture.
            </p>

            <h2>Join Us</h2>
            <p>
              Whether you're a small-scale farmer or managing large agricultural operations, AgriThirai is 
              designed to support your journey toward more efficient and sustainable farming. Join thousands 
              of farmers who are already using our platform to transform their agricultural practices.
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default About;
