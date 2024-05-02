const Task = require("../models/task.js");
const User = require('../models/user.js');
const {SendReminderMailer}=require("../Utils/sendEmail.js")

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTasksByUserId = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasksByStatus = async (req, res) => {
  const { status, userId } = req.params;
  try {
    const tasks = await Task.find({ type: status, createdBy: userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { type: status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const sendReminderEmails = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const tasks = await Task.find({
            type: 'IN_PROGRESS',
            deadline: { $gte: today },
            createdBy:{$ne: null},
            emailsended:false
        }).populate('createdBy');
        let x=0

        const tasksFinal=tasks.filter(t=>t.createdBy !==null)

        if(tasksFinal && tasksFinal.length !== 0){
          for (const task of tasksFinal) {
            const userEmail = task.createdBy.email;
            SendReminderMailer(userEmail, task).then(async (response)=>{
                if(x<tasks.length-1){
                    
                    const updatedTask = await Task.findByIdAndUpdate(
                      task._id,
                      { emailsended: true }
                    );                   
                  if(updatedTask) {

                    x++
                  }
                  }
                    
                    else{
                    console.log(`Email sended to ${tasksFinals} users`)
                }
            }).catch(error=> {
                console.log(`Error in sending Mail !`)
            })
    }
        }else{
            console.log("Nothing to send")
        }
       
    } catch (err) {
        console.log(`Error in sending Mail  : ${err}`);
    }
};

module.exports = {
  createTask,
  getTasksByUserId,
  getTasksByStatus,
  updateTaskStatus,
  getAllTasks,
  deleteTask,
  sendReminderEmails
};