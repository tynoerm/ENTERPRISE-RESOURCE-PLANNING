import {Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

let productionordersSchema = new Schema ({

    order_id: {
        type: String
    },
    quantity: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    status: {
        type: String
    },
    assigned_employee: {
        type: String
    },
    last_updated_by: {
        type: Date
    },
    last_updated_date: {
        type: Date
    }


},{
    collection: 'productionorders'
})

export default model('productionorders',productionordersSchema)