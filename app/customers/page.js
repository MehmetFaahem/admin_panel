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

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axios.get("/api/data");
        const data = response.data.customers;
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };
    getCustomers();
  }, []);

  const navigateToCustomer = (id) => {
    router.push(`/customers/${id}`);
  };

  const deleteCustomer = (id) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id)
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(
          /^\+?[1-9]\d{1,14}$/,
          "Invalid phone number. Must be in E.164 format."
        ),
    }),
    onSubmit: (values) => {
      const newCustomerId = customers.length
        ? customers[customers.length - 1].id + 1
        : 1;
      const customerToAdd = {
        ...values,
        id: newCustomerId,
      };
      setCustomers((prevCustomers) => [...prevCustomers, customerToAdd]);
      formik.resetForm();
      setDialogOpen(false);
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setDialogOpen(true)}>Add New Customer</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Please fill in the details of the new customer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              placeholder="Customer Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
            <Input
              placeholder="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500">{formik.errors.phone}</div>
            ) : null}
            <DialogFooter>
              <Button type="submit">Add Customer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
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
                  <Skeleton className="h-6 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
              </TableRow>
            ))
          ) : customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id} className="cursor-pointer">
                <TableCell onClick={() => navigateToCustomer(customer.id)}>
                  {customer.name}
                </TableCell>
                <TableCell onClick={() => navigateToCustomer(customer.id)}>
                  {customer.email}
                </TableCell>
                <TableCell onClick={() => navigateToCustomer(customer.id)}>
                  {customer.phone}
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteCustomer(customer.id)}>
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
