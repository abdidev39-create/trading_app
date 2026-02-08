import { Home, Megaphone, User, PiggyBank, Wallet } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MobileNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Navigation items configuration for easier management
  const navItems = [
    { path: "/", icon: <Home size={22} />, label: "Home" },
    { path: "/news", icon: <Megaphone size={22} />, label: "News" },
    { path: "/wallet", icon: <Wallet size={22} />, label: "Wallet" },
    { path: "/loan", icon: <PiggyBank size={22} />, label: "Loans" },
    { path: "/profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <>
      {/* Spacer to prevent content from being hidden behind navbar */}
      <div className="h-20 md:hidden" />
      
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/80 shadow-2xl shadow-black/40 flex justify-around items-center py-2.5 w-[calc(100%-2rem)] max-w-md md:hidden z-50">
        {navItems.map((item) => (
          <Tab
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>
    </>
  );
}

function Tab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl transition-all duration-250 ease-out flex-1 min-h-[60px] mx-0.5 active:scale-95 ${
        active
          ? "text-blue-400 bg-gradient-to-b from-blue-500/15 to-blue-500/5 border border-blue-500/30"
          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 active:bg-gray-800/70"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <div
        className={`transition-all duration-300 ${
          active ? "scale-110 translate-y-[-2px]" : "scale-100"
        }`}
      >
        {icon}
      </div>
      
      <span
        className={`text-[10px] font-semibold tracking-wide transition-all duration-300 ${
          active ? "opacity-100 translate-y-0" : "opacity-80"
        }`}
      >
        {label}
      </span>
      
      {/* Active indicator */}
      {active && (
        <>
          <div className="absolute top-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute -bottom-2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full" />
        </>
      )}
    </button>
  );
}