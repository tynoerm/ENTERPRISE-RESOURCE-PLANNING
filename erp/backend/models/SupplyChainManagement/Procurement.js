import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let PurchaseOrderSchema = new Schema({
    purchase_order_number: {
        type: String
    },

    purchase_order_date: {
        type: String
    },

    buyer_information: {
        type: String
    },

    supplier_information: {
        type: String
    },

    delivery_address: {
        type: String
    },

    payment_terms: {
        type: String
    },

    item_description: {
        type: String
    },

    quantity: {
        type: Number
    },

    unit_price: {
        type: Number
    },

    sub_total: {
        type: Number
    },
    delivery_date: {
        type: String
    },

    warrant_information: {
        type: String
    },

    approvals: {
        type: String
    }

}, {
    collection: 'procurement'
})

export default model('purchaseorder', PurchaseOrderSchema)