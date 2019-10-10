console.log("chalgya kaka");


// const resultscreen = document.getElementById("resultonscreen");
// document.getElementById("resultonscreen").innerHTML = "Hello Dolly.";


fetch("http://localhost:3000/seeresults2").then( (response) => {

    response.json().then((data) => 
    {
        console.log(data);
        var s="<tr> <th> Participant No </th>  <th> Count </th>  </tr>";
        
       
   
        for(var i=0;i<data.length;i++)
        {
            s+="<tr> <td> "+data[i].participantno+"</td> <td> "+data[i].count+"</td></tr>";
        }
        document.getElementById("myP").innerHTML = s;


        

    });
})  