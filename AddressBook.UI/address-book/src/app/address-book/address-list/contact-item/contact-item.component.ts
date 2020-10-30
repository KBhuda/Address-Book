import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactDetail } from 'src/app/classes/contact-detail';
import { ContactService } from 'src/app/services/contact.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
    @Input() contactDetail: ContactDetail;

    constructor(private router: Router, private contactSvc: ContactService) { }

    ngOnInit(): void {
    }

    onEditContactDetail(id: number) {
        this.router.navigate([`/edit-contact-item/${ id }`]);
    }

    onDelete(id: number, contactType: string) {
        swal.fire({
            title: `Are you sure want to delete this ${ contactType.toLowerCase() }?`,
            text: `You will not be able to recover this ${ contactType.toLowerCase() }!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.value) {
                const contacts = await this.contactSvc.deleteContactDetail(id).toPromise();

                swal.fire(
                    'Deleted!',
                    `${ contactType } has been deleted.`,
                    'success'
                );
            }
        });
    }
}
