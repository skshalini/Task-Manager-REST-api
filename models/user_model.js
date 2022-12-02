const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
Username: {
    type: String,
    required: true,
    trim:true,
    maxlength: [35, 'Name must have not more than 35 characters'],
    minLength: [4, 'Name is too short!'], 
    validate(value) {
        if (!validator.isAlpha(value)) {
            throw new Error("Name must contain only characters between Aa-zZ");
        }
    }
},
email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 25,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalid Email-id");
        }
    }
},
password: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: 8
    
},
phn_no: {
    type: Number,
    required: [true, 'Your Contact Number Please!!'],
    unique: true,
    trim: true,
    minlength: 10,
    maxlength: 10
}
})
//----Hashing the Password----
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports= mongoose.model('User', userSchema);