import { Schema, model, Document } from 'mongoose'
export interface interfaceTask extends Document {
  title: string
  completed: boolean
  description: string
  date: Date
}

const TaskSchema = new Schema<interfaceTask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },
    date: { type: Date, required: false },
  },
  { timestamps: true }
)

export default model<interfaceTask>('TaskManager', TaskSchema)
