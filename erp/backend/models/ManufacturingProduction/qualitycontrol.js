import {Schema as _Schema, model} from 'mongoose';
const Schema = _Schema;

let qualitycontrolSchema = new Schema ({

    inspection_date: {
        type: String
    },
    inspection_type: {
        type: String
    },
    inspection_result: {
        type: String
    },
    defects_ofnonconformances: {
        type: String
    },
    insepection_notes: {
        type: String
    },
    inspector: {
      type: String
    },
    acceptance_criteria: {
        type: String
    },
    approved_by: {
        type: String
    }

},{
    collection: 'qualitycontrol'
})

export default model('qualitycontrol',qualitycontrolSchema)