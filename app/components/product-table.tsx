"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";

type Product = {
  Product: string;
  sold_amount: number;
  unit_price: number;
  revenue: number;
  rating: number;
};

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Adjust the API route if needed
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead className="text-right">Sold Amount</TableHead>
          <TableHead className="text-right">Unit Price</TableHead>
          <TableHead className="text-right">Revenue</TableHead>
          <TableHead className="text-right">Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{product?.Product}</TableCell>
            <TableCell className="text-right">{product?.sold_amount}</TableCell>
            <TableCell className="text-right">${product?.unit_price}</TableCell>
            <TableCell className="text-right">${product?.revenue}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end">
                <span className="mr-2">{product?.rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
