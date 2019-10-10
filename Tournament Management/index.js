const path = require('path')
const express=require('express')




const publicDirectoryPath= path.join(__dirname,'./hackathon')
const app=express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongodb= require('mongodb')

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(publicDirectoryPath))
app.post('/register', function(req, res) {
var data=[];
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
     res.redirect('http://localhost:3000/index.html');
  })
});


app.post('/register', function(req, res) {
var data=[];
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
     res.redirect('http://localhost:3000/index.html');
  })
});
app.post('/createevent2', function(req, res) {
  var data=[];
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
  
    let  n=req.body.cno;
    noofpartinapool= Math.ceil(req.body.cno/req.body.noofpols)
      noofparticipants=req.body.cno
      qualifierno=req.body.qualifierno
        // console.log("Shan")
    //  console.log("No of part is " , noofparticipants)
  
    db.collection('noofpools').remove()
    


//     setTimeout(function(){   db.collection('noofpools').insertOne({noofpartinapool:noofpartinapool,noofparticipants:noofparticipants,qualifierno:qualifierno})
// },1000);
db.collection('noofpools').insertOne({noofpartinapool:noofpartinapool,noofparticipants:noofparticipants,qualifierno:qualifierno})


            db.collection('matchdata').remove()

      db.collection('createevent').remove()
      for(i=1;i<=n;i++)
      {
  db.collection('createevent').insertOne({
      participantno:i,
      count:0
  })
}
 
       res.redirect('http://localhost:3000/middle1.html');
    })
  });



app.get('/karandata',function(req,res){
  var don=[]

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

     
db.collection('matchdata').find().toArray( (error,user)=>{
     if(!user)
     {
         console.log("User Not Found")
     }
     else{
        

      db.collection('noofpools').find().toArray( (error,pooldata)=>{
        if(!user)
        {
            console.log("Pool colelction Not Found")
        }
        else{
         //  console.log(pooldata[0].noofpools)
          // noofpools=
           user[user.length]={noofpartinapool:Number(pooldata[0].noofpartinapool),noofparticipants:Number(pooldata[0].noofparticipants),qualifierno:Number(pooldata[0].qualifierno)}
        //    console.log(user)
//_____________________________________________________

var data={}
data=user




        
var noofpartinapool=data[data.length-1].noofpartinapool
var noofparticipants=data[data.length-1].noofparticipants

var noofpool=Number((noofparticipants-(noofparticipants%noofpartinapool))/noofpartinapool)
var qualifierno= data[data.length-1].qualifierno
let score=[]  
var used=[]
score[0]=0;
for(i=1;i<=noofparticipants;i++)
{           score[i]=0;
    used[i]=0;
}
for(i=0;i<data.length;i++)
{
    score[data[i].teamone]+=Number(data[i].scoreone);   //Ith element of array contains score of  ith Team
    score[data[i].teamtwo]+=Number(data[i].scoretwo);
    
}

//score.sort()
// console.log(score)


console.log("no of Pool pool are " + noofpool)
// console.log(data)
s="";
var poolno=0;




for(i=1;i<=noofpartinapool*noofpool;i++)
{

    if((i-1)%noofpartinapool==0)
    {   
       
        poolno=poolno+1;
       
            element=noofpartinapool*(poolno-1)+1
            var stupid=0;
            var array=[];


            while(stupid<noofpartinapool)
            {   array[stupid]=score[element]
                stupid++;
                element++;

                
            }       
            console.log("UnSorted aray is " ,array)
                    array.sort()
               console.log("Sorted aray is " ,array)

                

                for(o=array.length-1;o>=array.length-qualifierno;o--)

            {
                    for(p=noofpartinapool*(poolno-1)+1;p<=noofpartinapool*(poolno);p++)
                    if(score[p]==array[o] && used[p]==0  )
                        {
                            used[p]=01;
                    if(o!=array.length-qualifierno)
                    {
                       
                        don.push(p)
                    }
                        else   
                        {
                        
                        don.push(p)
                        }
                        break;
                        }
            }
        }

    for(j=i+1;j<=poolno*noofpartinapool;j++)
    {
        
        for(x=0;x<data.length-1;x++)
        {
            if(Number(data[x].teamone)==Number(i) && Number(data[x].teamtwo)==Number(j))
            {


               break;
            }

        }
      
    }
        
    
}


poolno++;

// console.log("Last Pool no is " , poolno)
poolno--;


if(Number(noofpartinapool*noofpool)!=Number(noofparticipants))
{
    poolno++;


element=noofpartinapool*(poolno-1)+1
var stupid=0;
var array=[];


while(stupid<noofparticipants%noofpartinapool)
{   array[stupid]=score[element]
    stupid++;
    element++;

    
}

          console.log("UnSorted aray is " ,array)
                    array.sort()
               console.log("Sorted aray is " ,array)
        // array.sort()
//    console.log("Sorted array for exceptional caseis " ,array)

    

    for(o=array.length-1;o>=array.length-qualifierno;o--)

{
        for(p=noofpartinapool*(poolno-1)+1;p<=noofparticipants;p++)
        if(score[p]==array[o] && used[p]==0   )
            {
                used[p]=01;
        if(o!=array.length-qualifierno)
        {
            
            don.push(p);
        }
        else
        {
           
            don.push(p);
        }
            break;
            }
}



   poolno--;


}


console.log("Don array is " , don)

var mixdata={}
mixdata["scores"]=score
mixdata["qualifies"]=don


// console.log(" MIX DATA IS " , mixdata)

//_______________________________________________________
            res.send(mixdata);
   
         
        }
       })
          // console.log(noofpools)



       
     }
    })

})
  // res.send({
  //   karan:'hello'
  // })  
})















