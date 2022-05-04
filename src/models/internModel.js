const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Intern name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: {
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w(2,3))+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false
        }
    },
    mobile: {
        type: String,
        required: 'Number is required',
        unique: true,
        validate: {
            validator: function(mobile){
                return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)
            }, message: 'Please fill a valid mobile number'
        }
    },
    collegeId: {
        required: 'Intern college is required',
        type: mongoose.Types.ObjectId,
        refs: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema);