import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    collapsed = true;
    @ViewChild('searchInput', { static: false }) searchInputRef: ElementRef;

    constructor(private contactSvc: ContactService) { }

    ngOnInit(): void {
    }

    downloadFile(event: any) {
        
    }

    searchContact() {
        this.contactSvc.searchContacts(this.searchInputRef.nativeElement.value).toPromise();
    }
}
