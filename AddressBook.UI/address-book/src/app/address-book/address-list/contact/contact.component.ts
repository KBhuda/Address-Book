import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/classes/contact';
import { ContactService } from 'src/app/services/contact.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    @Input() contact: Contact;

    constructor(private router: Router, private contactSvc: ContactService) { }

    ngOnInit(): void {
    }

    onSelected(id: number) {
        this.router.navigate([`/view-contact/${ id }`]);
    }

    onDelete(id: number) {
        swal.fire({
            title: 'Are you sure want to delete this contact?',
            text: 'You will not be able to recover this contact!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.value) {
                const contacts = await this.contactSvc.deleteContact(id).toPromise();

                swal.fire(
                    'Deleted!',
                    'Contact has been deleted.',
                    'success'
                );
            }
        });
    }
}
