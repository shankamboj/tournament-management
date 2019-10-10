

fetch("http://localhost:3000/karandata").then( (response) => {

    response.json().then((data) => 
    { 
        console.log(data);
        console.log(data["qualifies"])  
      var x=data["qualifies"].length;
    var p=x;
      while(x%2==0)
      {
          x=x/2;
      }
      if(x==1)
      {
        var s="<table class='container'> <tr> <th> Team  </th> <th> Score </th> <th> Spot round </th>";
        for(var i=0;i<data["qualifies"].length;i++)
        {

            s+="<tr> <td> " + (i+1) + " </td> <td> No </td> </tr>" ;
           
        }
        s+="</table>";
        document.write(s);
        
      }
      else
      {
    
          var count=0;
          var no=p;
        //    document.write(p);
          while(p!=1)
          {
             count++;
             p=Math.floor(p/2);
            //  document.write(p);
          }
           p=no;
      
          var s="<table class='container'> <tr> <th> Team </th> <th> Score </th> <th> Staus </th>";
          var perfect=1;
          for(var i=0;i<count;i++)
          {
            perfect*=2;
          }
         
          var remain=2*(p-perfect);
           var dict=[]
        //    document.write("hello");
               var flag=new Array(p);
               for(var i=0;i<p;i++)
               {
                    flag[i]=0;
               }
               
               var q=new Array(remain)
            
               for(var i=0;i<remain;i++)
               {
                   var min=1000000;
                   var x=-1;
                   for(var j=0;j<p;j++)
                   {
                       if(data["scores"][data["qualifies"][j]]<min&&flag[data["qualifies"][j]]===0)
                       {
                           min=data["scores"][data["qualifies"][j]];
                           x=data["qualifies"][j];
                        }
                    }
                    flag[x]=1;
                    q[i]=x;
                    
               }
               for(var i=0;i<p;i++)
               {
                   var we=0;
                   for(var j=0;j<remain;j++)
                   {
                       if(q[j]==i)
                       {
                           we=1;
                           break;
                       }
                   }
                   if(we==1)
                   s+="<tr><td>"+(i+1)+"</td><td>"+data["scores"][i]+"</td><td>"+"Yes</td></tr>"
                   else
                   s+="<tr><td>"+(i+1)+"</td><td>"+data["scores"][i]+"</td><td>"+"No</td></tr>"
               }
               s+="</table>"
               document.getElementById("divid2  ").innerHTML = s;
      }
    });
})  