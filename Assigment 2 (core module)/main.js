const path = require('node:path');
const fs = require('node:fs');
const stream = require('node:stream');
const{EventEmitter} = require('node:events');
const http = require('node:http');
const os = require('node:os');
//1 Write a function that logs the current file path and directory.(0.5 Grade)• Output Example: {File: “/home/user/project/index.js”, Dir: “/home/user/project”} it is. (0.5 Grade)
function logFilePathAndDir() {
    
    const filePath =__filename;
    const dirPath = __dirname;

    console.log("problem 1 " ,{ File: filePath, Dir: dirPath });
    return { File: filePath, Dir: dirPath };
}
logFilePathAndDir()
//-------------------------------------------------------------------------


//2 Write a function that takes a file path and returns its file name.(0.5 Grade)
function FromFilePathToFileName(FilePath) {
    console.log("problem 2 "+path.basename(FilePath));
    return path.basename(FilePath);
}
    


FromFilePathToFileName("/user/files/report.pdf")
FromFilePathToFileName(__filename)
//-------------------------------------------------------------------------


//3 Write a function that builds a path from an object (0.5 Grade)
function FromObjToPath(FileObj) {
    console.log("problem 3 "+path.format(FileObj));
    return path.format(FileObj)
}
    
FromObjToPath({ dir:"/folder", name:"app", ext:".js"})


//-------------------------------------------------------------------------


//4 Write a function that returns the file extension from a given file path.(0.5 Grade)
function FromPathToExtensionName(FilePath) {
    console.log("problem 4 "+path.extname(FilePath));
    return path.extname(FilePath);
}

FromPathToExtensionName("/docs/readme.md");
FromPathToExtensionName(__filename);


//-------------------------------------------------------------------------

//5 Write a function that parses a given path and returns its name and ext.(0.5 Grade)
function FromPathToParsesIt(FilePath) {
    console.log("problem 5  name is "+path.basename(FilePath, path.extname(FilePath))+" , ext is "+path.extname(FilePath));
    return {
        name: path.basename(FilePath, path.extname(FilePath)),
        ext: path.extname(FilePath)
    };
}

FromPathToParsesIt("/home/app/main.js");
FromPathToParsesIt(__filename);


//ممكن نعملها بردو ب (path.parse(FilePath).name,path.parse(FilePath).ext);


//-------------------------------------------------------------------------


//6 Write a function that checks whether a given path is absolute.(0.5 Grade)
function CheakIsAbsoluteOrNo(FilePath) {
    filePath = path.normalize(FilePath);
    console.log("problem 6  path is absolute : "+path.isAbsolute(FilePath));
    return path.isAbsolute(FilePath);
}
CheakIsAbsoluteOrNo("./home/user/file.txt");
CheakIsAbsoluteOrNo("/home/user/file.txt");
CheakIsAbsoluteOrNo("home/user/file.txt");
CheakIsAbsoluteOrNo(__filename);
//-------------------------------------------------------------------------



//7 Write a function that joins multiple segments (0.5 Grade)
function JoinPathSegments(...segments) {
    console.log("problem 7  joined path is "+path.join(...segments));
    return path.join(...segments);
}
JoinPathSegments("src","components", "App.js");
//-------------------------------------------------------------------------


//8 Write a function that resolves a relative path to an absolute one.(0.5 Grade)
function ResolveRelativePathToAbsPath(RelativePath) {
    console.log("problem 8  resolved path is "+path.resolve(RelativePath));
    return path.resolve(RelativePath);
}
ResolveRelativePathToAbsPath("./index.js");
//-------------------------------------------------------------------------


//9 Write a function that joins two paths.(0.5 Grade)
function JoinTwoPaths(path1, path2) {
    console.log("problem 9  joined path is "+path.join(path1, path2));
    return path.join(path1, path2);
}
JoinTwoPaths("/folder1", "folder2/file.txt");
//-------------------------------------------------------------------------


