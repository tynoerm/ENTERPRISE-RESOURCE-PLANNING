import { Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;


let logisticsandShippingShema = new Schema({

    sender_details: {
        type: String
    },
    receiver_details: {
        type: String
    },
    package_dimensions: {
        type: String
    },
    
    package_description: {
        type: String
    },


    weight: {
        type: String
    },
   insurance_coverages: {
    type: String
   },

   trackingand_notications: {
    type: String
   },

   customsdocumentation: {
    type: String
   }






},{
    collection: 'logisticsandShipping'
})


export default model('logisticsandShipping',logisticsandShippingShema)