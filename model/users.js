const { mongoose } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const  userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        unique: true
    },
    firstname:{
        type: String,
        required: false
    },
    lastname:{
        type: String,
        required: false
    },
    phonenumber:{
        type:Number,
        default: 0,
        required: false
    },
    city:{
        type: String,
        required: false,
    },
    country:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required: false,
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
