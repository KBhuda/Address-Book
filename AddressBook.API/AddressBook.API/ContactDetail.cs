//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AddressBook.API
{
    using System;
    using System.Collections.Generic;
    
    public partial class ContactDetail
    {
        public int ContactDetailId { get; set; }
        public Nullable<int> ContactId { get; set; }
        public Nullable<int> ContactTypeId { get; set; }
        public string Description { get; set; }
    
        public virtual Contact Contact { get; set; }
        public virtual ContactType ContactType { get; set; }
    }
}
