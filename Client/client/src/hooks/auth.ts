import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
export default function useAuth() {
    const [location, navigate] = useLocation();
    const { toast } = useToast();
    
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
      toast({
        title: "Access Denied",
        description: "You need to log in to view this page.",
        variant: "destructive",
      });
      
    }
  }, [navigate, location]);
}
