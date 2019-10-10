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
    console.log("COllected TO Database")
})

function fxn()
{
    var dropdown = document.getElementById("colors");
    var opt = document.createElement("option"); 
    opt.text = 'something';
    opt.value = 'somethings value';
    dropdown.options.add(opt);
}