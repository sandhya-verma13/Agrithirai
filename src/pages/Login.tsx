
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      console.log('Login attempt with:', loginData);
      setIsLoading(false);
      // In a real application, you would redirect to the dashboard upon successful login
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate register API call
    setTimeout(() => {
      console.log('Register attempt with:', registerData);
      setIsLoading(false);
      // In a real application, you might show a success message or redirect
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md mx-auto"
            >
              <Card className="w-full glass-card">
                <Tabs defaultValue="login" className="w-full">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-agri-green-500 to-agri-green-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        A
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-display text-center">Welcome to AgriThirai</CardTitle>
                    <CardDescription className="text-center">
                      Login to access personalized farming insights
                    </CardDescription>
                    <TabsList className="grid w-full grid-cols-2 mt-4">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  
                  <TabsContent value="login">
                    <CardContent className="space-y-4">
                      <form onSubmit={handleLoginSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              placeholder="farmer@example.com" 
                              type="email" 
                              value={loginData.email}
                              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="password">Password</Label>
                              <Link to="#" className="text-sm text-primary hover:underline">
                                Forgot password?
                              </Link>
                            </div>
                            <Input 
                              id="password" 
                              placeholder="••••••••" 
                              type="password" 
                              value={loginData.password}
                              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                              required
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label
                              htmlFor="remember"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Remember me
                            </label>
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-agri-green-600 hover:from-agri-green-600 hover:to-primary transition-all duration-300" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <CardContent className="space-y-4">
                      <form onSubmit={handleRegisterSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              placeholder="Your Name" 
                              type="text" 
                              value={registerData.name}
                              onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="reg-email" 
                              placeholder="farmer@example.com" 
                              type="email" 
                              value={registerData.email}
                              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                              id="reg-password" 
                              placeholder="••••••••" 
                              type="password" 
                              value={registerData.password}
                              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input 
                              id="confirm-password" 
                              placeholder="••••••••" 
                              type="password" 
                              value={registerData.confirmPassword}
                              onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                              required
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" required />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the <Link to="#" className="text-primary hover:underline">terms of service</Link>
                            </label>
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-agri-green-600 hover:from-agri-green-600 hover:to-primary transition-all duration-300" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create Account"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </TabsContent>
                  
                  <CardFooter className="flex flex-col space-y-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        Facebook
                      </Button>
                      <Button variant="outline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        Google
                      </Button>
                    </div>
                  </CardFooter>
                </Tabs>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
