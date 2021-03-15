const port = 3000;
const host = 'localhost';
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

var task = ["Task 1","Task 2"];
app.post('/addtask',(req,res)=>{
    var newTask = req.body.newtask;
    console.log(newTask);
    if(typeof newTask === "string")
    {
        if(!newTask.trim())
        {
            console.log("empty");
        }
        else
            task.push(newTask);
    }
    res.redirect('/');
})
app.get('/',(req,res)=>{
    res.render("index",{task:task});
})

app.post('/removetask',(req,res)=>{
    var complete = req.body.check;
    //console.log(complete);
    // if(complete === " ")
    // {
    //     console.log("empty");   
    // }
    if(typeof complete === "string")
    {
        console.log("str");
        task.splice(task.indexOf(complete),1);
    }
    else if(typeof complete === "object")
    {
        console.log("obj");
        for(var i=0;i<complete.length;i++)
        {
            task.splice(task.indexOf(complete[i]),1);
        }
    }
    res.redirect('/');
})

app.listen(port,host,()=>{
    console.log(`server is listening at http://${host}:${port}`);
})