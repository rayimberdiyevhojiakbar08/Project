import { Schema, model, connect } from 'mongoose';

connect("mongodb://localhost/project", { useNewUrlParser:true, useUnifiedTopology:true });

const orderSchema = new Schema({
    namesure: { type:String, required:true },
    number: { type:Number, required:true },
    adress: { type:String, required:true },
    day: { type:String, required:true },
    time: { type:String, required:true },
    mastername: { type:String, required:true },
    cost: { type:Number, required:true },
    ordername: { type:String, required:true },
    ordertype: { type:String, required:true },
},
    { timestamps:true }
);

export default model('Orders', orderSchema);