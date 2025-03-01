import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import axios from "axios";
import { useLocation } from "wouter";
import { BACKEND_URL } from "@/config";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/login`, formData)
      .then((res) => {
        const { token, userId,  name } = res.data;
        // console.log(res.data);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", name);
        setLocation("/home");
        toast({
          title: "Login Successful",
          description: `Welcome back, ${formData.email}!`,
          variant: "default",
        });
      })
      .catch((e) => {
        console.error(e);
        toast({
          description: e.response.data.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/40 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-200/40 rounded-full opacity-20"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-purple-300/30 rounded-full opacity-20"></div>
      
      {/* Elegant decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-pink-100 to-transparent opacity-40" 
           style={{ borderBottomLeftRadius: "100%" }}></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-blue-100 to-transparent opacity-40" 
           style={{ borderTopRightRadius: "100%" }}></div>
           
      {/* Subtle pattern overlay with darker color */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0id2hpdGUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMzBDMTUgMzAgMTUgMTUgMzAgMTVDNDUgMTUgNDUgMzAgNjAgMzBDNDUgMzAgNDUgNDUgMzAgNDVDMTUgNDUgMTUgMzAgMCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNjNGIwZmYiIHN0cm9rZS13aWR0aD0iMyI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
      
      <Toaster />
      <Card className="w-96 shadow-2xl bg-white bg-opacity-90 backdrop-blur-sm p-6 z-10 border-0 rounded-2xl">
        {/* Glowing accent at the top of card */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-primary rounded-full blur-xl opacity-70"></div>
        
        {/* Login icon with gradient background */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-primary to-purple-700 rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-4 border-white">
          <LogIn className="text-white w-10 h-10" />
        </div>
        
        <CardHeader className="text-center text-xl font-semibold pt-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">Welcome Back</h2>
          <p className="text-sm text-gray-600 mt-1">Sign in to your account</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 text-primary" /> Email
              </Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary rounded-lg transition-all duration-200"
                />
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500 group-focus-within:text-primary" />
              </div>
            </div>
            
            <div className="group">
              <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4 text-primary" /> Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary rounded-lg transition-all duration-200"
                />
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500 group-focus-within:text-primary" />
              </div>
            </div>
            
            
            
            <Button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-primary to-purple-700 hover:from-primary/90 hover:to-purple-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              <LogIn className="w-4 h-4 mr-2" /> Sign In
            </Button>
          </form>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600"></span>
            </div>
          </div>
          
          {/* Social login buttons */}
          
          
          <p className="text-center text-sm text-gray-600 mt-6 flex flex-col items-center justify-center">
            Don't have an account?{" "}
            <span
              onClick={() => setLocation("/signup")}
              className="text-primary hover:text-purple-700 font-medium hover:underline cursor-pointer transition-colors duration-200 inline-flex items-center"
            >
              <UserPlus className="w-3 h-3 mr-1" /> Create account
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}