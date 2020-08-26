import { Component, OnInit, Input } from '@angular/core';
import { nodeI } from '../interfaces/Node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  
  @Input() node: nodeI;

  constructor() { }

  ngOnInit(): void {
  }

}
