const { mongoose } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const  userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phonenumber:{
        type:Number,
        default: 0,
        required: true
    },
    city:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        unique: true,
        min: 6
    }
},
{
    timestamps: true
}
);
 userSchema.plugin(passportLocalMongoose)

 //exporting newwayusers
 module.exports = mongoose.model('Newwayuser', userSchema);
