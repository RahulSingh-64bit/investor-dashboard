// src/components/Layout/Sidebar.jsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Briefcase, ShoppingCart, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar({ isOpen = false, onClose }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Invest", icon: TrendingUp },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/orders", label: "Orders", icon: ShoppingCart },
    { href: "/buy-sell", label: "Buy/Sell", icon: ArrowLeftRight },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 z-50",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-6 border-b border-sidebar-border mt-[73px] lg:mt-0">
        <h1 className="text-primary text-xl font-bold">YOUR LOGO</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-sidebar-accent hover:text-white-accent-foreground transition-colors",
                    isActive &&
                      "bg-primary text-white hover:bg-blue-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}