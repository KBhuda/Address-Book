import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';
import { AddContactItemComponent } from './address-book/address-list/contact-item/add-contact-item/add-contact-item.component';
import { ContactItemComponent } from './address-book/address-list/contact-item/contact-item.component';
import { EditContactItemComponent } from './address-book/address-list/contact-item/edit-contact-item/edit-contact-item.component';
import { ViewContactItemComponent } from './address-book/address-list/contact-item/view-contact-item/view-contact-item.component';
import { AddContactComponent } from './address-book/address-list/contact/add-contact/add-contact.component';
import { ContactComponent } from './address-book/address-list/contact/contact.component';
import { EditContactComponent } from './address-book/address-list/contact/edit-contact/edit-contact.component';
import { ViewContactComponent } from './address-book/address-list/contact/view-contact/view-contact.component';


const routes: Routes = [
    { path: '', component: AddressBookComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'add-contact', component: AddContactComponent },
    { path: 'view-contact', component: ViewContactComponent },
    { path: 'view-contact/:id', component: ViewContactComponent },
    { path: 'edit-contact/:id', component: EditContactComponent },
    // { path: 'contact-item', component: ContactItemComponent },
    { path: 'add-contact-item', component: AddContactItemComponent },
    { path: 'view-contact-item', component: ViewContactItemComponent },
    { path: 'view-contact-item/:id', component: ViewContactItemComponent },
    { path: 'edit-contact-item', component: EditContactItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
