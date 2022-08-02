using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestBhavna.Data;

namespace TestBhavna.Models
{
    public class OrderModel
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Type { get; set; }
        public string Flavour { get; set; }
        public string Size { get; set; }
        public decimal Amount { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public System.DateTime Delivery { get; set; }
        public string Img { get; set; }

        public string DString { get; set; }
        public string SaveOrder(OrderModel model)
        {
            string msg = "save order details";
            eSankBakeryEntities db = new eSankBakeryEntities();
            var saveorder = new tblOrder()
            {
                ProductId = model.ProductId,
                Name = model.Name,
                Mobile = model.Mobile,
                Type = model.Type,
                Flavour = model.Flavour,
                Size = model.Size,
                Amount = model.Amount,
                Address = model.Address,
                Note = model.Note,
                Delivery = model.Delivery,
                Img = model.Img,
            };

            db.tblOrders.Add(saveorder);
            db.SaveChanges();
            return msg;
        }


        public List<OrderModel> GetList()
        {
            eSankBakeryEntities db = new eSankBakeryEntities();
            List<OrderModel> OrderList = new List<OrderModel>();
            var Order = db.tblOrders.ToList();
            if (Order != null)
            {
                foreach (var Odr in Order)
                {
                    OrderList.Add(new OrderModel()
                    {
                        OrderId = Odr.OrderId,
                        ProductId = Odr.ProductId,
                        Name= Odr.Name,
                        Mobile= Odr.Mobile,
                        Type= Odr.Type,
                        Flavour = Odr.Flavour,
                        Size = Odr.Size,
                        Amount= Odr.Amount,
                        Address=Odr.Address,
                        Note= Odr.Note,
                        DString= Odr.Delivery.ToString("MM/dd/yyyy"),
                    });
                }
            }
            return OrderList;
        }
    }
}