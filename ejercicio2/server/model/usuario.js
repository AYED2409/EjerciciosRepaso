const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
      },
    password:{
        type: String,
        required:true        
    }
});
UserSchema.method('encryptPasswd',async function(passwd){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(passwd,salt);
    //console.log("pass con salt:----> "+this.password)
    //console.log("password:--->"+this.password)
})
UserSchema.method('matchPasswd',async function(passwd){
    return await bcrypt.compare(passwd,this.password)
})


// UserSchema.method.encryptPassword = async passwd =>{
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(passwd,salt);
// }
// UserSchema.method.matchPassword = async function(passwd){
//     return await bcrypt.compare(passwd,this.password)
// }
const User = mongoose.model('User', UserSchema);
module.exports = User;