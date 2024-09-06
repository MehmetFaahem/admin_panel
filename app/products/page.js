"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminLayout from "@/components/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/data");
        const data = response.data.products;
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const navigateToProduct = (id) => {
    router.push(`/products/${id}`);
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      price: Yup.number().required("Required").positive("Must be positive"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const newProductId = products.length
        ? products[products.length - 1].id + 1
        : 1;
      const productToAdd = {
        ...values,
        id: newProductId,
        price: parseFloat(values.price),
      };
      setProducts((prevProducts) => [...prevProducts, productToAdd]);
      formik.resetForm();
      setDialogOpen(false);
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setDialogOpen(true)}>Add New Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Please fill in the details of the new product.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              placeholder="Product Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
            <Input
              placeholder="Price"
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500">{formik.errors.price}</div>
            ) : null}
            <Input
              placeholder="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
              </TableRow>
            ))
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className="cursor-pointer">
                <TableCell onClick={() => navigateToProduct(product.id)}>
                  {product.name}
                </TableCell>
                <TableCell onClick={() => navigateToProduct(product.id)}>
                  ৳{product.price}
                </TableCell>
                <TableCell onClick={() => navigateToProduct(product.id)}>
                  {product.description}
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </AdminLayout>
  );
}
