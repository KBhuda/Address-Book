import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { AddressListComponent } from './address-book/address-list/address-list.component';
import { ContactItemComponent } from './address-book/address-list/contact-item/contact-item.component';
import { ContactComponent } from './address-book/address-list/contact/contact.component';
import { ViewContactComponent } from './address-book/address-list/contact/view-contact/view-contact.component';
import { EditContactComponent } from './address-book/address-list/contact/edit-contact/edit-contact.component';
import { AddContactComponent } from './address-book/address-list/contact/add-contact/add-contact.component';
import { AddContactItemComponent } from './address-book/address-list/contact-item/add-contact-item/add-contact-item.component';
import { EditContactItemComponent } from './address-book/address-list/contact-item/edit-contact-item/edit-contact-item.component';
import { ViewContactItemComponent } from './address-book/address-list/contact-item/view-contact-item/view-contact-item.component';
import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddressBookComponent,
    AddressListComponent,
    ContactItemComponent,
    ContactComponent,
    ViewContactComponent,
    EditContactComponent,
    AddContactComponent,
    AddContactItemComponent,
    EditContactItemComponent,
    ViewContactItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
