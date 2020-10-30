import { Component, Input, OnInit } from '@angular/core';
import { ContactDetail } from 'src/app/classes/contact-detail';
import { ContactType } from 'src/app/enums/contact-type.enum';

@Component({
  selector: 'app-view-contact-item',
  templateUrl: './view-contact-item.component.html',
  styleUrls: ['./view-contact-item.component.css']
})
export class ViewContactItemComponent implements OnInit {
    @Input() contactDetail: ContactDetail;

    constructor() { }

    ngOnInit(): void {
    }

}
