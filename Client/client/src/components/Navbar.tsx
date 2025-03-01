import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, History, Heart, Activity, Plus, Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const [location, navigate] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    console.log(storedName);
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    toast({
      title: "Logout Successful",
      description: "Logged out successfully!",
      variant: "default",
    });
    navigate("/login");
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b overflow-visible"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-xl -z-10" />
      <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-purple-100/30 rounded-full blur-lg -z-10" />

      {/* Navbar Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/home">
              <a className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors group">
                <div className="relative">
                  <Heart className="w-6 h-6 stroke-2" />
                  <Activity className="w-4 h-4 absolute -top-1 -right-1 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <Plus className="w-4 h-4 text-primary/70" />
                <span className="text-xl font-semibold tracking-tight">
                  WomenHealth Monitor
                </span>
              </a>
            </Link>
          </div>

          {/* Navigation & User Info */}
          {isMobile ? (
            <div className="flex items-center relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {isMenuOpen && (
                <div className="absolute top-16 right-4 w-48 bg-white rounded-md shadow-lg py-1 border z-[1000]">
                  <Link href="/home">
                    <a
                      className={`block px-4 py-2 ${
                        location === "/"
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/history">
                    <a
                      className={`block px-4 py-2 ${
                        location === "/history"
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      History
                    </a>
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/home">
                <a
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                    location === "/home"
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>
              </Link>
              <Link href="/history">
                <a
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                    location === "/history"
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </a>
              </Link>

              {/* User Info (Name & Logout) */}
              {userName && (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-medium">Hello, {userName} 👋</span>
                </div>
              )}
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-4 py-2 rounded-md transition-colors text-gray-600 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
