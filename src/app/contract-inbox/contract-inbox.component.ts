import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { MatDialog } from '@angular/material/dialog';
import { ContractAlertComponent } from '../contract-alert/contract-alert.component';
import { WebSocketService } from '../services/web-socket.service';
import { Message } from '@stomp/stompjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Policy } from '../interface/policy';

@Component({
  selector: 'app-contract-inbox',
  templateUrl: './contract-inbox.component.html',
  styleUrls: ['./contract-inbox.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate(1000)
      ])
    ])
  ]
})
export class ContractInboxComponent implements OnInit {

  @Input() data: any;
  showNotification = false;

  response: Policy[] = [];

  constructor(private contractService: ContractService, private websocketService: WebSocketService, private dialog: MatDialog) { }

  getData(){
    this.contractService.getContracts().subscribe((data: Policy[]) => {
      this.response = data;
      console.log(this.response);
    });

  }

  ngOnInit(): void {
    this.getData();

    this.websocketService.setMessageCallback((message: Message) => {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 5000);
      this.getData();
    });

  }

  openAlerts(policy: Policy): void {
    this.dialog.open(ContractAlertComponent, {
      data: { alerts: policy }
    });
  }

}