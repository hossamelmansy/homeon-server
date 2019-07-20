const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    name: { type: String, required: true },
    _owner: { type: Schema.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("list", ListSchema);