app.get('/seeresults3',function(req,res){
  var don=[]
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

     
db.collection('matchdata').find().toArray( (error,user)=>{
     if(!user)
     {
         console.log("User Not Found")
     }
     else{
        

      db.collection('noofpools').find().toArray( (error,pooldata)=>{
        if(!user)
        {
            console.log("Pool colelction Not Found")
        }
        else{
         //  console.log(pooldata[0].noofpools)
          // noofpools=

        //   console.log("user is " ,user)
           user[user.length]={noofpartinapool:Number(pooldata[0].noofpartinapool),noofparticipants:Number(pooldata[0].noofparticipants),qualifierno:Number(pooldata[0].qualifierno)}
        //    console.log("user is " ,user)
//_____________________________________________________

var data={}
data=user




        
var noofpartinapool=data[data.length-1].noofpartinapool
var noofparticipants=data[data.length-1].noofparticipants

var noofpool=Number((noofparticipants-(noofparticipants%noofpartinapool))/noofpartinapool)
var qualifierno= data[data.length-1].qualifierno
let score=[]  
var used=[]
score[0]=0;
for(i=1;i<=noofparticipants;i++)
{           score[i]=0;
    used[i]=0;
}
for(i=0;i<data.length;i++)
{
    score[data[i].teamone]+=data[i].scoreone;   //Ith element of array contains score of  ith Team
    score[data[i].teamtwo]+=data[i].scoretwo;
    
}

//score.sort()
//console.log(score)


console.log("no of Pool pool are " + noofpool)
// console.log(data)
s="";
var poolno=0;




for(i=1;i<=noofpartinapool*noofpool;i++)
{

    if((i-1)%noofpartinapool==0)
    {   
       
        poolno=poolno+1;
       
            element=noofpartinapool*(poolno-1)+1
            var stupid=0;
            var array=[];


            while(stupid<noofpartinapool)
            {   array[stupid]=score[element]
                stupid++;
                element++;

                
            }
                    array.sort()
                // console.log(array)

                

                for(o=array.length-1;o>=array.length-qualifierno;o--)

            {
                    for(p=noofpartinapool*(poolno-1)+1;p<=noofpartinapool*(poolno);p++)
                        if(score[p]==array[o] && used[p]==0)
                        {
                            used[p]=01;
                    if(o!=array.length-qualifierno)
                    {
                       
                        don.push(p)
                    }
                        else   
                        {
                        
                        don.push(p)
                        }
                        break;
                        }
            }
                   }

    for(j=i+1;j<=poolno*noofpartinapool;j++)
    {
        
        for(x=0;x<data.length-1;x++)
        {
            if(Number(data[x].teamone)==Number(i) && Number(data[x].teamtwo)==Number(j))
            {


               break;
            }

        }
      
    }
        
    
}
poolno++;

// console.log("Last Pool no is " , poolno)
poolno--;


if(Number(noofpartinapool*noofpool)!=Number(noofparticipants))
{
    poolno++;


element=noofpartinapool*(poolno-1)+1
var stupid=0;
var array=[];


while(stupid<noofparticipants%noofpartinapool)
{   array[stupid]=score[element]
    stupid++;
    element++;

    
}
        array.sort()
    // console.log(array)

    

    for(o=array.length-1;o>=array.length-qualifierno;o--)

{
        for(p=noofpartinapool*(poolno-1)+1;p<=noofparticipants;p++)
            if(score[p]==array[o] && used[p]==0)
            {
                used[p]=01;
        if(o!=array.length-qualifierno)
        {
            
            don.push(p);
        }
        else
        {
           
            don.push(p);
        }
            break;
            }
}



   poolno--;


}


console.log("Qualifiers array is " , don)



//_______________________________________________________
            res.send(user);
   
         
        }
       })
          // console.log(noofpools)



       
     }
    })

})
  // res.send({
  //   karan:'hello'
  // })  
})



