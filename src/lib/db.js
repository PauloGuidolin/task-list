import mongoose from 'mongoose'; 

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    // Astro lee las variables de entorno con import.meta.env
    await mongoose.connect(import.meta.env.MONGO_URI);
    console.log("✅ Conexión exitosa a Paulo1");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
  }
}
