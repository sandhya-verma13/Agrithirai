
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Tractor, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock equipment data
const equipmentData = [
  {
    id: 1,
    name: 'Advanced Tractor',
    description: 'Modern tractor with GPS guidance and precision capabilities.',
    price: '₹1,200,000 - ₹1,800,000',
    type: 'tractor',
    subsidy: 'Eligible for 25% subsidy under Farm Mechanization Scheme',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Precision Seed Drill',
    description: 'Ensures accurate seed placement for optimal germination and crop stand.',
    price: '₹250,000 - ₹450,000',
    type: 'seeding',
    subsidy: 'Eligible for 35% subsidy under Precision Farming Initiative',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Drone Sprayer',
    description: 'Agricultural drone for precise pesticide and fertilizer application.',
    price: '₹300,000 - ₹600,000',
    type: 'spraying',
    subsidy: 'Eligible for 40% subsidy under Digital Agriculture Scheme',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Smart Irrigation System',
    description: 'IoT-based system for water management and conservation.',
    price: '₹80,000 - ₹150,000',
    type: 'irrigation',
    subsidy: 'Eligible for 50% subsidy under Pradhan Mantri Krishi Sinchayee Yojana',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Combine Harvester',
    description: 'Efficient crop harvesting with minimal grain loss.',
    price: '₹1,800,000 - ₹2,500,000',
    type: 'harvesting',
    subsidy: 'Eligible for 30% subsidy under Sub-Mission on Agricultural Mechanization',
    image: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Soil Sensors',
    description: 'Real-time soil analysis for precision nutrient management.',
    price: '₹25,000 - ₹45,000',
    type: 'monitoring',
    subsidy: 'Eligible for 45% subsidy under Soil Health Management',
    image: '/placeholder.svg'
  }
];

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData);
  const [farmDetails, setFarmDetails] = useState({
    cropType: '',
    farmSize: '',
    currentEquipment: ''
  });

  const handleSearch = () => {
    const filtered = equipmentData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEquipment(filtered);
  };

  const handleRecommendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an AI service to analyze farm details
    // and recommend suitable equipment
    
    // For demo, we'll just filter based on some simple logic
    let recommended;
    if (farmDetails.cropType.toLowerCase().includes('rice') || farmDetails.cropType.toLowerCase().includes('paddy')) {
      recommended = equipmentData.filter(e => e.type === 'irrigation' || e.type === 'harvesting');
    } else if (Number(farmDetails.farmSize) < 5) {
      recommended = equipmentData.filter(e => e.type === 'monitoring' || e.type === 'spraying');
    } else {
      recommended = equipmentData.filter(e => e.type === 'tractor' || e.type === 'seeding');
    }
    
    setFilteredEquipment(recommended);
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
            <h1 className="text-4xl font-display font-bold mb-4">Agricultural Equipment</h1>
            <p className="text-xl text-muted-foreground">
              Explore modern farming equipment and technologies with AI-powered recommendations.
            </p>
          </motion.div>

          <Tabs defaultValue="browse" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Equipment</TabsTrigger>
              <TabsTrigger value="recommend">AI Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-8">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search equipment..."
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((equipment, index) => (
                  <motion.div
                    key={equipment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={equipment.image} 
                          alt={equipment.name} 
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                        <Badge className="absolute top-2 right-2">{equipment.type}</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle>{equipment.name}</CardTitle>
                        <CardDescription>{equipment.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="font-medium text-lg mb-2">{equipment.price}</p>
                        <div className="flex items-center text-sm text-primary">
                          <Shield className="h-4 w-4 mr-1" />
                          <p>{equipment.subsidy}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommend">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Farm Details</CardTitle>
                    <CardDescription>
                      Provide information about your farm for AI-powered equipment recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRecommendSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Main Crop Type</label>
                        <Input 
                          placeholder="e.g., Rice, Wheat, Vegetables" 
                          value={farmDetails.cropType}
                          onChange={(e) => setFarmDetails({...farmDetails, cropType: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Farm Size (in acres)</label>
                        <Input 
                          type="number" 
                          placeholder="e.g., 10" 
                          value={farmDetails.farmSize}
                          onChange={(e) => setFarmDetails({...farmDetails, farmSize: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Current Equipment</label>
                        <Input 
                          placeholder="e.g., Basic tractor, manual spraying" 
                          value={farmDetails.currentEquipment}
                          onChange={(e) => setFarmDetails({...farmDetails, currentEquipment: e.target.value})}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Get Recommendations
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Recommended Equipment</CardTitle>
                      <CardDescription>
                        Based on your farm details, our AI recommends the following equipment.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {filteredEquipment.length === equipmentData.length ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Tractor className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                          <p>Submit your farm details to get personalized equipment recommendations.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredEquipment.map((equipment) => (
                            <div key={equipment.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                              <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                                <img src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between">
                                  <h3 className="font-semibold">{equipment.name}</h3>
                                  <Badge>{equipment.type}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{equipment.description}</p>
                                <div className="mt-2 flex justify-between items-center">
                                  <span className="text-sm font-medium">{equipment.price}</span>
                                  <Button variant="ghost" size="sm" className="text-primary text-sm hover:bg-primary/5 p-1 h-auto">
                                    <span>Details</span>
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits of Modern Equipment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-2">
                          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Increased Productivity</h4>
                            <p className="text-sm text-muted-foreground">Complete tasks faster with less manual labor.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Shield className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Resource Optimization</h4>
                            <p className="text-sm text-muted-foreground">Reduce waste of seeds, water, and fertilizers.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Better Crop Quality</h4>
                            <p className="text-sm text-muted-foreground">Precision equipment improves overall yield quality.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Shield className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Government Subsidies</h4>
                            <p className="text-sm text-muted-foreground">Many modern equipments are eligible for subsidies.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Equipment;
