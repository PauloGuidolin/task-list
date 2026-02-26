import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, //titulo tarea
  status: { type: String, default: 'pendiente'}, //status tarea
  createdAt: { type: Date, default: Date.now} //fechaCreacion
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema); 