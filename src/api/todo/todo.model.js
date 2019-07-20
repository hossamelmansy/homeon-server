const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    text: { type: String, required: true },
    note: { type: String },
    tags: [String],
    priority: {
      type: String,
      default: "NO",
      enum: ["HIGH", "MEDIUM", "LOW"]
    },
    dueDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    list: { type: Schema.Types.ObjectId, ref: "list", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", TodoSchema);
