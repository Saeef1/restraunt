import { model, models, Schema } from "mongoose";

const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  special: {
    type: Boolean,
    default: false,
  },
  category: {
    type: [String],
    required: true,
  },
});

const Item = models.Item || model("Item", ModuleSchema);

export default Item;
