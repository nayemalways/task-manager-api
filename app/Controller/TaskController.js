import TaskModel from "../model/TaskModel.js";

// Create Task
export const createTask = async (req, res) => {
    const user_id = req.headers["user_id"];
    const reqBody = req.body;
    reqBody.user_id = user_id; // Set user id to Data Model
    const data = await TaskModel.create(reqBody); // Inserted data in the DB
 
    if(!data || data.length === 0){
        res.json({status: "Faild", message: "Couldn't create task!"});
    }else{
        res.json({status: "Success", data: data});
    }
};

// Update Task
export const updateTask = async (req, res) => {
    res.json({status: "Success", message: "user updateTask successull"});
};

// Update Task
export const taskListByStatus = async (req, res) => {
    res.json({status: "Success", message: "user taskListByStatus successull"});
};

//  Delete Task
export const deleteTask = async (req, res) => {
    res.json({status: "Success", message: "user deleteTask successull"});
};

// Count Task
export const countTask = async (req, res) => {
    res.json({status:"Success", message: "user countTask successfull"});
}