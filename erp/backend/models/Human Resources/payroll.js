import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let payrollSchema = new Schema ({
     
    emeployeeId: {
    type: String
},

_name: {
    type: String
},

department: {
    type: String
},
 
position: {
    type: String
},


dateofjoining: {
    type: Date
},

payperiodend: {
    type: Date
},


payperiodstart: {
    type: Date
},
overtimehours: {
    type: Number
},
salary: {
    type: Number
},

overtimepay: {
    type: Number
},

bonuses: {
    type: Number
},

grosspay: {
    type: Number
},
taxdeductions: {
    type: Number
},

netpay: {
    type: Number
},



}, {
    collection: 'payroll'
  })

export default model('payroll', payrollSchema)