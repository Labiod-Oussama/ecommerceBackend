const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 const {createToken}=require('../middlewares/CreateToken')
const Schema = mongoose.Schema;
const UserSchema = Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
        unique: true
    },
    Password: {
        type: String,
    }
})
//hashing the password
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
    
})

UserSchema.statics.login = async function (email, password) {
    // const user = await this.findOne({ Name: email });
    const user = await this.findOne({$or:[{Name:email},{Email:email}]});
    if (user) {
        const auth = await bcrypt.compare(password, user.Password);
        if (auth) {
            const token = createToken(user._id);
            return { success:true,token, user };
        }
        throw 'incorrect password'
    }
    throw 'incorrect email'
};
const User = mongoose.model('users', UserSchema);
module.exports = User;