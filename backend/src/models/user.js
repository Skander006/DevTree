import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        firstname : {
            type : String,
            required : [true, "First name required !"],
            trim : true,
            minLength : 3
        },
        lastname : {
            type : String,
            required : [true, "Last name required !"],
            trim : true,
            minLength : 3
        },
        email : {
            type : String,
            required : [true, "Email required !"],
            unique : true,
            trim : true,
            lowercase : true
        },
        password : {
            type : String,
            required : [true, "Password required !"],
            minLength : 6,
            trime : true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minLength : 5
        },
        avatar : {
            type : String,
            default : ''
        },
        bio:{
            type : String,
            default : ''
        }
    },{timestamps : true}
)

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    } else{
        this.password = await bcrypt.hash(this.password, 12);
    }
});

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User",UserSchema);