import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let payrollSchema = new Schema ({
     
employee_name: {
    type: String
},

employee_status: {
    type: String
},
 
job_title: {
    type: String
},

base_salary: {
    type: Number
},

bonuses: {
    type: String
},

deductions_medicalcontribution: {
    type: String
},

banking_details: {
    type: String
}

}, {
    collection: 'payroll'
  })

export default model('payroll', payrollSchema)