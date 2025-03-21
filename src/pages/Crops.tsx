
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Leaf, TrendingUp, Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock crops data
const cropsData = [
  {
    id: 1,
    name: 'Rice',
    scientificName: 'Oryza sativa',
    currentPrice: '₹2,200/quintal',
    predictedPrice: '₹2,350/quintal (↑ 6.8%)',
    growingPeriod: '4-5 months',
    bestSeason: 'Kharif (Monsoon)',
    soilType: 'Clay or clay loam soils',
    waterRequirement: 'High',
    fertilizers: 'NPK, Urea',
    pestManagement: 'Regular monitoring for stem borers, leaf folders',
    stages: [
      { name: 'Land Preparation', duration: '15-20 days', details: 'Plowing, leveling, and flooding the field' },
      { name: 'Sowing/Transplanting', duration: '7-10 days', details: 'Transplanting seedlings or direct seeding' },
      { name: 'Vegetative', duration: '50-60 days', details: 'Tillering and stem elongation' },
      { name: 'Reproductive', duration: '30-35 days', details: 'Panicle initiation, booting, heading, flowering' },
      { name: 'Ripening', duration: '30-40 days', details: 'Milk, dough, mature grain stages' }
    ],
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    currentPrice: '₹2,050/quintal',
    predictedPrice: '₹2,180/quintal (↑ 6.3%)',
    growingPeriod: '4-6 months',
    bestSeason: 'Rabi (Winter)',
    soilType: 'Well-drained loam or clay loam',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Urea, DAP',
    pestManagement: 'Monitor for aphids, weevils, and rust diseases',
    stages: [
      { name: 'Land Preparation', duration: '10-15 days', details: 'Plowing, harrowing, and leveling the field' },
      { name: 'Sowing', duration: '7-10 days', details: 'Direct seeding using seed drill' },
      { name: 'Vegetative', duration: '45-55 days', details: 'Germination, tillering, and stem elongation' },
      { name: 'Reproductive', duration: '30-35 days', details: 'Booting, heading, flowering' },
      { name: 'Ripening', duration: '30-40 days', details: 'Milk, dough, mature grain stages' }
    ],
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Maize',
    scientificName: 'Zea mays',
    currentPrice: '₹1,850/quintal',
    predictedPrice: '₹1,920/quintal (↑ 3.8%)',
    growingPeriod: '3-4 months',
    bestSeason: 'Kharif & Rabi',
    soilType: 'Well-drained sandy loam to clay loam',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Urea, Zinc',
    pestManagement: 'Monitor for stem borers, armyworms, and leaf blight',
    stages: [
      { name: 'Land Preparation', duration: '10-15 days', details: 'Plowing, harrowing, and ridge formation' },
      { name: 'Sowing', duration: '5-7 days', details: 'Direct seeding on ridges or flat land' },
      { name: 'Vegetative', duration: '40-50 days', details: 'Germination, leaf development, and stem elongation' },
      { name: 'Reproductive', duration: '20-25 days', details: 'Tasseling, silking, and pollination' },
      { name: 'Ripening', duration: '25-35 days', details: 'Blister, milk, dough, and mature grain stages' }
    ],
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    currentPrice: '₹6,500/quintal',
    predictedPrice: '₹6,800/quintal (↑ 4.6%)',
    growingPeriod: '5-6 months',
    bestSeason: 'Kharif',
    soilType: 'Well-drained black cotton soil or alluvial soil',
    waterRequirement: 'Medium to High',
    fertilizers: 'NPK, Urea, DAP, Potash',
    pestManagement: 'Regular monitoring for bollworms, aphids, and whiteflies',
    stages: [
      { name: 'Land Preparation', duration: '15-20 days', details: 'Deep plowing, harrowing, and bed formation' },
      { name: 'Sowing', duration: '7-10 days', details: 'Direct seeding on beds or ridges' },
      { name: 'Vegetative', duration: '40-60 days', details: 'Germination, seedling establishment, and branching' },
      { name: 'Reproductive', duration: '40-60 days', details: 'Square formation, flowering, and boll development' },
      { name: 'Ripening', duration: '30-40 days', details: 'Boll maturation and opening' }
    ],
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    currentPrice: '₹290/quintal',
    predictedPrice: '₹310/quintal (↑ 6.9%)',
    growingPeriod: '10-12 months',
    bestSeason: 'Spring & Autumn',
    soilType: 'Deep, well-drained loamy soil',
    waterRequirement: 'High',
    fertilizers: 'NPK, Urea, DAP, Potash',
    pestManagement: 'Monitor for borers, pyrilla, and red rot disease',
    stages: [
      { name: 'Land Preparation', duration: '15-20 days', details: 'Deep plowing, harrowing, and furrow formation' },
      { name: 'Planting', duration: '10-15 days', details: 'Planting of setts in furrows' },
      { name: 'Germination', duration: '30-40 days', details: 'Sprouting and initial growth' },
      { name: 'Tillering', duration: '60-90 days', details: 'Formation of tillers and establishment' },
      { name: 'Grand Growth', duration: '120-150 days', details: 'Rapid stalk elongation and growth' },
      { name: 'Maturation', duration: '60-90 days', details: 'Sugar accumulation and ripening' }
    ],
    image: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Groundnut',
    scientificName: 'Arachis hypogaea',
    currentPrice: '₹5,200/quintal',
    predictedPrice: '₹5,400/quintal (↑ 3.8%)',
    growingPeriod: '3-5 months',
    bestSeason: 'Kharif & Rabi',
    soilType: 'Well-drained sandy loam or light loamy soil',
    waterRequirement: 'Medium',
    fertilizers: 'NPK, Gypsum, Calcium',
    pestManagement: 'Monitor for leaf miners, thrips, and leaf spot diseases',
    stages: [
      { name: 'Land Preparation', duration: '10-15 days', details: 'Plowing, harrowing, and bed formation' },
      { name: 'Sowing', duration: '5-7 days', details: 'Direct seeding on beds or ridges' },
      { name: 'Vegetative', duration: '30-40 days', details: 'Germination, leaf development, and branching' },
      { name: 'Reproductive', duration: '30-40 days', details: 'Flowering, peg formation, and pod development' },
      { name: 'Maturation', duration: '20-30 days', details: 'Pod filling and maturation' }
    ],
    image: '/placeholder.svg'
  }
];

