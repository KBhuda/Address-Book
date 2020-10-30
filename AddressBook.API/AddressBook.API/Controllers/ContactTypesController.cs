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
    public class ContactTypesController : ApiController
    {
        private AddressBookEntities db = new AddressBookEntities();

        // GET: api/ContactTypes
        public IQueryable<ContactType> GetContactTypes()
        {
            return db.ContactTypes;
        }

        // GET: api/ContactTypes/5
        [ResponseType(typeof(ContactType))]
        public IHttpActionResult GetContactType(int id)
        {
            ContactType contactType = db.ContactTypes
                                            .SingleOrDefault(ct => ct.ContactTypeId == id);
            if (contactType == null)
            {
                return NotFound();
            }

            return Ok(contactType);
        }

        // PUT: api/ContactTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContactType(int id, ContactType contactType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contactType.ContactTypeId)
            {
                return BadRequest();
            }

            db.Entry(contactType).State = EntityState.Modified;

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

        // POST: api/ContactTypes
        [ResponseType(typeof(ContactType))]
        public IHttpActionResult PostContactType(ContactType contactType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.ContactTypes.Add(contactType);
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ContactTypeExists(contactType.ContactTypeId))
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

            return CreatedAtRoute("DefaultApi", new { id = contactType.ContactTypeId }, contactType);
        }

        // DELETE: api/ContactTypes/5
        [ResponseType(typeof(ContactType))]
        public IHttpActionResult DeleteContactType(int id)
        {
            ContactType contactType = db.ContactTypes.Find(id);
            if (contactType == null)
            {
                return NotFound();
            }
            
            try
            {
                db.ContactTypes.Remove(contactType);
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ContactTypeExists(contactType.ContactTypeId))
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

            return Ok(contactType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactTypeExists(int id)
        {
            return db.ContactTypes.Count(e => e.ContactTypeId == id) > 0;
        }
    }
}