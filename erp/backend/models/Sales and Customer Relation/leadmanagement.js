import {Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

let leadmanagementSchema = new Schema ({

    lead_source: {
        type: String
    },
    lead_status: {
        type: String
    },
    contact_information: {
        type: String
    },
    company_information: {
        type: String
    },
    
    lead_owner: {
     type: String
    },

    lead_score: {
        type: String
    },

    lead_notes: {
        type: String
    },

    conversion_information: {
        type: String
    }

},{
    collection: 'leadmanagement'
})

export default model('leadmanagement',leadmanagementSchema)