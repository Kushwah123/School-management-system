const mongoose = require('mongoose');
const studentfeesSchema = mongoose.Schema(
  {
    accountant: {
      type: String,
      // required: true,

    },
    studentName: {
      type: String,
      // required: true,
    },
    fatherName: {
      type: String,
      // required: true,
    },
    roll_no: {
      type: String,
      // required: true,
    },
    month_name: {
      type: String,
      // required: true,
    },
    year: {
      type: String,
      // required: true,
    },

    monthly_fees: {
      type: Number,
      // required: true,
    },
    transport_fees: {
      type: Number,
    },
    computer_fees: {
      type: Number,
    },
    exam_fees: {
      type: Number,
    },
    
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('Studentfees', studentfeesSchema)
