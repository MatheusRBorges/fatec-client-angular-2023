import { ClientService } from './../client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients : Client[] = [];

  constructor (private clientService: ClientService){}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
    this.clientService.getClients().subscribe(
      {
        next : data => this.clients = data,
        error: msg  => console.log("Erro ao chamar o Endpont" + msg)
      }
    )
  }
}
