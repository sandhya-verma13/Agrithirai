
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { User, Leaf, CloudRain, Calendar, Tractor, BarChart3, GanttChart, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import WeatherWidget from '@/components/WeatherWidget';

// Mock user data
const userData = {
  name: 'Raj Kumar',
  location: 'Chennai, Tamil Nadu',
  farmSize: '15 acres',
  email: 'rajkumar@example.com',
  phone: '+91 9876543210',
  landDetails: [
    { id: 1, location: 'North Field', area: '8 acres', soilType: 'Clay Loam', waterSource: 'Tube Well' },
    { id: 2, location: 'South Field', area: '7 acres', soilType: 'Sandy Loam', waterSource: 'Canal Irrigation' }
  ],
  crops: [
    { 
      id: 1, 
      name: 'Rice', 
      variety: 'Basmati', 
      plantedDate: '2023-06-15', 
      harvestDate: '2023-10-15',
      area: '8 acres',
      stage: 'Vegetative',
      progress: 45,
      tasks: [
        { id: 1, name: 'Fertilizer Application', dueDate: '2023-08-05', status: 'completed' },
        { id: 2, name: 'Pest Control', dueDate: '2023-08-15', status: 'pending' },
        { id: 3, name: 'Weeding', dueDate: '2023-08-10', status: 'completed' }
      ]
    },
    { 
      id: 2, 
      name: 'Cotton', 
      variety: 'Long Staple', 
      plantedDate: '2023-05-10', 
      harvestDate: '2023-11-10',
      area: '7 acres',
      stage: 'Flowering',
      progress: 60,
      tasks: [
        { id: 1, name: 'Irrigation', dueDate: '2023-08-03', status: 'completed' },
        { id: 2, name: 'Nutrient Spray', dueDate: '2023-08-12', status: 'pending' },
        { id: 3, name: 'Monitoring for Pests', dueDate: '2023-08-18', status: 'pending' }
      ]
    }
  ]
};

const Dashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState(userData.crops[0]);

  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={userData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-display font-bold mb-1">{userData.name}'s Dashboard</h1>
                  <p className="text-muted-foreground flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {userData.location} • {userData.farmSize}
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-agri-green-600 hover:from-agri-green-600 hover:to-primary transition-all duration-300">
                Edit Profile
              </Button>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 sm:grid-cols-5 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="crops">Crops</TabsTrigger>
                <TabsTrigger value="weather">Weather</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userData.crops.length}</div>
                      <p className="text-xs text-muted-foreground mt-1">Across {userData.landDetails.length} fields</p>
                      <div className="mt-4 space-y-2">
                        {userData.crops.map(crop => (
                          <div key={crop.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Leaf className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm">{crop.name}</span>
                            </div>
                            <Badge variant="outline">{crop.area}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Weather Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">32°C</div>
                          <p className="text-xs text-muted-foreground mt-1">Chennai, partly cloudy</p>
                        </div>
                        <CloudRain className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                        <div>
                          <p className="text-xs font-medium">Mon</p>
                          <CloudRain className="h-5 w-5 mx-auto my-1 text-blue-400" />
                          <p className="text-xs">31°</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Tue</p>
                          <CloudRain className="h-5 w-5 mx-auto my-1 text-blue-400" />
                          <p className="text-xs">30°</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Wed</p>
                          <CloudRain className="h-5 w-5 mx-auto my-1 text-blue-400" />
                          <p className="text-xs">32°</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Thu</p>
                          <CloudRain className="h-5 w-5 mx-auto my-1 text-blue-400" />
                          <p className="text-xs">33°</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground mt-1">Tasks due this week</p>
                      <div className="mt-4 space-y-3">
                        {userData.crops.flatMap(crop => 
                          crop.tasks.filter(task => task.status === 'pending')
                        ).slice(0, 3).map(task => (
                          <div key={task.id} className="flex justify-between items-center">
                            <span className="text-sm">{task.name}</span>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Crop Status</CardTitle>
                      <CardDescription>
                        Monitor the progress of your active crops
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {userData.crops.map(crop => (
                          <div key={crop.id} className="space-y-2">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{crop.name} ({crop.variety})</h3>
                                <p className="text-sm text-muted-foreground">{crop.area} • Planted: {new Date(crop.plantedDate).toLocaleDateString()}</p>
                              </div>
                              <Badge>{crop.stage}</Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Growth Progress</span>
                                <span>{crop.progress}%</span>
                              </div>
                              <Progress value={crop.progress} className="h-2" />
                            </div>
                            <div className="text-sm flex justify-between">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Planted: {new Date(crop.plantedDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Harvest: {new Date(crop.harvestDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Land Details</CardTitle>
                      <CardDescription>
                        Information about your registered land
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {userData.landDetails.map(land => (
                          <div key={land.id} className="border rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <h3 className="font-medium">{land.location}</h3>
                              <Badge variant="outline">{land.area}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Soil Type:</span>
                                <p>{land.soilType}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Water Source:</span>
                                <p>{land.waterSource}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Add New Land
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>
                      Personalized suggestions based on your farm's data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start gap-3">
                          <Tractor className="h-9 w-9 bg-primary/10 text-primary p-1.5 rounded-md" />
                          <div>
                            <h3 className="font-medium">Equipment Suggestion</h3>
                            <p className="text-sm text-muted-foreground mt-1">Precision seeders can improve your crop density by 15%</p>
                            <Button variant="link" className="text-primary p-0 h-auto mt-1 text-sm">
                              Learn More
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start gap-3">
                          <CloudRain className="h-9 w-9 bg-primary/10 text-primary p-1.5 rounded-md" />
                          <div>
                            <h3 className="font-medium">Irrigation Alert</h3>
                            <p className="text-sm text-muted-foreground mt-1">Reduce irrigation for your cotton crop this week due to rainfall forecast</p>
                            <Button variant="link" className="text-primary p-0 h-auto mt-1 text-sm">
                              Weather Details
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start gap-3">
                          <BarChart3 className="h-9 w-9 bg-primary/10 text-primary p-1.5 rounded-md" />
                          <div>
                            <h3 className="font-medium">Market Insight</h3>
                            <p className="text-sm text-muted-foreground mt-1">Rice prices expected to rise by 6% in the next month</p>
                            <Button variant="link" className="text-primary p-0 h-auto mt-1 text-sm">
                              View Market Trends
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="crops" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Crops</CardTitle>
                      <CardDescription>
                        Select a crop to view detailed information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.crops.map(crop => (
                          <Button
                            key={crop.id}
                            variant={selectedCrop.id === crop.id ? 'default' : 'outline'}
                            className="w-full justify-start"
                            onClick={() => setSelectedCrop(crop)}
                          >
                            <Leaf className="h-4 w-4 mr-2" />
                            {crop.name} ({crop.variety})
                          </Button>
                        ))}
                        <Button variant="outline" className="w-full">
                          Add New Crop
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{selectedCrop.name} ({selectedCrop.variety})</CardTitle>
                            <CardDescription>{selectedCrop.area} • {selectedCrop.stage} Stage</CardDescription>
                          </div>
                          <Badge className="bg-primary/10 text-primary">{selectedCrop.progress}% Complete</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Growth Timeline</span>
                              <span>
                                <Clock className="h-4 w-4 inline-block mr-1" />
                                {Math.floor((new Date().getTime() - new Date(selectedCrop.plantedDate).getTime()) / (1000 * 60 * 60 * 24))} days since planting
                              </span>
                            </div>
                            <Progress value={selectedCrop.progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Planted: {new Date(selectedCrop.plantedDate).toLocaleDateString()}</span>
                              <span>Harvesting: {new Date(selectedCrop.harvestDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <h3 className="text-sm font-medium">Current Stage</h3>
                              <div className="flex items-center text-primary">
                                <GanttChart className="h-4 w-4 mr-1" />
                                {selectedCrop.stage}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-sm font-medium">Next Stage</h3>
                              <div className="flex items-center">
                                <GanttChart className="h-4 w-4 mr-1" />
                                {selectedCrop.stage === 'Vegetative' ? 'Reproductive' : selectedCrop.stage === 'Flowering' ? 'Ripening' : 'Harvesting'}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-sm font-medium">Upcoming Tasks</h3>
                            {selectedCrop.tasks.filter(task => task.status === 'pending').map(task => (
                              <div key={task.id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                                <span>{task.name}</span>
                                <div className="flex items-center text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            ))}
                            {selectedCrop.tasks.filter(task => task.status === 'pending').length === 0 && (
                              <p className="text-sm text-muted-foreground">No pending tasks</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>AI Health Assessment</CardTitle>
                        <CardDescription>Analysis based on weather and crop stage</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-10 w-10 text-yellow-500 bg-yellow-100 p-2 rounded-full flex-shrink-0" />
                            <div>
                              <h3 className="font-medium">Pest Risk Alert</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Medium risk of {selectedCrop.name === 'Rice' ? 'stem borer' : 'bollworm'} infestation due to recent weather conditions. 
                                Consider preventative spraying within the next 5 days.
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="font-medium mb-2">Other Recommendations</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2 text-sm">
                                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">✓</div>
                                <span>Apply nitrogen-rich fertilizer to support {selectedCrop.stage.toLowerCase()} stage growth</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm">
                                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">✓</div>
                                <span>Maintain optimal soil moisture levels due to higher than average temperatures</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm">
                                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">✓</div>
                                <span>Regular monitoring for {selectedCrop.name === 'Rice' ? 'leaf folder' : 'whitefly'} is recommended</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="weather">
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weather Information</CardTitle>
                      <CardDescription>
                        Location-specific weather data for your farm
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="max-w-3xl mx-auto">
                        <WeatherWidget />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Weather Impact Analysis</CardTitle>
                      <CardDescription>
                        How current and forecasted weather affects your crops
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {userData.crops.map(crop => (
                          <div key={crop.id} className="border rounded-lg p-4">
                            <h3 className="font-medium mb-2">{crop.name} ({crop.variety})</h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <CloudRain className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                  <p className="font-medium">Rainfall Impact</p>
                                  <p className="text-sm text-muted-foreground">Expected rainfall will benefit the crop in its current {crop.stage.toLowerCase()} stage. No irrigation needed for the next 5 days.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Tractor className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium">Field Operations</p>
                                  <p className="text-sm text-muted-foreground">Delay any spraying operations until after the rain. Soil will be too wet for machinery for 2 days after rainfall.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tasks">
                <Card>
                  <CardHeader>
                    <CardTitle>Task Management</CardTitle>
                    <CardDescription>
                      Plan and track your farming activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-20">
                      <p className="text-muted-foreground">Task management features will be available soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Reports</CardTitle>
                    <CardDescription>
                      Analyze farm performance and generate reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-20">
                      <p className="text-muted-foreground">Reporting features will be available soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