app.get('/seeresults2',function(req,res){

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

     
db.collection('createevent').find().toArray( (error,user)=>{
     if(!user)
     {
         console.log("User Not Found")
     }
     else{
        

      db.collection('noofpools').find().toArray( (error,pooldata)=>{
        if(!user)
        {
            console.log("Pool colelction Not Found")
        }
        else{
        //    console.log(pooldata[0].noofpools)
          // noofpools=
           user[user.length]={noofpools:Number(pooldata[0].noofpools)}
           console.log(user)
            res.send(user);
   
         
        }
       })
          // console.log(noofpools)



       
     }
    })

})
  // res.send({
  //   karan:'hello'
  // })  
})



app.get('/seeresults',function(req,res){

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

     
db.collection('createevent').find().toArray( (error,user)=>{
     if(!user)
     {
         console.log("User Not Found")
     }
     else{
        //console.log(user.length)
        // console.log(user)
         res.send(user);
     }
    })

})
  // res.send({
  //   karan:'hello'
  // })  
})

app.get('/round2',function(req,res){
  res.send(don);
})


app.post('/count2', function(req, res) {
  var data=[];
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
  
    let  n=Number(req.body.count);
    let pno=Number(req.body.poolnumber);
    let teamone=Number(req.body.teamone);
    let teamtwo=Number(req.body.teamtwo);
    let scoreone=Number(req.body.scoreone);
    let scoretwo=Number(req.body.scoretwo);
    
    

    console.log(pno,teamone,teamtwo)
    db.collection('matchdata').deleteOne({pno:pno,teamone:teamone,teamtwo:teamtwo})
    db.collection('matchdata').deleteOne({pno:pno,teamone:teamtwo,teamtwo:teamone})
      
    db.collection('matchdata').insert({pno:pno,teamone:teamone,teamtwo:teamtwo,scoreone:scoreone,scoretwo:scoretwo})
    db.collection('matchdata').insert({pno:pno,teamtwo:teamone,teamone:teamtwo,scoreone:scoretwo,scoretwo:scoreone})
  

    
       res.redirect('http://localhost:3000/middle1.html');
    })
  });


 app.post('/count', function(req, res) {
    var data=[];
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
    
      let  n=Number(req.body.count);
     // console.log("data type of n is " , typeof n);
      db.collection('createevent').find({participantno:n}).toArray( (error,user)=>{
        if(!user)
        {
            console.log("User Not Found")
        }
        else{
          
         // console.log("User found is " , user[0].count)
          db.collection('createevent').remove({participantno:n})
         db.collection('createevent').insert({participantno:n,count:user[0].count+1})
          
//          db.collection('createevent').update(   {participantno : n}, { $set: { participantno : n+1}})

           
           
          
      //console.log("data type of user's count is " , typeof user[0].participantno);
        }
       })
  

      // db.collection('createevent').update(
      //   {participantno : n},
      //   {$set: { participantno : "NewMartin"}});


    // db.collection('loginusers').findOne({name:req.body.email},(error,user)=>{
    //     // console.log("hi")
    //     if(error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    //     })
    //  })
         res.redirect('http://localhost:3000/middle1.html');
      })
    });



app.get('/getdata/*',function(req,res){
  res.send(data)
})
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
    db.collection('noofpools').remove()
    
db.collection('noofpools').insertOne({noofpartinapool:1,noofparticipants:1,qualifierno:1})

db.collection('matchdata').remove()
     
db.collection('register').findOne({
    email:req.body.email,
    password:req.body.password
},(error,user)=>{
     if(!user)
     {
         console.log("User Not Found")
        
         res.redirect('http://localhost:3000/index.html')
     }
     else{
         res.redirect('http://localhost:3000/middle1.html')
    console.log(user)
     }
    })

})   
});


app.get('',(req,res)=>{
    res.send('Hello Express!')
})
app.listen(3000, ()=>{
    console.log('Hello')
})



//dijkstra solve graph starting at s
const request = require('request')



// const messageOne= document.querySelector('waypoint')
// var option = document.createElement("option");
// option.text = "Kiwi";
// x.add(option);

   