console.log("chalgya kaka");

fetch("http://localhost:3000/seeresults3").then( (response) => {

    response.json().then((data) => 
    {
       console.log(data);
        var matchno=1
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
        console.log(score)
        console.log("no of Pool pool are " + noofpool)
       console.log(data)
        s="";
        var poolno=0;

      


        for(i=1;i<=noofpartinapool*noofpool;i++)
        {

            if((i-1)%noofpartinapool==0)
            {     if(i-1!=0)
                s+="</table>";
               
                poolno=poolno+1;
                s+="<h1>"+"Pool No"+poolno +"  Qualifier :"
                    element=noofpartinapool*(poolno-1)+1
                    var stupid=0;
                    var array=[];


                    while(stupid<noofpartinapool)
                    {   array[stupid]=score[element]
                        stupid++;
                        element++;

                        
                    }
                            array.sort()
                        console.log(array)

                    var countofwinners=0;
                    var winner=""
                        for(o=array.length-1;o>=array.length-qualifierno;o--)

                    {
                            for(p=noofpartinapool*(poolno-1)+1;p<=noofpartinapool*(poolno);p++)
                                if(score[p]==array[o] && used[p]==0 && score[p]!=0 )
                                {
                                    used[p]=01;
                            if(o!=array.length-qualifierno)
                            {   countofwinners++;
                                winner+=p+","
                            }
                            else
                            {   countofwinners++;
                                winner+=p;
                            }
                                break;
                                }
                    }
                    console.log("shan's winners are " , winner)
                    if(winner==""|| countofwinners!=qualifierno)
                        winner="Not yet Decided"
                    s+=winner
                    console.log("Winners are " , winner)
                    s+="</h1>"

                 s+=
                     "<table class='container' ><tr><th>Match No </th><th>Participant One </th><th>Participant Two</th><th> Participant One Score </th> <th> Participant Two Score </th><th>Winner</th></tr>"
            }

            for(j=i+1;j<=poolno*noofpartinapool;j++)
            {
                
                for(x=0;x<data.length-1;x++)
                {
                    if(Number(data[x].teamone)==Number(i) && Number(data[x].teamtwo)==Number(j))
                    {

                       s+= "<tr><td>"+matchno+"</td><td>"+i+"</td><td>"+j+"</td><td>"+data[x].scoreone+"</td><td>"+ data[x].scoretwo+"</td>"
                        matchno++  
                       if(Number(data[x].scoreone)>Number(data[x].scoretwo))
                            s+="<td>One</td></tr>"
                        else if(Number(data[x].scoreone)<Number(data[x].scoretwo))
                            s+="<td>Two</td></tr>"
                        else if(Number(data[x].scoreone)==Number(data[x].scoretwo))
                            s+="<td>Tie</td></tr>"


                        //s+=""
                         break;
                    }   


                }
                if(x==data.length-1)
                {
                     s+= "<tr><td>"+matchno+"</td><td>"+i+"</td><td>"+j+"</td><td>"+"_"+"</td><td>"+"_"+"</td><td>_</td></tr>"
                    matchno++;
                }
            }
                
            
        }
        poolno++;
 s+="</table>";
        // console.log("Last Pool no is " , poolno)
        poolno--;
       



        winner=""
            countofwinners=0

        if(Number(noofpartinapool*noofpool)!=Number(noofparticipants))
        {
            poolno++;

        s+="<h1>"+"Pool No"+poolno +"  Qualifier :"
        element=noofpartinapool*(poolno-1)+1
        var stupid=0;
        var array=[];


        while(stupid<noofparticipants%noofpartinapool)
        {   array[stupid]=score[element]
            stupid++;
            element++;

            
        }
                array.sort()
            console.log(array)
            var countofwinners=0;
            var winner=""
                for(o=array.length-1;o>=array.length-qualifierno;o--)

            {
                    for(p=noofpartinapool*(poolno-1)+1;p<=noofpartinapool*(poolno);p++)
                        if(score[p]==array[o] && used[p]==0 && score[p]!=0 )
                        {
                            used[p]=01;
                    if(o!=array.length-qualifierno)
                    {   countofwinners++;
                        winner+=p+","
                    }
                    else
                    {   countofwinners++;
                        winner+=p;
                    }
                        break;
                        }
            }
                console.log("shan's winners are " , winner)
            if(winner==""|| countofwinners!=qualifierno)
                winner="Not yet Decided"
            s+=winner
            console.log("Winners are " , winner)
            s+="</h1>"

         s+=
             "<table class='container' ><tr><th>Match No </th><th>Participant One </th><th>Participant Two</th><th> Participant One Score </th> <th> Participant Two Score </th><th>Winner</th></tr>"

    //         winner=""
    //         countofwinners=0
    //         for(o=array.length-1;o>=array.length-qualifierno;o--)

    //     {
    //             for(p=noofpartinapool*(poolno-1)+1;p<=noofparticipants;p++)
    //                 if(score[p]==array[o] && used[p]==0)
    //                 {
    //                     used[p]=01;
    //                     if(o!=array.length-qualifierno)
    //                     {   countofwinners++;
    //                         winner+=p+","
    //                     }
    //                     else
    //                     {   countofwinners++;
    //                         winner+=p;
    //                     }
    //                         break;
    //                         }
    //     }
        
    //     if(winner==""|| countofwinners!=qualifierno)
    //     winner="Not yet Decided"
    // s+=winner
    // console.log("Count Of Winners are " , countofwinners)
    
    // console.log("Winners are " , winner)
    // s+="</h1>"
        
        


    //     s+="<hr>" 
    //     s+=
    //     "<table class='container' ><tr><th>Match No </th><th>Participant One </th><th>Participant Two</th><th> Participant One Score </th> <th> Participant Two Score </th><th>Winner</th></tr>"
           
            poolno--;

        if(Number(noofpartinapool*noofpool)!=Number(noofparticipants))
        {
            for(i=noofpartinapool*noofpool+1;i<=noofparticipants;i++)
            {  
                for(j=i+1;j<=noofparticipants;j++)
                {
                    
                    for(x=0;x<data.length-1;x++)
                    {
                        if(Number(data[x].teamone)==Number(i) && Number(data[x].teamtwo)==Number(j))
                        {
    
                           s+= "<tr><td>"+matchno+"</td><td>"+i+"</td><td>"+j+"</td><td>"+data[x].scoreone+"</td><td>"+ data[x].scoretwo+"</td>"
                            matchno++  
                           if(Number(data[x].scoreone)>Number(data[x].scoretwo))
                                s+="<td>One</td></tr>"
                            else if(Number(data[x].scoreone)<Number(data[x].scoretwo))
                                s+="<td>Two</td></tr>"
                            else if(Number(data[x].scoreone)==Number(data[x].scoretwo))
                                s+="<td>Tie</td></tr>"
    
    
                            //s+=""
                             break;
                        }   
    
    
                    }
                    if(x==data.length-1)
                    {
                         s+= "<tr><td>"+matchno+"</td><td>"+i+"</td><td>"+j+"</td><td>"+"_"+"</td><td>"+"_"+"</td><td>_</td></tr>"
                        matchno++;
                    }
                }
                    
            }
        }
    }
   
     //console.log(s)
        //console.log((data[x].teamone)

    


        document.getElementById("divid").innerHTML = s;

    
        
        

    });
})  