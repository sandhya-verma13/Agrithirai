
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownRight, Search, TrendingUp, History, ChevronRight, BarChart, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock market data
const marketData = [
  {
    id: 1,
    crop: 'Rice',
    variety: 'Basmati',
    price: 2280,
    prevPrice: 2200,
    change: '↑ 3.6%',
    trend: 'up',
    market: 'Chennai',
    volume: '120 Tons'
  },
  {
    id: 2,
    crop: 'Wheat',
    variety: 'Premium',
    price: 2020,
    prevPrice: 2050,
    change: '↓ 1.5%',
    trend: 'down',
    market: 'Delhi',
    volume: '85 Tons'
  },
  {
    id: 3,
    crop: 'Cotton',
    variety: 'Long Staple',
    price: 6650,
    prevPrice: 6500,
    change: '↑ 2.3%',
    trend: 'up',
    market: 'Mumbai',
    volume: '45 Tons'
  },
  {
    id: 4,
    crop: 'Maize',
    variety: 'Yellow',
    price: 1880,
    prevPrice: 1850,
    change: '↑ 1.6%',
    trend: 'up',
    market: 'Bangalore',
    volume: '95 Tons'
  },
  {
    id: 5,
    crop: 'Sugarcane',
    variety: 'Standard',
    price: 290,
    prevPrice: 295,
    change: '↓ 1.7%',
    trend: 'down',
    market: 'Coimbatore',
    volume: '320 Tons'
  },
  {
    id: 6,
    crop: 'Groundnut',
    variety: 'Bold',
    price: 5300,
    prevPrice: 5200,
    change: '↑ 1.9%',
    trend: 'up',
    market: 'Hyderabad',
    volume: '65 Tons'
  },
  {
    id: 7,
    crop: 'Soybean',
    variety: 'Yellow',
    price: 3850,
    prevPrice: 3900,
    change: '↓ 1.3%',
    trend: 'down',
    market: 'Indore',
    volume: '75 Tons'
  },
  {
    id: 8,
    crop: 'Turmeric',
    variety: 'Finger',
    price: 7550,
    prevPrice: 7450,
    change: '↑ 1.3%',
    trend: 'up',
    market: 'Erode',
    volume: '25 Tons'
  },
  {
    id: 9,
    crop: 'Potato',
    variety: 'Table',
    price: 1420,
    prevPrice: 1350,
    change: '↑ 5.2%',
    trend: 'up',
    market: 'Kolkata',
    volume: '130 Tons'
  },
  {
    id: 10,
    crop: 'Onion',
    variety: 'Red',
    price: 1950,
    prevPrice: 2100,
    change: '↓ 7.1%',
    trend: 'down',
    market: 'Nashik',
    volume: '160 Tons'
  }
];

const LiveMarketPrices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMarketData, setFilteredMarketData] = useState(marketData);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second to simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    const filtered = marketData.filter(item => 
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMarketData(filtered);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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
            <h1 className="text-4xl font-display font-bold mb-4">Live Market Prices</h1>
            <p className="text-xl text-muted-foreground">
              Real-time agricultural commodity prices to help maximize your profits.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-sm font-medium border-primary/30 px-3 py-1">
                  <TrendingUp className="h-3.5 w-3.5 mr-1 text-primary" />
                  <span>Live Updates</span>
                </Badge>
                <Badge variant="outline" className="text-sm font-medium border-primary/30 px-3 py-1">
                  <span>{formatDate(currentTime)}</span>
                </Badge>
              </div>
              <div className="text-sm font-medium text-muted-foreground flex items-center animate-pulse">
                <span>Last updated: {formatTime(currentTime)}</span>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Crops</TabsTrigger>
                  <TabsTrigger value="cereals">Cereals</TabsTrigger>
                  <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
                  <TabsTrigger value="cash-crops">Cash Crops</TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-2">
                  <Select defaultValue="price-high">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort Options</SelectLabel>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="trend-up">Trending Up</SelectItem>
                        <SelectItem value="trend-down">Trending Down</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="glass-card mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by crop, variety, or market..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSearch} className="sm:w-auto">
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Crop</th>
                            <th className="text-left py-3 px-4 font-medium">Variety</th>
                            <th className="text-right py-3 px-4 font-medium">Price (₹/quintal)</th>
                            <th className="text-right py-3 px-4 font-medium">Change</th>
                            <th className="text-left py-3 px-4 font-medium">Market</th>
                            <th className="text-right py-3 px-4 font-medium">Volume</th>
                            <th className="text-right py-3 px-4 font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMarketData.map((item, index) => (
                            <motion.tr 
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-b hover:bg-muted/50 transition-colors"
                            >
                              <td className="py-3 px-4">{item.crop}</td>
                              <td className="py-3 px-4 text-muted-foreground">{item.variety}</td>
                              <td className="py-3 px-4 text-right font-medium">₹{item.price.toLocaleString()}</td>
                              <td className="py-3 px-4 text-right">
                                <span className={`inline-flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                  {item.trend === 'up' ? 
                                    <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                                    <ArrowDownRight className="h-4 w-4 mr-1" />
                                  }
                                  {item.change}
                                </span>
                              </td>
                              <td className="py-3 px-4">{item.market}</td>
                              <td className="py-3 px-4 text-right text-muted-foreground">{item.volume}</td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cereals" className="mt-0">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Select a specific category to view filtered results.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vegetables" className="mt-0">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Select a specific category to view filtered results.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cash-crops" className="mt-0">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Select a specific category to view filtered results.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Market Trends
                  </CardTitle>
                  <CardDescription>
                    Visual representation of price movements over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center h-44 flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive price charts will appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Price Predictions
                  </CardTitle>
                  <CardDescription>
                    AI-powered forecasts for future market movements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketData.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                        <div>
                          <p className="font-medium">{item.crop}</p>
                          <p className="text-sm text-muted-foreground">{item.variety}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.trend === 'up' ? '↗ Expected Rise' : '↘ Expected Fall'}
                          </p>
                          <p className="text-sm text-muted-foreground">Next 7 days</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    View All Predictions
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2 text-primary" />
                  Historical Price Analysis
                </CardTitle>
                <CardDescription>
                  Compare past and present prices to identify market trends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                      <Select defaultValue="rice">
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          {marketData.map((item) => (
                            <SelectItem key={item.id} value={item.crop.toLowerCase()}>
                              {item.crop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select defaultValue="1month">
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1week">1 Week</SelectItem>
                          <SelectItem value="1month">1 Month</SelectItem>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>Compare</Button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center h-44 flex items-center justify-center">
                    <p className="text-muted-foreground">Historical price comparison chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LiveMarketPrices;
