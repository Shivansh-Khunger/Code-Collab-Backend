import mongoose from 'mongoose';
export const connectdb =async () =>{
    try  {
        await mongoose.connect('mongodb+srv://dubeysd:123321@cluster0.g1xz4.mongodb.net/project');
        console.log("db connected");
    }
    catch(err){
        console.log(err)
        console.log("db not connected");
    }
}
