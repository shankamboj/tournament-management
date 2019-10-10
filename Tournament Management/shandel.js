const path = require('path')
const express=require('express')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const publicDirectoryPath= path.join(__dirname,'./hackathon')
const app=express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongodb= require('mongodb')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(publicDirectoryPath))
app.post('/register', function(req, res) {
    //console.log("hi")
    const MongoClient= mongodb.MongoClient
    const connectionURL= 'mongodb://127.0.0.1:27017'
    const databaseName = 'login-manager'
    MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>
    {
    if(error)
    {
        return console.log("Unable to connect to database")
    }
    const db = client.db(databaseName)

db.collection('register').insertOne({
    email:req.body.email,
    password:req.body.password
})
// db.collection('loginusers').findOne({name:req.body.email},(error,user)=>{
//     // console.log("hi")
//     if(error) {
//         return console.log('Unable to fetch')
//     }
//     console.log(user)
//     })
//  })

  })
});
app.post('/myaction', function(req, res) {
    const MongoClient= mongodb.MongoClient
    const connectionURL= 'mongodb://127.0.0.1:27017'
    const databaseName = 'login-manager'
    MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>
    {
    if(error)
    {
        return console.log("Unable to connect to database")
    }
    const db = client.db(databaseName)

     
db.collection('loginusers').findOne({
    email:req.body.email,
    password:req.body.password
},(error,user)=>{
     if(error)
     {
         console.log("User Not Found")
     }
     else{
    console.log(user)
     }
}
    )
}
);
// db.collection('loginusers').findOne({name:req.body.email},(error,user)=>{
//     // console.log("hi")
//     if(error) {
//         return console.log('Unable to fetch')
//     }
//     console.log(user)
//     })
//  })

app.get('',(req,res)=>{
    res.send('Hello Express!')
})
app.listen(3000, ()=>{
    console.log('Hello')
})
