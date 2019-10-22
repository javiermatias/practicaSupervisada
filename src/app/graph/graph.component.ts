import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import { NodosService } from "services/nodos.service";
import { Grafo } from "app/models/grafos";
import { data, Nodo } from "app/models/nodos";
import { saveAs } from 'file-saver';
import { ShareService } from "services/share.service";

@Component({
    selector: 'cy-graph',
    templateUrl: './graph.component.html',
    styles: [`
      ng2-cytoscape {
        height: 100vh;
        float: left;
        width: 100%;
        position: relative;
    }`],
})

export class GraphComponent implements OnInit {
   
    private retrivedata: any;
    
    private input:string = 'select * from Concepto limit 10';
    private grafo: Grafo;

    private nodes: Array<data>;
    node_name: string;

    layout = {
                name: 'dagre',
                rankDir: 'LR',
                directed: true,
                padding: 0
            };

   graphData; 
    
    constructor( private nodoService : NodosService,private recibirService: ShareService  ) {
        this.nodes = new Array<data>();
        this.grafo = new Grafo();
    }

    getJsonFile(){
        this.nodoService.getJSON().subscribe(data => {
      /*       this.retrivedata=data;
            this.retrivedata.data.forEach(item => {
              
                let _nodo = new Nodo();
                _nodo.id= item["Nombre"];
                _nodo.name=item["Nombre"];               
                _nodo.weight=100;
                _nodo.colorCode="blue"
                _nodo.shapeType="roundrectangle";

                let _data = new data(_nodo);
               // console.log('nodo', entry["@rid"])
               this.nodes.push(_data);
              }); */

            this.graphData = data ;
        });
    }
 
    getGraphServer(){
        this.nodoService.getNodos().subscribe(data => {
          
            this.graphData = data ;
       
         });
    }
    getJsonServer(){
        this.nodoService.getNodos().subscribe(dato => {
            //console.log(data);
            this.retrivedata = dato;
            //console.log(dato.data[0]);
      
      /*       for (let entry of dato.data) {
                
                let _nodo = new Nodo();
                _nodo.id= entry["@rid"];
                _nodo.name=entry["Nombre"];               
                _nodo.weight=100;
                _nodo.colorCode="blue"
                _nodo.shapeType="roundrectangle";

                let _data = new data(_nodo);
               // console.log('nodo', entry["@rid"])
               this.nodes.push(_data);
            }  */
            dato.data.forEach(item => {
              
                let _nodo = new Nodo();
                _nodo.id= item["Nombre"];
                _nodo.name=item["Nombre"];               
                _nodo.weight=100;
                _nodo.colorCode="blue"
                _nodo.shapeType="roundrectangle";

                let _data = new data(_nodo);
               // console.log('nodo', entry["@rid"])
               this.nodes.push(_data);
              });




            this.grafo.nodes=this.nodes;
            //console.log(this.grafo);
            let json = this.grafo;
            this.graphData = json;
            //this.graphData = this.grafo;
            
            console.log(JSON.stringify(this.grafo));
       /*      const blob = new Blob([JSON.stringify(this.grafo)], {type : 'application/json'});
            saveAs(blob, 'abc.json'); */
         });
    }
    ngOnInit(){
       //this.getJsonServer();
        //this.getGraphServer();
        this.ejecutarQuery();
        //this.getJsonFile();
     /*    this.nodoService.getJSON().subscribe(data => {
            this.graphData = data ;
        }); */

        /* this.nodoService.getNodos().subscribe(dato => {
            //console.log(data);
            this.retrivedata = dato;
            console.log(dato.data[0]);
      
            for (let entry of dato.data) {
                
                let _nodo = new Nodo();
                _nodo.id= entry["@rid"];
                _nodo.name=entry["Nombre"];               
                _nodo.weight=100;
                _nodo.colorCode="blue"
                _nodo.shapeType="roundrectangle";

                let _data = new data(_nodo);
               // console.log('nodo', entry["@rid"])
               this.nodes.push(_data);
            } 
            this.grafo.nodes=this.nodes;
            console.log(this.grafo);
            this.graphData = JSON.stringify(this.grafo);
            //this.graphData = this.grafo;
            console.log(JSON.stringify(this.grafo));
         }); */
    /*      "@type":"d",
         "@class":"Concepto",
         "Nombre":"POO",
         "in_Tipo":[ 
            "#14:0"
         ],
         "out_BasadoEn":[ 
            "#15:0"
         ],
         "out_Define":[ 
            "#37:1"
         ],
         "@rid":"#11:0",
         "@version":4 */
     
    }
    nodeChange(event) {
        this.node_name = event;
        console.log(event);

    }

    cargar(){
        //console.log("Click en cargar");
        //this.getJsonFile();
   
            // send message to subscribers via observable subject
            this.recibirService.sendMessage('Enviado desde el padre!');
      
    
    
    }

    ejecutarQuery(){

        this.nodoService.getNodosQuery(this.input).subscribe(data => {
          
            this.graphData = data ;
       
         });
       // console.log("Click en query" + this.input);
    }

}