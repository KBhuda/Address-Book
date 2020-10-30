import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactDetail } from 'src/app/classes/contact-detail';
import { ContactType } from 'src/app/enums/contact-type.enum';
import { ContactService } from 'src/app/services/contact.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-contact-item',
  templateUrl: './add-contact-item.component.html',
  styleUrls: ['./add-contact-item.component.css']
})
export class AddContactItemComponent implements OnInit {
    currentContactID = 0;
    public contactTypes = Object.values(ContactType);
    @ViewChild('descriptionInput', { static: false }) descriptionInputRef: ElementRef;
    @ViewChild('contactTypeInput', { static: false }) contactTypeInputRef: ElementRef;

    constructor(private router: Router, private activeRoute: ActivatedRoute, private contactSvc: ContactService) { }

    ngOnInit(): void {
        this.currentContactID = this.activeRoute.params['id'];
    }

    async onAddItem() {
        const description = this.descriptionInputRef.nativeElement.value;
        const contactType = this.contactTypeInputRef.nativeElement.value;
        const newContactDetail: ContactDetail = {
            ContactDetailId: -1,
            ContactId: this.currentContactID,
            ContactTypeId: contactType,
            Description: description
        }

        this.contactSvc.saveContactDetail(newContactDetail).toPromise();
    }

    onCancel() {
        swal.fire({
            title: 'Are you sure want to cancel?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
                this.router.navigate([`/view-contact/${ this.currentContactID }`]);
            }
          })
    }
}