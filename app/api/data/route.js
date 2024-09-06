import fetchData from "@/lib/fetchData";
import { NextResponse } from "next/server";
export async function GET() {
  const products = await fetchData("products");
  const customers = await fetchData("customers");
  const orders = await fetchData("orders");

  return NextResponse.json({ products, customers, orders });
}
