import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  subtasks: {
    type: [String],
    required: true,
  }
});

const fileSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sections: {
    type: [String],
    required: true,
  },
  tasks: [taskSchema]
});

const File = models.File || mongoose.model("File", fileSchema)
export default File