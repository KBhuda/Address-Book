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
    public class ContactDetailsController : ApiController
    {
        private AddressBookEntities db = new AddressBookEntities();

        // GET: api/ContactDetails
        public IQueryable<ContactDetail> GetContactDetails()
        {
            return db.ContactDetails
                        .Include(ct => ct.ContactType);
        }

        // GET: api/ContactDetails/5
        [ResponseType(typeof(ContactDetail))]
        public IHttpActionResult GetContactDetail(int id)
        {
            ContactDetail contactDetail = db.ContactDetails
                                                .Include(cd => cd.ContactType)
                                                    .SingleOrDefault(cd => cd.ContactDetailId == id);
            if (contactDetail == null)
            {
                return NotFound();
            }

            return Ok(contactDetail);
        }

        // PUT: api/ContactDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContactDetail(int id, ContactDetail contactDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contactDetail.ContactDetailId)
            {
                return BadRequest();
            }

            db.Entry(contactDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactDetailExists(id))
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

        // POST: api/ContactDetails
        [ResponseType(typeof(ContactDetail))]
        public IHttpActionResult PostContactDetail(ContactDetail contactDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.ContactDetails.Add(contactDetail);
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ContactDetailExists(contactDetail.ContactDetailId))
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

            return CreatedAtRoute("DefaultApi", new { id = contactDetail.ContactDetailId }, contactDetail);
        }

        // DELETE: api/ContactDetails/5
        [ResponseType(typeof(ContactDetail))]
        public IHttpActionResult DeleteContactDetail(int id)
        {
            ContactDetail contactDetail = db.ContactDetails.Find(id);
            if (contactDetail == null)
            {
                return NotFound();
            }

            try
            {
                db.ContactDetails.Remove(contactDetail);
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ContactDetailExists(contactDetail.ContactDetailId))
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

            return Ok(contactDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactDetailExists(int id)
        {
            return db.ContactDetails.Count(e => e.ContactDetailId == id) > 0;
        }
    }
}