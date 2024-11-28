// Dependencies
import TaskModel from "../model/TaskModel.js";
import mongoose from "mongoose";
const {ObjectId} = mongoose.Types;




// Create Task
export const createTask = async (req, res) => {
    try {
        const user_id = req.headers["user_id"];
        const reqBody = req.body;

        // Set user id to Data Model
        reqBody.user_id = user_id; 

        // Inserted data in the DB
        const data = await TaskModel.create(reqBody); 
    
        if(!data || data.length === 0){
            return res.json({status: "Failed", message: "Couldn't create task!"});
        }else{
           return res.json({status: "Success", data: data});
        }
    }catch(e) {
        console.log(e);
        return res.json({status: "error", message: "Internal server error"});
    }
};

// Update Task
export const updateTaskStatus = async (req, res) => {
    try {
        const user_id = req.headers["user_id"];
        const id = req.params.id;
        const status = req.params.status;
        const data = await  TaskModel.updateOne({_id: id, user_id: user_id},  {status: status});
 
        if (!data || data.modifiedCount === 0) {
            res.json({status: "failed", message: "Couldn't update task!"});
        }else{
        res.json({status: "Success", data: data});
        }
    }catch (e) {
        console.log(e);
         res.json({status: "Error", message: "Internal server error"});
    }
}

// Update Task
export const taskListByStatus = async (req, res) => {
    try {
        const status = req.params["status"];
        const user_id = req.headers["user_id"];
        const data = await TaskModel.find({user_id: user_id, status: status});

        if(data.length === 0){
            res.json({status: "failed", message: "No data found!"});
        }else{
            res.json({status: "Success", data: data})
        }
    }catch(e) {
        console.log(e);
        res.json({status: "Error", message: "Internal server error"});
    }
};

//  Delete Task
export const DeleteTask = async (req, res) => {
    try {
        const user_id = req.headers["user_id"];
        const id = req.params["id"];
        const data = await TaskModel.deleteOne({_id: id, user_id: user_id});

        if(data.deletedCount === 0) {
            res.json({status: "failed", message: "Couldn't deleted!"});
        }else{
            res.json({status: "Success", data: data});

        }
    }catch(e) {
        console.log(e);
        res.json({status: "Error", message: "Internal server error"});
    }
};

// Count Task By Status
export const CountTaskByStatus = async (req, res) => {
    try {
        const UserObject_Id = new ObjectId(req.headers["user_id"]);
        const data = await TaskModel.aggregate([
            {$match:{user_id: UserObject_Id}},
            {$group: {_id:"$status", sum: {$count:{}}}}
        ]);
        res.json({status:"Success", data: data});
    }catch(e){
        console.log(e);
        res.json({status:"error", message: "Internal server error"});
    }
}