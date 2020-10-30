import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/classes/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
    contacts: Contact[] = [];
    constructor(private contactSvc: ContactService) { }

    async ngOnInit() {
        const contacts = await this.contactSvc.getContacts().toPromise();
        this.contacts = contacts;
    }
}
