using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestBhavna.Data;

namespace TestBhavna.Models
{
    public class ContactModel
    {
        public int ContactId { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }

        public string SaveContact(ContactModel model)
        {
            string msg = "";
            eSankBakeryEntities db = new eSankBakeryEntities();

            var SaveCon = new tblcontact()
            {
                Name = model.Name,
                MobileNo = model.MobileNo,
                Email = model.Email,
                Message = model.Message,
                
            };

            db.tblcontacts.Add(SaveCon);
            db.SaveChanges();
            return msg;
        }

        public List<ContactModel> ContactList()
        {
            eSankBakeryEntities db = new eSankBakeryEntities();
            List<ContactModel> LstCon = new List<ContactModel>();
            var cont = db.tblcontacts.ToList();
            if (cont != null)
            {
                foreach (var con in cont)
                {
                    LstCon.Add(new ContactModel()
                    {
                        ContactId = con.ContactId,
                        Name = con.Name,
                        MobileNo = con.MobileNo,
                        Email = con.Email,
                        Message = con.Message,
                    });
                }
            }
            return LstCon;
        }
    }
}
