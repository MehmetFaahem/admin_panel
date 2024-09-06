// app/login/page.js
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      phone: "+880",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^\+880\d{10}$/, "Phone number is not valid")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async () => {
      try {
        router.push("/");
        localStorage.setItem("user", "loggedin");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4 w-72">
        <Input
          placeholder="Phone Number"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
        ) : null}
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
        <div className="flex justify-center items-center">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}
