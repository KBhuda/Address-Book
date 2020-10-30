import { ContactType } from '../enums/contact-type.enum';

export class ContactDetail {
    ContactDetailId: number;
    ContactId: number;
    Description: string;
    ContactTypeId: ContactType;
}
