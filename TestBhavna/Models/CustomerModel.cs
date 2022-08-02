using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestBhavna.Data;

namespace TestBhavna.Models
{
    public class CustomerModel
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string City { get; set; }
        public string Pincode { get; set; }
        public string Address { get; set; }


       

        public List<CustomerModel> GetList()
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<CustomerModel> lstBooking = new List<CustomerModel>();
            var CustomerModel = Db.tbl_Customer.ToList();
            if (CustomerModel != null)
            {
                foreach (var Customer in CustomerModel)
                {
                    lstBooking.Add(new CustomerModel()
                    {

                        CustomerId = Customer.CustomerId,
                        CustomerName = Customer.CustomerName,
                        Email = Customer.Email,
                        MobileNo = Customer.MobileNo,
                        City = Customer.City,
                        Pincode = Customer.Pincode,
                        Address = Customer.Address,

                    });
                }
            }
            return lstBooking;

        }
    }
}
    