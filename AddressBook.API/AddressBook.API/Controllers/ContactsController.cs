using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AddressBook.API;

namespace AddressBook.API.Controllers
{
    public class ContactsController : ApiController
    {
        private AddressBookEntities db = new AddressBookEntities();

        // GET: api/Contacts
        public IQueryable<Contact> GetContacts()
        {
            return db.Contacts
                        .Include(cd => cd.ContactDetails)
                        .Include(ct => ct.ContactDetails.Select(c => c.ContactType));
        }

        // GET: api/SearchContacts/Someone
        [Route("SearchContacts")]
        [HttpGet]
        public IQueryable<Contact> SearchContacts(string searchString)
        {
            //string name, string surname, string cellphone
            if (!String.IsNullOrEmpty(searchString))
            {
                var searchResults = db.Contacts
                                        .Include(cd => cd.ContactDetails)
                                            .Where(c => c.FirstName.Contains(searchString) || c.Surname.Contains(searchString));

            }
            
            return db.Contacts;
        }

        // GET: api/Contacts/5
        [ResponseType(typeof(Contact))]
        public IHttpActionResult GetContact(int id)
        {
            Contact contact = db.Contacts
                                    .Include(cd => cd.ContactDetails)
                                        .SingleOrDefault(c => c.ContactId == id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // PUT: api/Contacts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContact(int id, Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            db.Entry(contact).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Contacts
        [ResponseType(typeof(Contact))]
        public IHttpActionResult PostContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Contacts.Add(contact);
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ContactExists(contact.ContactId))
                {
                    return Conflict();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                throw;
            }

            return CreatedAtRoute("DefaultApi", new { id = contact.ContactId }, contact);
        }

        // DELETE: api/Contacts/5
        [ResponseType(typeof(Contact))]
        public IHttpActionResult DeleteContact(int id)
        {
            Contact contact = db.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            try
            {
                db.Contacts.Remove(contact);
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ContactExists(contact.ContactId))
                {
                    return Conflict();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(contact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactExists(int id)
        {
            return db.Contacts.Count(e => e.ContactId == id) > 0;
        }
    }
}