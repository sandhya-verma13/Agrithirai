
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, FileType, Filter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock schemes data
const schemesData = [
  {
    id: 1,
    title: 'PM-KISAN',
    description: 'Income support of ₹6000 per year in three equal installments to all land holding farmer families.',
    eligibility: 'All land holding farmers with cultivable land.',
    benefit: '₹6000 per year',
    deadline: '2023-12-31',
    category: 'income',
    link: '#'
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive risk coverage for crops against non-preventable natural risks from pre-sowing to post-harvest losses.',
    eligibility: 'All farmers growing notified crops in notified areas.',
    benefit: 'Insurance coverage',
    deadline: '2023-11-30',
    category: 'insurance',
    link: '#'
  },
  {
    id: 3,
    title: 'Kisan Credit Card',
    description: 'Provides farmers with affordable credit for their cultivation needs.',
    eligibility: 'All farmers, tenant farmers, sharecroppers, and oral lessees.',
    benefit: 'Low interest loans',
    deadline: 'Ongoing',
    category: 'credit',
    link: '#'
  },
  {
    id: 4,
    title: 'PM Kisan Maan Dhan Yojana',
    description: 'Pension scheme for small and marginal farmers aged between 18 to 40 years.',
    eligibility: 'Small and marginal farmers aged 18-40 years.',
    benefit: '₹3000 per month after age 60',
    deadline: '2023-10-15',
    category: 'pension',
    link: '#'
  },
  {
    id: 5,
    title: 'Micro Irrigation Fund',
    description: 'Promotes water conservation technologies in agriculture.',
    eligibility: 'Farmers willing to implement micro-irrigation systems.',
    benefit: 'Subsidies for irrigation equipment',
    deadline: '2023-09-30',
    category: 'irrigation',
    link: '#'
  },
  {
    id: 6,
    title: 'Agriculture Infrastructure Fund',
    description: 'Financing facility for investment in post-harvest management infrastructure and community farming assets.',
    eligibility: 'Farmers, FPOs, APMCs, and agri-entrepreneurs.',
    benefit: 'Long-term debt financing',
    deadline: 'Ongoing',
    category: 'infrastructure',
    link: '#'
  }
];

const Schemes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState(schemesData);
  const [landDetails, setLandDetails] = useState({
    area: '',
    location: '',
    cropType: ''
  });

  const handleSearch = () => {
    const filtered = schemesData.filter(scheme => 
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSchemes(filtered);
  };

  const handleLandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an AI service to analyze land details
    // and recommend suitable schemes
    
    // For demo, we'll just filter based on some simple logic
    let recommended;
    if (landDetails.cropType.toLowerCase().includes('rice') || landDetails.cropType.toLowerCase().includes('paddy')) {
      recommended = schemesData.filter(s => s.category === 'irrigation' || s.category === 'insurance');
    } else if (Number(landDetails.area) < 5) {
      recommended = schemesData.filter(s => s.category === 'income' || s.category === 'credit');
    } else {
      recommended = schemesData.filter(s => s.category === 'infrastructure');
    }
    
    setFilteredSchemes(recommended);
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
            <h1 className="text-4xl font-display font-bold mb-4">Government Schemes</h1>
            <p className="text-xl text-muted-foreground">
              Discover government initiatives, subsidies, and programs designed to support farmers.
            </p>
          </motion.div>

          <Tabs defaultValue="browse" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Schemes</TabsTrigger>
              <TabsTrigger value="recommend">AI Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="space-y-8">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search schemes..."
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme, index) => (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{scheme.title}</CardTitle>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {scheme.category}
                          </Badge>
                        </div>
                        <CardDescription>{scheme.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Eligibility:</span> {scheme.eligibility}</p>
                          <p><span className="font-semibold">Benefit:</span> {scheme.benefit}</p>
                          <p><span className="font-semibold">Deadline:</span> {scheme.deadline}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <a href={scheme.link} className="text-primary hover:underline inline-flex items-center">
                          <span>View details</span>
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
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
                    <CardTitle>Your Land Details</CardTitle>
                    <CardDescription>
                      Provide information about your land for AI-powered scheme recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLandSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Land Area (in acres)</label>
                        <Input 
                          type="number" 
                          placeholder="e.g., 5" 
                          value={landDetails.area}
                          onChange={(e) => setLandDetails({...landDetails, area: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location/District</label>
                        <Input 
                          placeholder="e.g., Chennai" 
                          value={landDetails.location}
                          onChange={(e) => setLandDetails({...landDetails, location: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Main Crop Type</label>
                        <Input 
                          placeholder="e.g., Rice, Wheat, Cotton" 
                          value={landDetails.cropType}
                          onChange={(e) => setLandDetails({...landDetails, cropType: e.target.value})}
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
                      <CardTitle>AI Recommended Schemes</CardTitle>
                      <CardDescription>
                        Based on your land details, our AI recommends the following schemes.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {filteredSchemes.length === schemesData.length ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileType className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                          <p>Submit your land details to get personalized recommendations.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredSchemes.map((scheme) => (
                            <div key={scheme.id} className="border-b pb-4 last:border-b-0">
                              <div className="flex justify-between">
                                <h3 className="font-semibold">{scheme.title}</h3>
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                  {scheme.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
                              <div className="mt-2 flex justify-between items-center">
                                <span className="text-sm"><span className="font-medium">Benefit:</span> {scheme.benefit}</span>
                                <a href={scheme.link} className="text-primary text-sm hover:underline inline-flex items-center">
                                  Details
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Why Use AI for Scheme Selection?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                          <span className="text-sm">Personalized recommendations based on your specific farming situation</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                          <span className="text-sm">Save time by focusing only on schemes you're eligible for</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                          <span className="text-sm">Maximize benefits by finding schemes that complement each other</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                          <span className="text-sm">Stay updated on new schemes and deadlines automatically</span>
                        </li>
                      </ul>
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

export default Schemes;
