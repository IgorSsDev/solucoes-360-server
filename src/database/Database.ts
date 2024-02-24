import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
export async function AuthenticationDatabase(){
    try {
       await mongoose.connect(`mongodb+srv://${process.env.USER_DATABASE}:${process.env.PASS_DATABASE}@cluster0.hzzayns.mongodb.net/?retryWrites=true&w=majority`) 
       console.log("conect successful database")
    } catch (error) {
        console.log(error)
    }
}