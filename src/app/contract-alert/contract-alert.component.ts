import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemMessage } from '../interface/systemmessage';

@Component({
  selector: 'app-contract-alert',
  templateUrl: './contract-alert.component.html',
  styleUrls: ['./contract-alert.component.css']
})
export class ContractAlertComponent implements OnInit {
  
  contractNumber: string = '';
  systemMessages: SystemMessage[] = [];
  displayedColumns: string[] = ['Description', 'Severity Code'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.contractNumber = data.alerts.polNumber;
    this.systemMessages = data.alerts.systemMessages;
  }

  ngOnInit(): void {
  }

}
