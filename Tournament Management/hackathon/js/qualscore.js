

fetch("http://localhost:3000/karandata").then( (response) => {

    response.json().then((data) => 
    { 
        // console.log(data);
        // console.log(data["qualifies"])  
      var x=data["qualifies"].length;
    var p=x;
      while(x%2==0)
      {
          x=x/2;
      }
      if(x==1)
      {
        data["qualifies"].sort(function (a, b) {  return a - b;  });
        var s="<table class='container'> <tr> <th> Team No </th> <th> Spot Round </th> <th> Status </th>";
        for(var i=0;i<data["qualifies"].length;i++)
        {

          s+="<tr><td>"+(data['qualifies'][i])+"</td><td>"+data["scores"][data["qualifies"][i]]/2+"</td><td>"+"Bye In Next Round</td></tr>"
                          
        }
        s+="</table>";
        document.getElementById('divid2').innerHTML=(s);

        
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
      
          var s="<table class='container'> <tr> <th> Team no </th> <th> Score </th> <th> Status </th>";
          var perfect=1;
          for(var i=0;i<count;i++)
          {
            perfect*=2;
          }
         
          var remain=2*(p-perfect);
           var dict=[]
        //    document.write("hello");
               var flag=new Array(p+3);
               for(var i=0;i<=p;i++)
               {
                    flag[i]=0;
              //  }
               }
               data["qualifies"].sort(function (a, b) {  return a - b;  });
              console.log(data["qualifies"])
               var q=new Array(remain)
            
               for(var i=0;i<remain;i++)
               {
                   var min=1000000;
                   var x=-1;
                   for(var j=0;j<p;j++)
                   {
                       if(data["scores"][data["qualifies"][j]]/2<min&&flag[data["qualifies"][j]]===0)
                       {
                           min=data["scores"][data["qualifies"][j]]/2;
                           x=data["qualifies"][j];
                        }
                    }
                    flag[x]=1;
                    q[i]=x;
                    
               }
               for(var i=0;i<q.length;i++)
         console.log(q[i],data["scores"][q[i]])
               for(var i=0;i<p;i++)
               {
                   var we=0;
                   for(var j=0;j<remain;j++)
                   {
                       if(q[j]==data["qualifies"][i])
                       {
                           we=1;
                           break;
                       }
                   }
                   if(we==1)
                   s+="<tr><td>"+(data['qualifies'][i])+"</td><td>"+data["scores"][data["qualifies"][i]]/2+"</td><td>"+"Will Play Knockout</td></tr>"
                   else
                   s+="<tr><td>"+(data['qualifies'][i])+"</td><td>"+data["scores"][data["qualifies"][i]]/2+"</td><td>"+"By In Next Round</td></tr>"
               }
               s+="</table>"
             document.getElementById('divid2').innerHTML=(s);
      }
    });
})  