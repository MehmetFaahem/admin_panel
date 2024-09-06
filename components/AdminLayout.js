"use client";
import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (this is a placeholder, replace with actual logic)
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm ">
          <Link href="/login">
            <button className="w-full py-2 mb-4 bg-black text-white rounded">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="w-full py-2 bg-black text-white rounded">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 text-white">
        <div className="h-16 flex items-center justify-center text-xl font-bold">
          Admin Panel
        </div>
        <nav className="flex-grow px-4 py-2">
          {[
            { href: "/", label: "Dashboard" },
            { href: "/customers", label: "Customers" },
            { href: "/orders", label: "Orders" },
            { href: "/products", label: "Products" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 hover:bg-gray-700 rounded p-3"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="block py-2 text-red-500 rounded w-full text-left p-3"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <button onClick={toggleDrawer} className="p-4 text-white bg-gray-800">
          Menu
        </button>
        <Drawer open={isOpen} onClose={toggleDrawer} placement="left">
          <DrawerOverlay />
          <DrawerContent className="bg-gray-800 text-white">
            <div className="p-4">
              <nav className="space-y-4">
                <Link
                  href="/dashboard"
                  className="block py-2 hover:bg-gray-700 rounded"
                >
                  Dashboard
                </Link>
                <Link
                  href="/customers"
                  className="block py-2 hover:bg-gray-700 rounded"
                >
                  Customers
                </Link>
                <Link
                  href="/orders"
                  className="block py-2 hover:bg-gray-700 rounded"
                >
                  Orders
                </Link>
                <Link
                  href="/products"
                  className="block py-2 hover:bg-gray-700 rounded"
                >
                  Products
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-2 bg-red-500 text-white rounded w-full text-left"
                >
                  Logout
                </button>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-gray-100">{children}</div>
    </div>
  );
}
