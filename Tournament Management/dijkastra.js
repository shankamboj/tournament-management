//dijkstra solve graph starting at s
const request = require('request')

const dijk=()=>
{

function solve(graph, s) {
   var solutions = {};
   solutions[s] = [];
   solutions[s].dist = 0;
   
   while(true) {
     var parent = null;
     var nearest = null;
     var dist = Infinity;
     
     //for each existing solution
     for(var n in solutions) {
       if(!solutions[n])
         continue
       var ndist = solutions[n].dist;
       var adj = graph[n];
       //for each of its adjacent nodes...
       for(var a in adj) {
         //without a solution already...
         if(solutions[a])
           continue;
         //choose nearest node with lowest *total* cost
         var d = adj[a] + ndist;
         if(d < dist) {
           //reference parent
           parent = solutions[n];
           nearest = a;
           dist = d;
         }
       }
     }
     
     //no more solutions
     if(dist === Infinity) {
         break;
     }
     
     //extend parent's solution path
     solutions[nearest] = parent.concat(nearest);
     //extend parent's cost
     solutions[nearest].dist = dist;
   }
   
   return solutions;
 }
 //create graph
 
 
 //convert uni-directional to bi-directional graph
 // needs to look like: where: { a: { b: cost of a->b }
 // var graph = {
 //     a: {e:1, b:1, g:3},
 //     b: {a:1, c:1},
 //     c: {b:1, d:1},
 //     d: {c:1, e:1},
 //     e: {d:1, a:1},
 //     f: {g:1, h:1},
 //     g: {a:3, f:1},
 //     h: {f:1}
 // };
 
 var graph = {};
 
graph={ '2': { '3': 1, '4': 1, R: 1 },
'3': { '2': 1, '4': 1, '6': 1, '13': 1 },
'4': { '2': 1, '3': 1, '5': 1, '8': 1 },
'5': { '4': 1, '7': 1, '11': 1 },
'6': { '3': 1, '13': 1, '15': 1 },
'7': { '5': 1, '10': 1 },
'8': { '4': 1, '11': 1, '13': 1 },
'9': { '14': 1 },
'10': { '7': 1 },
'11': { '5': 1, '8': 1, '12': 1 },
'12': { '11': 1 },
'13': { '3': 1, '6': 1, '8': 1, '14': 1 },
'14': { '9': 1, '13': 1 },
'15': { '6': 1 },
R: { '2': 1 } }

//  var layout = {
//    'R': ['1,2,3,4,5,6,7,8,9,10'],
//    '2': ['1,2,3,4,5,6,7,8,9,10'],
//    '3': ['1,2,3,4,5,6,7,8,9,10'],
//    '4': ['1,2,3,4,5,6,7,8,9,10'],
//    '5': ['1,2,3,4,5,6,7,8,9,10'],
//    '6': ['1,2,3,4,5,6,7,8,9,10'],
//    '7': ['1,2,3,4,5,6,7,8,9,10'],
//    '8': ['1,2,3,4,5,6,7,8,9,10'],
//    '9': ['14'],
//    '10': [],
//    '11': ['12'],
//    '12': [],
//    '13': ['14'],
//    '14': [],
//    '15': []
//  }
 
//  for(var id in layout) {
//    if(!graph[id])
//      graph[id] = {};
//    layout[id].forEach(function(aid) {
//      graph[id][aid] = 1;
//      if(!graph[aid])
//        graph[aid] = {};
//      graph[aid][id] = 1;
//    });
//  }
//  console.log(graph)
 //choose start node
 var start = '10';
 //get all solutions
 var solutions = solve(graph, start);
 
   var dict = {
      '1': "Ambala",
        '2':"Sirsa",
        '3':"Hisar",
        '4':"Chandigarh",
        '5':"Jind",
        '6':"Delhi",
        '7':"Kurukshetra",
        '8':"Karnal",
        '9':"Panipat",
        '10':"Sonepat",
        '11':"Rohtak",
        '12':"Kaithal",
        '13':"Hansi",
        '14':"Faridabad",
        '15':"Gurugram"
    };
    
    
   var reversedict = {
      "Ambala":'1',
        "Sirsa":'2',
        "Hisar":'3',
        "Chandigarh":'4',
        "Jind":'5',
        "Delhi":'6',
        "Kurukshetra":'7',
        "Karnal":'8',
        "Panipat":'9',
        "Sonepat":'10',
        "Rohtak":'11',
       "Kaithal": '12',
       "Hansi":'13',
       "Faridabad": '14',
      "Gurugram":  '15'
    };
    console.log(dict)
    console.log(reversedict)

    console.log("From '"+start+"' to");
    //display solutions
    var s='12'
      console.log(" -> " + s + ": [" + solutions[s].join(", ") + "]   (dist:" + solutions[s].dist + ")")
    var lat={}
    var longit={}
    
      for(var i=1;i<=15;i++){
      const address=dict[ i.toString() ]
      //console.log("ADdress is " + address)
      const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhbmthbWJvaiIsImEiOiJjandpd2RqMXEwMWFlM3lxcGE4OHN4ZmgyIn0.mVuxK1czMrRMoBxLM4G1Wg'
      request({ url: geocodeURL, json: true }, (error, response) => {
         const longitude = response.body.features[0].center[0]
         const latitude = response.body.features[0].center[1]
         //console.log(latitude,longitude)
         lat[address]=latitude
          longit[address]=longitude
          
         //coord.address=[latitude,longitude]
     })
   }
   setTimeout(function(){ console.log(lat)
      console.log(longit) }, 1000);

   
      // From '10' to
 //  -> 2: [7, 5, 4, 2]   (dist:4)
 //  -> 3: [7, 5, 4, 3]   (dist:4)
 //  -> 4: [7, 5, 4]   (dist:3)
 //  -> 5: [7, 5]   (dist:2)
 //  -> 6: [7, 5, 4, 3, 6]   (dist:5)
 //  -> 7: [7]   (dist:1)
 //  -> 8: [7, 5, 4, 8]   (dist:4)
 //  -> 9: [7, 5, 4, 3, 13, 14, 9]   (dist:7)
 //  -> 10: []   (dist:0)
 //  -> 11: [7, 5, 11]   (dist:3)
 //  -> 12: [7, 5, 11, 12]   (dist:4)
 //  -> 13: [7, 5, 4, 3, 13]   (dist:5)
 //  -> 14: [7, 5, 4, 3, 13, 14]   (dist:6)
 //  -> 15: [7, 5, 4, 3, 6, 15]   (dist:6)
 //  -> R: [7, 5, 4, 2, R]   (dist:5)

   }

 module.exports=dijkastra