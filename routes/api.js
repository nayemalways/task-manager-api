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

router.get('/email-verify/:email', userController.Email_Verify);
router.post('/code-verify', userController.Code_Verify);
router.post('/passwordReset', userController.Password_Reset);




// Task Related API Endpoint
router.post('/taskCreate', AuthVerify, TaskController.createTask);
router.put('/updateTaskStatus/:id/:status', AuthVerify, TaskController.updateTaskStatus);
router.get('/taskListByStatus/:status', AuthVerify, TaskController.taskListByStatus);
router.delete('/deleteTask/:id', AuthVerify, TaskController.DeleteTask);
router.get('/countTask', AuthVerify, TaskController.CountTaskByStatus);



// WRONG URL HITING
router.all('*', userController.WrongUrlHit);

export default router;
