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

export default function ProductDetailView() {
  const path = usePathname();
  const id = path.split("/").pop(); // Extract product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        try {
          const response = await axios.get(`/api/data`); // Replace with actual API endpoint or static JSON
          const product = response.data.products.find(
            (product) => product.id === parseInt(id)
          );
          setProduct(product);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      };
      getProduct();
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

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-red-500 text-center text-2xl">
          Product not found. Because it is not exist in database or not
          hardcoded
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
          <CardTitle>Product Detail - {product.name}</CardTitle>
          <CardDescription>
            <p>Price: ৳{product.price}</p>
            <p>Description: {product.description}</p>
          </CardDescription>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button onClick={() => router.back()}>Back</Button>
      </div>
    </AdminLayout>
  );
}
