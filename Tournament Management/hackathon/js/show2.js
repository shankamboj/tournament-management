console.log("chalgya kaka");


// const resultscreen = document.getElementById("resultonscreen");
// document.getElementById("resultonscreen").innerHTML = "Hello Dolly.";


fetch("http://localhost:3000/seeresults2").then( (response) => {

    response.json().then((data) => 
    {
      //  console.log(data);

        var pool=data[data.length-1].noofpools
       // document.getElementById("poolsno").innerHTML = pool;
        
        var Participantinapool=Number((data.length-1)/pool)



        console.log("no of participants ina  pool are " + Participantinapool)
        s=""
       var poolno=0;
       for(i=0;i<data.length-1;i++)
       {
           
           if(i%Participantinapool==0)
           {
            

               if(i!=0)
                s+="</TABLE>"
                
            poolno=poolno+1;
           s+="<h1>"+"Pool No"+poolno +"</h1>"
            s+=
                "<table border=1px ><tr><th>Participant no      </th><th> Score </th> </tr>"
           }
            s+="<tr>"+"<td>"+data[i].participantno+"</td>"+
                    "<td>"+data[i].count+"</td>"+"</tr>"
       }

        console.log(s)
        document.getElementById("divid").innerHTML = s;
        
        // var s="<tr> <th> Participant No </th>  <th> Count </th>  </tr>";
        
       
   
        // for(var i=0;i<data.length-1;i++)
        // {
        //     s+="<tr> <td> "+data[i].participantno+"</td> <td> "+data[i].count+"</td></tr>";
        // }

        // document.getElementById("myP").innerHTML = s;


        

    });
})  