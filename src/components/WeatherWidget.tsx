
import { useState, useEffect } from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Mock weather data
const mockWeatherData = {
  location: 'Chennai',
  temperature: 32,
  condition: 'Sunny',
  humidity: 65,
  windSpeed: 12,
  forecast: [
    { day: 'Mon', temperature: 32, condition: 'Sunny' },
    { day: 'Tue', temperature: 33, condition: 'Cloudy' },
    { day: 'Wed', temperature: 30, condition: 'Rainy' },
    { day: 'Thu', temperature: 31, condition: 'Cloudy' },
    { day: 'Fri', temperature: 34, condition: 'Sunny' }
  ]
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-10 w-10 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-10 w-10 text-gray-400" />;
    case 'rainy':
      return <CloudRain className="h-10 w-10 text-blue-400" />;
    case 'drizzle':
      return <CloudDrizzle className="h-10 w-10 text-blue-300" />;
    case 'snowy':
      return <CloudSnow className="h-10 w-10 text-blue-100" />;
    default:
      return <Sun className="h-10 w-10 text-yellow-500" />;
  }
};

type WeatherData = typeof mockWeatherData;

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate fetching weather data
  const fetchWeatherData = () => {
    setLoading(true);
    // In a real app, you would fetch from a weather API here
    setTimeout(() => {
      setWeatherData({
        ...mockWeatherData,
        location: location || mockWeatherData.location
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={fetchWeatherData}
              disabled={loading}
              className="sm:w-auto"
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </Button>
          </div>

          {weatherData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{weatherData.location}</h3>
                  <p className="text-muted-foreground">Today</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{weatherData.temperature}°C</div>
                  <p className="text-muted-foreground">{weatherData.condition}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <WeatherIcon condition={weatherData.condition} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-muted-foreground text-sm">Humidity</p>
                  <p className="text-xl font-medium">{weatherData.humidity}%</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-muted-foreground text-sm">Wind Speed</p>
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-1" />
                    <p className="text-xl font-medium">{weatherData.windSpeed} km/h</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">5-Day Forecast</h4>
                <div className="grid grid-cols-5 gap-2">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <p className="text-sm font-medium">{day.day}</p>
                      <WeatherIcon condition={day.condition} />
                      <p className="text-sm">{day.temperature}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
