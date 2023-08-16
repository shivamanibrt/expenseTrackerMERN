import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_CLIENT)
        conn && console.log('Mongo db connected')
    } catch (error) {
        console.log(error)
    }

}