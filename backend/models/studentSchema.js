const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    adharNumber: {
        type: String,
        // required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    pastSchoolName: {
        type: String,
        // required: true
    },
    rollNum: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
    examResult: [
        {
            subName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        }
    }],
    fees: [{
        date: {
            type: Date,
            required: true
        },
        month: {
            type: String,
            enum: [ 'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'],
            required: true
        },
        totalfees: {
            type: String,
            default: 6000,
        },
        payfees: {
            type: String,
            required: true
        },
        accountant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'admin',
            required: true
        }
    }]
});

module.exports = mongoose.model("student", studentSchema);