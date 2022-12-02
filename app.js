const express = require('express');
const user= require('./models/user_model');
const Task = require('./models/task_model');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Load middleware
app.use(bodyParser.json())

//Get all users
app.get('/',(req,res)=> {
    user.find().then((result) => {
       res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
    // res.send('hi');
});
//Get all tasks of users 
app.get('/:userId/task',(req,res)=> {
    Task.find({
        _userId: req.params.userId, 
    }).then((result) => {
       res.send(result);
    }).catch((err)=>{
        res.send(err);
    })
});

//Create Users
app.post('/',(req,res)=> {
    let Username = req.body.Username;
    let email = req.body.email;
    let password = req.body.password;
    let phn_no = req.body.phn_no;
    let newUser = new user({
        Username,
        email,
        password,
        phn_no
    });
    newUser.save().then((userDoc) => {
        res.send(userDoc);
    })
});
//Create tasks of users 
app.post('/:userId/task',(req,res)=> {
    let newTask = new Task({
        title:req.body.title,
        _userId:req.params.userId,
       WorkDescription:req.body.WorkDescription,
       Completed:req.body.Completed
    });
    newTask.save().then((userDoc) => {
        res.send(userDoc);
    })
});

//For updating Users
app.patch('/:userId',(req,res)=> {
    user.findOneAndUpdate({ 
        _id: req.params.userId
    }, {
    $set: req.body          
    }).then(() => {
        // res.send(result);
        res.sendStatus(200);
    })
});
//For updating task corresponding to users
    app.patch('/:userId/task/:taskId',(req,res)=> {
        Task.findOneAndUpdate({ 
            _id: req.params.taskId,
             _userId: req.params.userId
        }, {
        $inc: req.body
        }).then((result) => {
            res.send(result);
        })
    });

//For deleting Users
app.delete('/:userId',(req,res)=> {
    user.findOneAndRemove({
         _id: req.params.userId 
    },{
         $set: req.body
        }).then((removeduserDoc) => {
            res.send(removeduserDoc);
        })
        
});
//For deleting task corresponding to users
app.delete('/:userId/task/:taskId',(req,res)=> {
    Task.findOneAndRemove({
         _id: req.params.taskId,
         _userId: req.params.userId
        }).then((removedtaskDoc) => {
            res.send(removedtaskDoc);
        })
});


/* app.get('/:userId',(req,res)=> {
     Task.findOne({
         _id: req.params.taskId,
         _userId: req.params.userId
     }).then((result) => {
        res.send(result);
     }).catch((err)=>{
         res.send(err);
    })
 });*/

//Connect to Db
mongoose.connect('mongodb://127.0.0.1:27017/Task-manager', {
 useNewUrlParser: true}, (err,client) => {
     if(!err){
     console.log("Connected to Db successfully");
     }
     else{
         console.log(err);
     }
 }
);
//Start listening the server
app.listen(3000, () => {
    console.log('Server running on port 3000')
});