//10 Write a function that deletes a file asynchronously.(0.5 Grade)
function DeleteFileAsync() {
    if (!fs.existsSync(path.join(__filename,"../TestdeletedFile.js"))) 
        {
       console.log("problem 10  file does not exist, cannot delete");
  return;
    }
      
    
  
    fs.unlink(path.join(__dirname,"/TestdeletedFile.js"), (err) => {
        if (err) {
            console.log("Error deleting file:", err.message);
            return;
        }

        console.log(`${path.basename(filePath)} is deleted.`);
    });
}

DeleteFileAsync();

//كنت عامل file TestdeletedFile.js و بعدين مسحتو و عملتلو delete 


/*  Another way to delete a file asynchronously using fs.unlink() method and handle Errors:
 const filePath = path.join(__dirname, 'TestdeletedFile.js');
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully.');
        }
    });

*/ 



//-------------------------------------------------------------------------




// 11 Write a function that creates a folder synchronously.(0.5 Grade)
function CreateFolderSync(folderPath) {
    fs.mkdirSync(folderPath, { recursive: true })
     console.log("problem 11  folder created successfully or not created because it already exists");
}
CreateFolderSync(path.join(__dirname, 'newFolder/subFolder'));
//-------------------------------------------------------------------------


// 12 Create an event emitter that listens for a "start" event and logs a welcome message.(0.5 Grade)
let Problem12EventEmitter = new EventEmitter();
Problem12EventEmitter.on('start', () => {
    console.log("problem 12  Welcome event triggered!");
});
Problem12EventEmitter.emit('start');
//-------------------------------------------------------------------------



// 13 Emit a custom "login" event with a username parameter.(0.5 Grade)
let Problem13EventEmitter = new EventEmitter();
Problem13EventEmitter.on('Login', (username) => {
    console.log("problem 13  User logged in: " + username);
});
Problem13EventEmitter.emit('Login','Abdelrahman Emad');
//-------------------------------------------------------------------------


// 14 Read a file synchronously and log its contents.(0.5 Grade)


try {
    let fileContentProblem14 = fs.readFileSync('notes.txt', 'utf8');
console.log("problem 14  File contents: " + fileContentProblem14);
}
catch (err) {
    console.error("problem 14  Error reading file:", err);
}
//-------------------------------------------------------------------------

// 15 Write asynchronously to a file.(0.5 Grade)



    fs.writeFile('async.txt', "Async save2", (err) => {
        console.log("problem 15 is Done (Write asynchronously to a file) ")
        if (err) {
            console.error("problem 15 p2  Error writing file:", err);
        } 
    });
//-------------------------------------------------------------------------



// 16 Check if a directory exists. (0.5 Grade) 

let dirPathProblem16 = path.join(__dirname, 'newFolder');
if (fs.existsSync(dirPathProblem16)) {
    console.log("problem 16  Directory exists. true");
} else {
    console.log("problem 16  Directory does not exist. false");
}


//-------------------------------------------------------------------------


// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)

function GetOSPlatformAndCPUArch() {
    const platform = os.platform();
    const arch = os.arch();
    console.log("problem 17  OS Platform: " + platform + ", CPU Architecture: " + arch);
    return { platform, arch };
}
GetOSPlatformAndCPUArch()

//-------------------------------------------------------------------------


// FOR ME Write a function that returns the total and free memory of the system. (0.5 Grade)

/*function GetSystemMemoryInfo() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    console.log("problem 18  Total Memory: " + totalMemory + ", Free Memory: " + freeMemory);
    return { totalMemory, freeMemory };
}
GetSystemMemoryInfo()*/

//-------------------------------------------------------------------------

// 18 Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)

let readableStream=fs.createReadStream('notes.txt', {encoding: 'utf8', highWaterMark: 3}); // 3 Byte chunk size
readableStream.on('data', (chunk) => {
    console.log("______________________________________________________________");
    console.log("problem 18  Read chunk: " , chunk);
     console.log("______________________________________________________________");
}).on('end', () => {
    console.log("problem 18  Stream ended.");
}).on('error', (err) => {
    console.error("problem 18  Error reading stream:", err);
}   );  
//-------------------------------------------------------------------------



