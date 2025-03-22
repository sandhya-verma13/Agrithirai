
import { useState, useEffect } from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun, Wind, CloudLightning, Cloudy, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

// Type for the weather API response
interface WeatherAPIResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
    }>;
  };
}

type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  forecast: Array<{
    day: string;
    temperature: number;
    condition: string;
  }>;
};

// Mapping condition codes to our custom icons
const getConditionIcon = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return 'sunny';
  if (lowerCondition.includes('cloud')) return 'cloudy';
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return 'rainy';
  if (lowerCondition.includes('snow')) return 'snowy';
  if (lowerCondition.includes('thunder') || lowerCondition.includes('lightning')) return 'lightning';
  if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) return 'cloudy';
  return 'sunny'; // default
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconType = getConditionIcon(condition);
  
  switch (iconType) {
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
    case 'lightning':
      return <CloudLightning className="h-10 w-10 text-yellow-400" />;
    default:
      return <Sun className="h-10 w-10 text-yellow-500" />;
  }
};

// Days of the week for forecast display
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeatherWidget = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to get the user's current location
  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get weather data based on coordinates
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError("Location access denied. Please enter a location manually.");
          setLoading(false);
          toast({
            title: "Location Error",
            description: "Could not access your location. Please enter a city name manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please enter a location manually.");
      setLoading(false);
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser. Please enter a city name manually.",
        variant: "destructive"
      });
    }
  };

  // Format the day of week from date string
  const formatDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return daysOfWeek[date.getDay()];
  };

  // Fetch weather data from API by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=e1cc0b0c3f4243a494f81513232511&q=${lat},${lon}&days=5&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data: WeatherAPIResponse = await response.json();
      processWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Using mock data instead.",
        variant: "destructive"
      });
      
      // Use mock data as fallback
      useMockWeatherData();
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data from API by city name
  const fetchWeatherByCity = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=e1cc0b0c3f4243a494f81513232511&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data: WeatherAPIResponse = await response.json();
      processWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Using mock data instead.",
        variant: "destructive"
      });
      
      // Use mock data as fallback with the entered location
      useMockWeatherData(city);
    } finally {
      setLoading(false);
    }
  };

  // Process and format the API response
  const processWeatherData = (data: WeatherAPIResponse) => {
    const forecast = data.forecast.forecastday.map(day => ({
      day: formatDayOfWeek(day.date),
      temperature: Math.round(day.day.avgtemp_c),
      condition: day.day.condition.text
    }));
    
    setWeatherData({
      location: data.location.name,
      temperature: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_kph),
      windDirection: data.current.wind_dir,
      forecast
    });
  };

  // Use mock data as fallback
  const useMockWeatherData = (customLocation?: string) => {
    const mockData: WeatherData = {
      location: customLocation || 'Chennai',
      temperature: 32,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12,
      windDirection: 'NE',
      forecast: [
        { day: 'Mon', temperature: 32, condition: 'Sunny' },
        { day: 'Tue', temperature: 33, condition: 'Cloudy' },
        { day: 'Wed', temperature: 30, condition: 'Rainy' },
        { day: 'Thu', temperature: 31, condition: 'Cloudy' },
        { day: 'Fri', temperature: 34, condition: 'Sunny' }
      ]
    };
    
    setWeatherData(mockData);
  };

  // Fetch weather for the specified location
  const fetchWeatherData = () => {
    if (location.trim()) {
      fetchWeatherByCity(location);
    } else {
      toast({
        title: "Please enter a location",
        description: "Enter a city name to get weather information",
        variant: "destructive"
      });
    }
  };

  // Get current location weather on initial load
  useEffect(() => {
    getUserLocation();
  }, []);

  // Handle enter key press in the input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={fetchWeatherData}
              disabled={loading}
              className="sm:w-auto"
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </Button>
            <Button 
              onClick={getUserLocation}
              disabled={loading}
              variant="outline"
              className="sm:w-auto"
            >
              {loading ? 'Loading...' : 'Current Location'}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {weatherData && (
              <motion.div
                key={weatherData.location}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div>
                    <h3 className="text-2xl font-semibold">{weatherData.location}</h3>
                    <p className="text-muted-foreground">Today</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{weatherData.temperature}°C</div>
                    <p className="text-muted-foreground">{weatherData.condition}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <WeatherIcon condition={weatherData.condition} />
                </motion.div>

                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-background/50 rounded-lg p-3">
                    <p className="text-muted-foreground text-sm">Humidity</p>
                    <p className="text-xl font-medium">{weatherData.humidity}%</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3">
                    <p className="text-muted-foreground text-sm">Wind Speed</p>
                    <div className="flex items-center">
                      <Wind className="h-4 w-4 mr-1" />
                      <p className="text-xl font-medium">{weatherData.windSpeed} km/h {weatherData.windDirection}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h4 className="font-medium mb-3">5-Day Forecast</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {weatherData.forecast.map((day, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      >
                        <p className="text-sm font-medium">{day.day}</p>
                        <WeatherIcon condition={day.condition} />
                        <p className="text-sm">{day.temperature}°</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && !weatherData && (
            <div className="text-center text-destructive p-4">
              <p>{error}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
