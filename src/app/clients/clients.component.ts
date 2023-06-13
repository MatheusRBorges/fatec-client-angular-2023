import { ClientService } from './../client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  //para iniciar o component o OnInit

  clients: Client[] = [];

  formGroupClient: FormGroup;

  isEditing: boolean = false;

  constructor(
    private ClientService: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],

      name: [''],

      email: [''],
    });
  } // para o componente chamar o serviço
  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.ClientService.getClients().subscribe({
      next: (data) => (this.clients = data), //next pega os clientes
      error: (error) => console.log('Error ao chamar o endpoint' + error),
    });
  }

  save() {  
    if (this.isEditing) {
      this.isEditing = false;

      this.ClientService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadClients();

          this.formGroupClient.reset();
        },
      });
    } else {
      this.ClientService.save(this.formGroupClient.value).subscribe({
        next: (data) => {
          this.clients.push(data);

          this.formGroupClient.reset();
        },
      });
    }
  }

  remove(client: Client): void {
    this.ClientService.remove(client).subscribe({
      next: () => {
        this.clients.splice(this.clients.indexOf(client), 1);
      },
    }); // this.ClientService.removeClient(client).subscribe({ // forma mais facil de entender //   next: () => this.loadClients() // });
  }

  edit(client: Client): void {
    this.formGroupClient.setValue(client);

    this.isEditing = true;
  }
}
