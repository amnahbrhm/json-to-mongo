import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import data from "./call_data.json";
import {CallData} from './model';
const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const startTime = Date.now();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/data", {}).then(() => console.log("Db Connected!"));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        for (let index = 0; index < data.length; index++) {
            let callData = new CallData();
            callData.source = data[index].source
            callData.destination = data[index].destination
            callData.source_location = data[index].source_location
            callData.destination_location = data[index].destination_location
            callData.call_duration = data[index].call_duration
            callData.roaming = data[index].roaming
            callData.call_charge = data[index].call_charge
            callData = await callData.save();
        }
        return res.status(200).send({
            message: "Data uploaded succefully",
        });
    }
);

try {
    app.listen(port, async (): Promise<void> => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}



// import fs from 'fs';
// import JSONStream from "JSONStream";
// const db = mongoose.connection;

// db.on('open', () => {
//   console.log('Connected to mongo server.\nImport from file to DB started...');
//   const dataStreamFromFile = fs.createReadStream(`./call_data.json`);

//   dataStreamFromFile.pipe(JSONStream.parse('*')).on('data', (chunk: any) => {
//     new CallData(chunk).save();
//   });

//   dataStreamFromFile.on('end', () => {
//     const timeTaken = Date.now() - startTime;
//     console.log(`Import completed in ${timeTaken} milisecs, closing connection...`);
//     db.close();
//     process.exit(0);
//   });
// });

// db.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
//   process.exit(-1);
// });