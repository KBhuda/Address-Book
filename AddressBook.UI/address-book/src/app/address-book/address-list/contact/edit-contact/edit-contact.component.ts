import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/classes/contact';
import { ContactType } from 'src/app/enums/contact-type.enum';
import { ContactService } from 'src/app/services/contact.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
    currentContactID = 0;
    public contactTypes = Object.values(ContactType);
    @ViewChild('firstNameInput', { static: false }) firstNameInputRef: ElementRef;
    @ViewChild('surnameInput', { static: false }) surnameInputRef: ElementRef;
    @ViewChild('birthDateInput', { static: false }) birthDateInputRef: ElementRef;

    constructor(private router: Router, private activeRoute: ActivatedRoute, private contactSvc: ContactService) { }

    ngOnInit() {
        this.currentContactID = this.activeRoute.params['id'];
    }

    async onEditItem() {
        const firstName = this.firstNameInputRef.nativeElement.value;
        const surname = this.surnameInputRef.nativeElement.value;
        const birthDate = this.birthDateInputRef.nativeElement.value;
        const newContact: Contact = {
            ContactId: -1,
            FirstName: firstName,
            Surname: surname,
            BirthDate: birthDate,
            UpdatedDate: new Date().toUTCString()
        }

        this.contactSvc.editContact(this.currentContactID, newContact).toPromise();
    }

    onClearForm() {
        this.firstNameInputRef.nativeElement.value = '';
        this.surnameInputRef.nativeElement.value = '';
        this.birthDateInputRef.nativeElement.value = null;
    }

    onCancel() {
        swal.fire({
            title: 'Are you sure want to cancel?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
                this.router.navigate(['/view-contact']);
            }
          })
    }
}