const Crops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCrops, setFilteredCrops] = useState(cropsData);
  const [selectedCrop, setSelectedCrop] = useState(cropsData[0]);

  const handleSearch = () => {
    const filtered = cropsData.filter(crop => 
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCrops(filtered);
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
            <h1 className="text-4xl font-display font-bold mb-4">Crop Information</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive crop information, market prices, and growing guides.
            </p>
          </motion.div>

          <Tabs defaultValue="prices" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="prices">Market Prices</TabsTrigger>
              <TabsTrigger value="cultivation">Cultivation Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="prices" className="space-y-8">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search crops..."
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
                {filteredCrops.map((crop, index) => (
                  <motion.div
                    key={crop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={crop.image} 
                          alt={crop.name} 
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-start">
                          <span>{crop.name}</span>
                          <Badge 
                            className={crop.predictedPrice.includes('↑') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}
                          >
                            {crop.predictedPrice.includes('↑') ? 'Rising' : 'Falling'}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{crop.scientificName}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow space-y-3">
                        <div>
                          <p className="text-sm font-medium">Current Market Price</p>
                          <p className="text-xl font-semibold">{crop.currentPrice}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Predicted Price (30 days)
                          </p>
                          <p className="text-lg">{crop.predictedPrice}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="text-muted-foreground">Best Season:</span>
                            <p>{crop.bestSeason}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Growing Period:</span>
                            <p>{crop.growingPeriod}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => setSelectedCrop(crop)}>
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Price Trends Analysis</CardTitle>
                  <CardDescription>AI-powered price prediction based on historical data and market factors.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center">
                    <p className="text-lg mb-4">Interactive price charts will appear here</p>
                    <p className="text-sm text-muted-foreground">Our AI analyzes market data, weather patterns, and supply chains to predict future crop prices.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cultivation">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Crop</CardTitle>
                    <CardDescription>
                      Choose a crop to view detailed cultivation information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {cropsData.map((crop) => (
                        <Button
                          key={crop.id}
                          variant={selectedCrop.id === crop.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedCrop(crop)}
                        >
                          <Leaf className="h-4 w-4 mr-2" />
                          {crop.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedCrop.name}</CardTitle>
                          <CardDescription>{selectedCrop.scientificName}</CardDescription>
                        </div>
                        <Badge>{selectedCrop.bestSeason}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Growing Period
                          </p>
                          <p>{selectedCrop.growingPeriod}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Soil Type</p>
                          <p>{selectedCrop.soilType}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Water Requirement</p>
                          <p>{selectedCrop.waterRequirement}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Recommended Fertilizers</p>
                          <p>{selectedCrop.fertilizers}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Pest Management</h3>
                        <p className="text-sm">{selectedCrop.pestManagement}</p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Growing Stages</h3>
                        <div className="space-y-6">
                          {selectedCrop.stages.map((stage, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{stage.name}</h4>
                                <span className="text-sm flex items-center text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {stage.duration}
                                </span>
                              </div>
                              <Progress value={(index + 1) * (100 / selectedCrop.stages.length)} className="h-1" />
                              <p className="text-sm">{stage.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Common Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>What is the best time to plant {selectedCrop.name}?</AccordionTrigger>
                          <AccordionContent>
                            The best time to plant {selectedCrop.name} is during {selectedCrop.bestSeason} season when the weather conditions are optimal for germination and growth.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>How much water does {selectedCrop.name} need?</AccordionTrigger>
                          <AccordionContent>
                            {selectedCrop.name} has a {selectedCrop.waterRequirement.toLowerCase()} water requirement. Proper irrigation is essential, especially during critical growth stages.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>What are common pests for {selectedCrop.name}?</AccordionTrigger>
                          <AccordionContent>
                            {selectedCrop.pestManagement}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger>When should I harvest {selectedCrop.name}?</AccordionTrigger>
                          <AccordionContent>
                            {selectedCrop.name} should be harvested at the end of the {selectedCrop.stages[selectedCrop.stages.length - 1].name} stage, which typically occurs after {selectedCrop.growingPeriod} from planting.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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

export default Crops;
