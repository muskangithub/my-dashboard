import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is undefined. Check your .env.local file.");
}

const pool = new Pool({
  connectionString,
});

// Handle GET requests
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM public.products");
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
