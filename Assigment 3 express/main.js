// Part1: Node Internals (3 Grades):

// 1. What is the Node.js Event Loop? (0.5 Grade)
/*
Node.js is an open-source and cross-platform JavaScript runtime environment.
event loop is the manager who manage operation(timer operation and long running operation)
 from event queue to worker threed      

 responsible for managing asynchronous operations in Node.js

*/
//____________________________________________________________________________________________
// 2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
/*
Libuv : is a multi-platform support library written in C or c++ 
that handles asynchronous, non-blocking input/output (I/O) operations in Node.js.

role in nodde.js : 
It helps Node.js handle asynchronous operations such as file system operations, 
networking, and timers without blocking the main thread.
*/
//____________________________________________________________________________________________

// 3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
/*
Node.js uses Libuv to handle asynchronous operations.
When an asynchronous operation starts, 
it is handled by the OS or Libuv's Thread Pool instead of blocking the main thread. 
When the operation finishes, 
its callback is placed in a queue, 
and the Event Loop moves it to the Call Stack when the stack is empty.
*/
//____________________________________________________________________________________________


// 4 What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
/*
The Call Stack is responsible for executing JavaScript functions. 
The Event Queue stores callbacks that are ready to be executed. 

The Event Loop continuously checks the Call Stack and Event Queue and moves callbacks 
from the queue to the Call Stack when the Call Stack is empty.
*/
//____________________________________________________________________________________________

// 5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
/*

The Node.js Thread Pool is a group of worker threads managed by Libuv. 
It is used to handle certain asynchronous operations, such as file system operations 
without blocking the main thread.

By default, the Thread Pool has 4 threads. We can change its size using


on Windows CMD  : set UV_THREADPOOL_SIZE=8 && node main.js
on power shell : $env:UV_THREADPOOL_SIZE=8; node main.js

*/
//____________________________________________________________________________________________

// 6 How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
/*

Blocking code stops the main thread until the operation is completed, 
so other operations cannot be executed during that time. 
Non-blocking code allows Node.js to continue executing other operations 
while waiting for an asynchronous operation to finish. 
Node.js uses the Event Loop and Libuv to handle non-blocking operations efficiently.

*/
//____________________________________________________________________________________________



const express = require("express");
const app =     express();
const path =    require('node:path')
const fs =       require('node:fs');


app.use(express.json());


app.post("/user",(req,res,next)=>{
    let body=req.body;


     const{id,name,age,email}=body;
            let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
          const ifUserExists = users.find(user => user.email === email);
          if(ifUserExists)
          
            {
            
           return res.status(409).json({ message: 'email already exists' });
          }
        
         const ifIdExists = users.find(user => user.id == id);
          if(ifIdExists)
          {
               return res.status(409).json({ message: 'id already exists' });
          }  
          
         
            const newUser = { id,name, age, email };
    
            users.push(newUser);
            fs.writeFileSync('users.json', JSON.stringify(users));
                return res.status(201).json({ message: 'User added successfully' });
           
})


app.get("/user",(req,res,next)=>{
    let users = fs.readFileSync('users.json', 'utf8')
      users = JSON.parse(users);
     return res.status(200).json(users);
  
})

app.delete("/user/:id",(req,res,next)=>{
    console.log(req.params)
     const {id} = req.params
          
           let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
         const userIndex = users.findIndex(user => user.id ==id );
         if(userIndex!=-1)
         
           {
   
            users.splice(userIndex, 1);
             fs.writeFileSync('users.json', JSON.stringify(users));
        
         return  res.status(200).json({message : "User Deleted Successful"})
         
         }
         else
         { 
          
           return res.status(404).json({message : "User ID is Not Found"})
          ;}
  
})


app.patch("/user/:id",(req,res,next)=>{
    console.log(req.params)
     const {id} = req.params
     const updatedData = req.body
          
          
                      const users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
          
                      const user = users.find(
                          user => user.id == id
                      );
          
          
                      if (!user) {
                        return res.status(404).json({message : "User ID is Not Found"})
                      }


                       if (updatedData?.name !== undefined) {
                user.name = updatedData.name;
            }

            if (updatedData?.age !== undefined) {
                user.age = updatedData.age;
            }

            if (updatedData?.email !== undefined) {
                const emailExists = users.find(
                   User =>  User.email == updatedData.email);

                if (emailExists && emailExists.id!=id) {
               return res.status(404).json({message : "Email already exists."})

                }

                user.email = updatedData.email;
            }
              fs.writeFileSync('users.json', JSON.stringify(users));
            
          

                 return res.status(200).json({message : "User updated successfully."})
})

app.get("/user/getByName",(req,res,next)=>{
   
     const {name=""} = req.query

   let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const UsersFilterByName = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        if(UsersFilterByName.length>0)
        
          {
         return res.status(200).json(UsersFilterByName)
        }
        else
        { 
           return res.status(400).json({message : "User name Not Found"})
         ;}

})


app.get("/user/filter",(req,res,next)=>{
   
     const {minAge} = req.query

   let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const UsersFilterByAge = users.filter(user => user.age>=minAge);
        if(UsersFilterByAge.length>0)
        
          {
         return res.status(200).json(UsersFilterByAge)
        }
        else
        { 
           return res.status(400).json({message : " User not found"})
         ;}

})

app.get("/user/:id",(req,res,next)=>{
    console.log(req.params)
     const {id} = req.params
    
   let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const ifUserExists = users.find(user => user.id ==id );
        if(ifUserExists)
        
          {
         return res.status(200).json(ifUserExists)
        }
        else
        { 
           return res.status(400).json({message : "User Not Found"})
         ;}

})







app.use((req, res) => {
    res.status(404).json({
        message: "URL or method is not correct"
    })});
app.listen(3000,()=>{})