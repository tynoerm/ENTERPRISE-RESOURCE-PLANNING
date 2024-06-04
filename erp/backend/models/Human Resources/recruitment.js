import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let recruitmentSchema = new Schema ({
  name: {
    type: String
  },
  
  email: {
    type: String
  },

  phone_number: {
    type: Number
  },

  address: {
    type: String
  },

  status: {
    type: String 
  },

  offer_details: {
    type: String
  },
  applied_position: {
    type: String
  }

}, {
    collection: 'recruitment'
  })

export default model('recruitment',  recruitmentSchema)