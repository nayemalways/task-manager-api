// DEPENDENCIES 
import express from "express";
import * as TaskController from "../app/Controller/TaskController.js";
import * as userController from "../app/Controller/userController.js";
import { AuthVerify } from "../app/middleware/authMiddleware.js";
import {updateTaskStatus} from "../app/Controller/TaskController.js";

const router = express.Router();


//USER
router.post('/registration', userController.Registration);
router.post('/login', userController.Login);
router.get('/profile-details', AuthVerify, userController.ProfileDetails);
router.put('/profile-update', AuthVerify, userController.Profile_Update);
router.delete('/profile-delete', AuthVerify, userController.ProfileDelete);

router.get('/email-verify', userController.Email_Verify);
router.post('/code-verify', userController.Code_Verify);
router.post('/passwordReset', userController.Password_Reset);


// Task Related API Endpoint
router.post('/taskCreate', AuthVerify, TaskController.createTask);
router.put('/updateTaskStatus/:id/:status', AuthVerify, TaskController.updateTaskStatus);
router.delete('/deleteTask', AuthVerify, TaskController.deleteTask);
router.get('/taskList', AuthVerify, TaskController.taskListByStatus);
router.get('/countTask', AuthVerify, TaskController.countTask);




export default router;
