"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "@/components/AdminLayout";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const [totals, setTotals] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");

        const data = response.data;
        const totalSales = 1000;
        const totalProducts = data.products?.length || 0;
        const totalCustomers = data.customers?.length || 0;
        const totalOrders = data.orders?.length || 0;

        setTotals({
          totalSales,
          totalProducts,
          totalCustomers,
          totalOrders,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <CardTitle>Total Sales</CardTitle>
            {loading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <CardDescription>৳{totals.totalSales}</CardDescription>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Total Products</CardTitle>
            {loading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <CardDescription>{totals.totalProducts}</CardDescription>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Total Customers</CardTitle>
            {loading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <CardDescription>{totals.totalCustomers}</CardDescription>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Total Orders</CardTitle>
            {loading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <CardDescription>{totals.totalOrders}</CardDescription>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
