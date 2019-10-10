const mongodb= require('mongodb')
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

// db.collection('users').insertOne({
//     name:'Sheru',
//     age:12
// })
db.collection('users').findOne({name:'Sheru'},(error,user)=>{
    // console.log("hi")
    if(error) {
        return console.log('Unable to fetch')
    }
    console.log(user)
    })
 })
