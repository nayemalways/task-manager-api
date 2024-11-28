import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        status: {type: String,  default: "new"},
        user_id: {type: mongoose.Schema.Types.ObjectId, required: true}
    },

    {
        timestamps: true,
        versionKey: false
    }
);

const TaskModel =  mongoose.model("tasks", TaskSchema);


export default TaskModel;