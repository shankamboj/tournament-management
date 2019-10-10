var data;
var one=0;
var two=2;
var x=0;
function win(i,count)
{
    var p=x;
    while(x%2==0)
    {
        x/=2;
    }
    if(x==1)
    {
 document.write("<br>")
    }
    one++;
    //  var p=x;
    document.write("<button onclick='win("+i+","+count/2+")'>"+ i  +"</button>")
x--;
}


fetch("http://localhost:3000/round2").then( (response) => {

    response.json().then((dd) => 
    {   
        data=dd
        x=data.length;    
        var i;
        var s="";
        
        for(i=0;i<data.length;i++)
        {
            s+="<button onclick='win("+data[i]+","+data.length+")'>" ;
            s+=data[i]+"</button>";
        }
        // s+="<br>"
        console.log(s)
        document.write(s);

    });
})  