import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let PurchaseOrderSchema = new Schema({
    suppliername: {
        type: String
    },

    address: {
        type: String
    },

    contactdetails: {
        type: Number
    },

    email: {
        type: String
    },

    qualityratings: {
        type: String
    },

    deliveryperformance: {
        type: String
    },
    categoryproducts: {
        type: String
    }

}, {
    collection: 'procurement'
})

export default model('purchaseorder', PurchaseOrderSchema)