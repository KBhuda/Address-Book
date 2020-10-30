import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/classes/contact';
import { ContactType } from 'src/app/enums/contact-type.enum';
import { ContactService } from 'src/app/services/contact.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
    public contactTypes = Object.values(ContactType);
    @ViewChild('firstNameInput', { static: false }) firstNameInputRef: ElementRef;
    @ViewChild('surnameInput', { static: false }) surnameInputRef: ElementRef;
    @ViewChild('birthDateInput', { static: false }) birthDateInputRef: ElementRef;

    constructor(private router: Router, private contactSvc: ContactService) { }

    ngOnInit(): void {
    }

    async onAddItem() {
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

        this.contactSvc.saveContact(newContact).toPromise();
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
                this.router.navigate(['']);
            }
          })
    }
}
