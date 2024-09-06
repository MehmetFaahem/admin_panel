"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";

export default function AdminOrderDetail() {
  const path = usePathname();
  const id = path.split("/").pop();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const getOrder = async () => {
        try {
          const response = await axios.get(`/api/data`);
          const order = response.data.orders.find(
            (order) => order.id === parseInt(id)
          );
          setOrder(order);
          setLoading(false);
          console.log(order);
        } catch (error) {
          console.error("Error fetching order:", error);
          setLoading(false);
        }
      };
      getOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <Card>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/5" />
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-red-500 text-center text-2xl">
          Order not found. Because it is not exist in database or not hardcoded
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => router.back()}>Back</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Card>
        <CardContent>
          <CardTitle>Order Detail - #{order.id}</CardTitle>
          <CardDescription>
            <h2 className="font-bold">Customer: {order.customer}</h2>
            <p>Total: ৳{order.total}</p>
            <div className="mt-4">
              <h3 className="font-bold">Products</h3>
              <ul className="space-y-2">
                {order.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - ৳{product.price}
                  </li>
                ))}
              </ul>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button onClick={() => router.back()}>Back</Button>
      </div>
    </AdminLayout>
  );
}
