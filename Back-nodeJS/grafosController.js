function conectarseBD(){

var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'admin',
   password:   'admin'
});

//Connect to 'ppr'
var db = server.use({
    name: 'PPR',
    username: 'admin',
    password: 'admin'
});

return db;
}


exports.buscar = function (req, res) {
    var db = conectarseBD();

    db.query(
        'select * from Concepto limit 10'
     ).then(function(data){
        
      
        res.json({
            data
          });
     });
 

};

exports.prueba = function (req, res) {
  var db = conectarseBD();

  db.query(
      'select * from Concepto limit 1'
   ).then(function(datos){
    
    for (let item of datos) {
      //console.log(item); // Will display contents of the object inside the array
  
      var keys = Object.keys(item);

      for(let key of keys){
        if(key.includes('in')){
          //add this object to the filtered array
          console.log(key);
          }
          if(key.includes('out')){
            //add this object to the filtered array
            console.log(key);
            }
      }

    } 
    

  
    
      res.json({
          datos
        });
   });


};


exports.buscar1 = function (req, res) {
  var db = conectarseBD();

  db.query(
      'select * from Concepto limit 1'
   ).then(function(datos){
    var nodes = [];
    var edges = [];
    //var _data = new Object();
    
    datos.forEach(function(item) {

      
      //JSON.stringify(item);
      console.log(JSON.stringify(item));
      var nodo = Nodo(); 
      var grafo = Grafo();
      //var res = str.split(" ", 1);
      nodo.id= item["Nombre"].split(" ", 1); //Para que solo tome la primer palabra
      nodo.name=item["Nombre"];  
      var keys = Object.keys(item);

      for(let key of keys){
        var llave1 = key.slice(0,3);
        var llave2 = key.slice(0,4);
        if(llave1.includes('in')){
          
         grafo.in.push(key.slice(3)); //borrar el in_
          }
          if(llave2.includes('out')){
           
            grafo.out.push(key.slice(4)); // borrar el out_
        }
      }
      grafo.nodo = nodo;
      edges.push(grafo);
      //console.log(grafo);
      nodos = {data: nodo};
      nodes.push(nodos);
      //console.log((item, index););
    });

    for (var i = 0; i <edges.length; i++) {
     
      for (var j = 0; j < edges.length; j++) {
     
        for(let edgeIn of edges[i].in){
          
          for(let edgeOut of edges[j].out){
          
              if(edgeIn==edgeOut){

                var arista = Arista(); 
                console.log("Nodo salida:" + edges[j].nodo.name);
                console.log("Nodo entrada:" + edges[i].nodo.name);
                console.log("Nombre del edge:" + edgeOut);
                
                console.log("-----------------------------------------------------------");
              }
          

          }
          

        }
     
        
     
     
     
      }
      console.log("--------------------------------------------");
   
    }
    
      res.json({
        nodes
        });
   
   
     });


};

function Nodo() {
  return {
    'id':   '',
    'name':    '',
    'weight':  100,
    'colorCode': 'blue',
    'shapeType':   'roundrectangle'
  };
};

function Grafo() {
  return {
    'in':  [],
    'out':  [],
    'nodo': '',
   
  };
};

function Arista() {
  return {
    'source': '',
    'target': '',
    'colorCode': 'blue',
    'name': '',
    'strength': 10
  };
};

/* "data": {
  "source": "a",
  "target": "b",
  "colorCode": "blue",
  "name": "Tipo",
  "strength": 10
} */

