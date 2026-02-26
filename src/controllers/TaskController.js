import Task from "../models/Task"; // Tu modelo de Mongoose
import { connectDB } from "../lib/db"; // Tu función de conexión

export const taskController = {
    // 1. Función para obtener tareas (Lectura)
    async getAll() {
        try {
            await connectDB();
            return await Task.find().sort({ createdAt: -1 });
        } catch (error) {
            console.error("Error al obtener tareas:", error);
            return [];
        }
    }, 

    // 2. Función "Cerebro" (Maneja todos los POST)
    async handleRequest(request) {
        if (request.method !== "POST") return null;

        try {
            await connectDB();
            const data = await request.formData();
            const action = data.get("action");
            const id = data.get("id");
            const title = data.get("title")?.toString();


            // Switch para decidir qué hacer según el botón presionado
            switch (action) {
                case "delete":
                    if (id) await Task.findByIdAndDelete(id);
                    break;

                case "update":
                    if (id && title) {
                        await Task.findByIdAndUpdate(id, { title: title.trim() });
                    }
                    break;

                case "complete":
                    const task = await Task.findById(id); // Primero buscamos la tarea
                    if (task) {
                        // Si el estatus es 'terminado', lo ponemos en 'pending'. Si no, en 'terminado'
                        const nuevoEstado = task.status === "terminado" ? "pending" : "terminado";
                        await Task.findByIdAndUpdate(id, { status: nuevoEstado });
                    }
                    break;

                default: // Caso por defecto: Crear (cuando no hay action específica)
                    if (title && title.trim() !== "") {
                        await Task.create({
                            title: title.trim(),
                            status: "pending"
                        });
                    }
                    break;
            }

            return { success: true };
        } catch (error) {
            console.error("Error en la operación:", error);
            return { success: false, error };
        }
    }
};