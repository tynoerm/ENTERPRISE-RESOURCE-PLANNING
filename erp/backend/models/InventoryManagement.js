import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;


let InventorySchema = new Schema({
  item_name: {
    type: String
  },

  category: {
    type: String
  },
  quantity: {
    type: Number
  },
  last_updated: {
    type: Date
  },
  cost_price: {
    type: Number
  },
  selling_price: {
    type: Number
  },

  supplier_name: {
    type: String
  },
  lowquality: {
    type: Boolean,
    default: false,
  },
  averagequality: {
    type: Boolean,
    default: false,
  },
  highquality: {
    type: Boolean,
    default: false,
  },
}, {
    collection: 'inventorymanagement'
  })

export default model('users', InventorySchema)