import mongoose, { Schema } from "mongoose";

const callDataSchema = new Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    source_location: { type: String, required: true },
    destination_location: { type: String, required: true },
    call_duration: { type: Number, required: true },
    roaming: { type: String, required: true },
    call_charge: { type: Number, required: true },
})


export const CallData = mongoose.model("callData", callDataSchema);