// app/register/page.js
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterPage() {
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
        const token = "dummy-token";
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", "loggedIn");
        router.push("/");
        alert("Register successful!");
      } catch (error) {
        console.error("Registration or login failed:", error);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
