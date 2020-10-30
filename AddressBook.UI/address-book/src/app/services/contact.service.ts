import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../classes/contact';
import { ContactDetail } from '../classes/contact-detail';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ContactService {
    private baseUrl = 'http://localhost:8800/api/';
    selectedContact = new EventEmitter<Contact>();

    constructor(private http: HttpClient) { }

    searchContacts(searchString: string): Observable<Contact[]> {
        const headers = this.myHttpHeaders();

        return this.http.get<Contact[]>(this.baseUrl + 'SearchContacts/' + searchString, { headers })
            .pipe(
                map(responseData => {
                    const contactsArray: Contact[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            contactsArray.push({
                                BirthDate: responseData['BirthDate'],
                                ContactId: responseData['ContactId'],
                                FirstName: responseData['FirstName'],
                                Surname: responseData['Surname'],
                                UpdatedDate: responseData['UpdatedDate']
                            });
                        }
                    }
                    return contactsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    getContacts(): Observable<Contact[]> {
        const headers = this.myHttpHeaders();

        return this.http.get<Contact[]>(this.baseUrl + 'Contacts', { headers })
            .pipe(
                map(responseData => {
                    const contactsArray: Contact[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            contactsArray.push({
                                BirthDate: responseData['BirthDate'],
                                ContactId: responseData['ContactId'],
                                FirstName: responseData['FirstName'],
                                Surname: responseData['Surname'],
                                UpdatedDate: responseData['UpdatedDate']
                            });
                        }
                    }
                    return contactsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    getContactById(id: number): Observable<Contact> {
        const headers = this.myHttpHeaders();

        return this.http.get<Contact>(this.baseUrl + 'Contacts/' + id, { headers })
            .pipe(
                map(responseData => {
                    const contact: Contact = {
                        BirthDate: responseData['BirthDate'],
                        ContactId: responseData['ContactId'],
                        FirstName: responseData['FirstName'],
                        Surname: responseData['Surname'],
                        UpdatedDate: responseData['UpdatedDate']
                    };
                    return contact;
                  }),
                  catchError(errorRes => {
                    return throwError(errorRes);
                  })
            );
    }

    getContactDetailByContactId(id: number): Observable<ContactDetail[]> {
        const headers = this.myHttpHeaders();

        return this.http.get<ContactDetail>(this.baseUrl + 'ContactDetails/' + id, { headers })
            .pipe(
                map(responseData => {
                    const contactDetailsArray: ContactDetail[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            contactDetailsArray.push({
                                ContactId: responseData['ContactId'],
                                ContactDetailId: responseData['ContactDetailId'],
                                Description: responseData['Description'],
                                ContactTypeId: responseData['ContactTypeId']
                            });
                        }
                    }
                    return contactDetailsArray;
                  }),
                  catchError(errorRes => {
                    return throwError(errorRes);
                  })
            );
    }

    saveContact(contact: Contact): Observable<Contact> {
        const headers = this.myHttpHeaders();
        const requestString = this.baseUrl + 'Contacts/';
        const body = JSON.stringify(contact);

        return this.http.post(requestString, body, { headers })
            .pipe(
                map(responseData => {
                    const contact: Contact = {
                        BirthDate: responseData['BirthDate'],
                        ContactId: responseData['ContactId'],
                        FirstName: responseData['FirstName'],
                        Surname: responseData['Surname'],
                        UpdatedDate: responseData['UpdatedDate']
                    };
                    return contact;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    saveContactDetail(contactDetail: ContactDetail): Observable<ContactDetail> {
        const headers = this.myHttpHeaders();
        const requestString = this.baseUrl + 'ContactDetails';
        const body = JSON.stringify(contactDetail);

        return this.http.post(requestString, body, { headers })
            .pipe(
                map(responseData => {
                    const contactDetail: ContactDetail = {
                        ContactId: responseData['ContactId'],
                        ContactDetailId: responseData['ContactDetailId'],
                        Description: responseData['Description'],
                        ContactTypeId: responseData['ContactTypeId']
                    };
                    return contactDetail;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    editContact(id: number, contact: Contact): Observable<Contact> {
        const headers = this.myHttpHeaders();
        const requestString = this.baseUrl + 'Contacts/' + id;
        const body = JSON.stringify(contact);

        return this.http.put(requestString, body, { headers })
            .pipe(
                map(responseData => {
                    const contact: Contact = {
                        BirthDate: responseData['BirthDate'],
                        ContactId: responseData['ContactId'],
                        FirstName: responseData['FirstName'],
                        Surname: responseData['Surname'],
                        UpdatedDate: responseData['UpdatedDate']
                    };
                    return contact;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    editContactDetail(id: number, contactDetail: ContactDetail):  Observable<ContactDetail> {
        const headers = this.myHttpHeaders();
        const body = JSON.stringify(contactDetail);
        const requestString = this.baseUrl + 'ContactDetails/' + id;

        return this.http.put(requestString, body, { headers })
            .pipe(
                map(responseData => {
                    const contactDetail: ContactDetail = {
                        ContactId: responseData['ContactId'],
                        ContactDetailId: responseData['ContactDetailId'],
                        Description: responseData['Description'],
                        ContactTypeId: responseData['ContactTypeId']
                    };
                    return contactDetail;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    deleteContact(id: number): Observable<Contact> {
        const headers = this.myHttpHeaders();

        return this.http.delete<Contact>(this.baseUrl + 'Contacts/' + id, { headers })
            .pipe(
                map(responseData => {
                    const contact: Contact = {
                        BirthDate: responseData['BirthDate'],
                        ContactId: responseData['ContactId'],
                        FirstName: responseData['FirstName'],
                        Surname: responseData['Surname'],
                        UpdatedDate: responseData['UpdatedDate']
                    };
                    return contact;
                  }),
                  catchError(errorRes => {
                    return throwError(errorRes);
                  })
            );
    }

    deleteContactDetail(id: number): Observable<ContactDetail> {
        const headers = this.myHttpHeaders();

        return this.http.delete<ContactDetail>(this.baseUrl + 'ContactDetails/' + id, { headers })
            .pipe(
                map(responseData => {
                    const contactDetail: ContactDetail = {
                        ContactId: responseData['ContactId'],
                        ContactDetailId: responseData['ContactDetailId'],
                        Description: responseData['Description'],
                        ContactTypeId: responseData['ContactTypeId']
                    };
                    return contactDetail;
                  }),
                  catchError(errorRes => {
                    return throwError(errorRes);
                  })
            );
    }

    private myHttpHeaders() {
        return { 'Content-Type': 'application/json',
                                    'Accept': 'application/json' };
    }

    private handleError(error: Response | any) {
        const body = error.json();
        return throwError(error.Message || error);
    }
}
