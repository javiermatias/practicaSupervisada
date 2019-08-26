import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import { NodosService } from "services/nodos.service";

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
   

    node_name: string;

    layout = {
                name: 'dagre',
                rankDir: 'LR',
                directed: true,
                padding: 0
            };

   graphData; 
    
    constructor( private nodoService : NodosService  ) {
        
    }

    ngOnInit(){
        this.nodoService.getJSON().subscribe(data => {
            this.graphData = data ;
        });
    }
    nodeChange(event) {
        this.node_name = event;
    }



}