// 19 Use readable and writable streams to copy content from one file to another. (0.5 Grade)
let readableStreamProb19=fs.createReadStream('notes.txt', {encoding: 'utf8', highWaterMark: 3}); // 3 Byte chunk size
let writableStream=fs.createWriteStream('dest.txt', {encoding: 'utf8'});
console.log("problem 19  Copying content from notes.txt to ./dest.txt...");
readableStream.pipe(writableStream);
//-------------------------------------------------------------------------


// 20 Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
let zlib = require('node:zlib');
let readableStreamProb20=fs.createReadStream('notes.txt', {encoding: 'utf8', highWaterMark: 3});
let writableStreamProb20=fs.createWriteStream('notes.txt.gz');
let gzip = zlib.createGzip();
console.log("problem 20  Compressing notes.txt to notes.txt.gz...");
readableStreamProb20.pipe(gzip).pipe(writableStreamProb20); 
//-------------------------------------------------------------------------

http.createServer((req, res) => {
if (req.url === '/users'&& req.method === 'GET') {
    let users = fs.readFileSync('users.json', 'utf8')
    users = JSON.parse(users);
 console.log("problem 21  users.json content: " , users);
    res.writeHead(200, { 'Content-Type': 'application/json' });
   return res.end(JSON.stringify(users));
}



else if (req.url === '/users' && req.method === 'POST') {
    let body = '';  
    req.on('data', chunk => {
        body += chunk;
      
    });
    req.on('end', () => {
        body=JSON.parse(body.toString());
       const{id,name,age,email}=body;
        let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
      const ifUserExists = users.find(user => user.email === email);
      if(ifUserExists)
      
        {
        res.writeHead(409, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify({ message: 'User already exists' }));
      }
    
     const ifIdExists = users.find(user => user.id == id);
      if(ifIdExists)
      {
        res.writeHead(409, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify({ message: 'there is User has Already Take this Id' }));
      }  
      
     
        const newUser = { id,name, age, email };

        users.push(newUser);
        fs.writeFileSync('users.json', JSON.stringify(users));
         res.writeHead(201, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify({ message: 'User added successfully' }));
    
     

    
       
    }
 )
}



else if (req.url.startsWith('/getUserById') && req.method === 'GET') {
   

       let URL = req.url.split("/")
       let userId = URL[URL.length-1]
       
        let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
      const ifUserExists = users.find(user => user.id ==userId );
      if(ifUserExists)
      
        {
        res.writeHead(200, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify(ifUserExists));
      }
      else
      { res.writeHead(400, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify({message : "User Is Not Found"}))
       ;}
}


else if (req.url.startsWith('/user') && req.method === 'DELETE') {
   

       let URL = req.url.split("/")
       let userId = URL[URL.length-1]
       
        let users =JSON.parse(fs.readFileSync('users.json', 'utf8'));
      const userIndex = users.findIndex(user => user.id ==userId );
      if(userIndex!=-1)
      
        {

         users.splice(userIndex, 1);
          fs.writeFileSync('users.json', JSON.stringify(users));
        res.writeHead(200, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify({message : "User Deleted Successful"}));
      }
      else
      { res.writeHead(404, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify({message : "User ID is Not Found"}))
       ;}
}



else if (req.method === "PATCH" && req.url.startsWith("/user")) {

               let updatedData = '';  
    req.on('data', chunk => {
       updatedData += chunk;
      
    });

             let URL = req.url.split("/")
     

            const id = Number(
                URL[URL.length-1]
            );


            const users =JSON.parse(fs.readFileSync('users.json', 'utf8'));

            const user = users.find(
                user => user.id == id
            );


            if (!user) {

                res.writeHead(404, { 'Content-Type': 'application/json' });
               return res.end(JSON.stringify({message : "User ID is Not Found"}));

            }


        
  req.on('end', () => {
    updatedData = JSON.parse(updatedData)
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
             res.writeHead(404, { 'Content-Type': 'application/json' });
               return res.end(JSON.stringify({message : "Email already exists."}));

                }

                user.email = updatedData.email;
            }


            fs.writeFileSync('users.json', JSON.stringify(users));

 res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({ message: 'User updated successfully.' }));
            
  })

       

        }




else
{
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({ message: 'URL or methoude is Not Correct' }));}
}).listen(5050, () => {
    console.log('Server is running on http://localhost:5050');
}   )
