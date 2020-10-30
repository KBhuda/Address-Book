import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/classes/contact';
import { ContactDetail } from 'src/app/classes/contact-detail';
import { ContactType } from 'src/app/enums/contact-type.enum';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
    currentUserID = 0;
    ContactTypes: ContactType;
    contact: Contact;
    contactDetails: ContactDetail[] = [];

    constructor(private activeRoute: ActivatedRoute, private contactSvc: ContactService) { }

    async ngOnInit() {
        this.currentUserID = this.activeRoute.snapshot.params.id;
        this.contact = await this.contactSvc.getContactById(this.currentUserID).toPromise();
        this.contactDetails = await this.contactSvc.getContactDetailByContactId(this.currentUserID).toPromise();
    }

}
