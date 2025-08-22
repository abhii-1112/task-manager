import mongoose, {Schema, Document} from "mongoose";


export interface ITask extends Document {
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema:Schema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "completed"], 
      default: "pending" 
    }
},
    { timestamps: true }
)

const Task = mongoose.model<ITask>("Task", TaskSchema)

export default Task


