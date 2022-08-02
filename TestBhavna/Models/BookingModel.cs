using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Text;
using System.IO;
using TestBhavna.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;




namespace TestBhavna.Models
{
    public class BookingModel
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public Nullable<decimal> Size { get; set; }
        public Nullable<decimal> Price { get; set; }
        public decimal TotalPrice { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public System.DateTime DeliveryDate { get; set; }
        public string DeliveryDateString { get; set; }
        public string ProductName { get; set; }



        public string SaveBooking(BookingModel model)
        {
            string msg = "save order details";
            eSankBakeryEntities db = new eSankBakeryEntities();
            var savebooking = new tblBooking()
            {
                ProductId = model.ProductId,
                Size = model.Size,
                Price = model.Price,
                TotalPrice = model.TotalPrice,
                Name = model.Name,
                MobileNo = model.MobileNo,
                City = model.City,
                Address = model.Address,
                Note = model.Note,
                DeliveryDate = model.DeliveryDate,

            };

            db.tblBookings.Add(savebooking);
            db.SaveChanges();
            string Mobile = model.MobileNo;
            string sAPIKey = "fYMsEmpZQUewatTPf0TktQ";
            string sNumber = Mobile;
            string sMessage = " Dear " + model.Name + " " + " Thank You For Your Order... ";
            string sSenderId = "BSCAKE";
            string sChannel = "trans";
            string sRoute = "8";
            string sURL = "http://mysms.msg24.in/api/mt/SendSMS?APIKEY=" + sAPIKey + "&senderid=" + sSenderId + "&channel=" + sChannel + "&DCS=0&flashsms=0&number=" + sNumber + "&text=" + sMessage + "&route=" + sRoute + "";

            string sResponse = GetResponse(sURL);
            return msg = model.Name;
        }
        public static string GetResponse(string sURL)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(sURL);
            request.MaximumAutomaticRedirections = 4;
            request.Credentials = CredentialCache.DefaultCredentials;
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream receiveStream = response.GetResponseStream();
                StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
                string sResponse = readStream.ReadToEnd();
                response.Close();
                readStream.Close();
                return sResponse;
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }


        }



        public List<BookingModel> GetList()
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<BookingModel> lstBooking = new List<BookingModel>();
            var CBooking = Db.tblBookings.ToList();
            if (CBooking != null)
            {
                foreach (var Booking in CBooking)
                {
                    lstBooking.Add(new BookingModel()
                    {

                        OrderId = Booking.OrderId,
                        ProductId = Booking.ProductId,
                        Size = Booking.Size,
                        Price = Booking.Price,
                        TotalPrice = Booking.TotalPrice,
                        Name = Booking.Name,
                        MobileNo = Booking.MobileNo,
                        City = Booking.City,
                        Address = Booking.Address,
                        Note = Booking.Note,
                        DeliveryDateString = Booking.DeliveryDate.ToString("MM/dd/yyyy"),

                    });
                }
            }
            return lstBooking;

        }
        public string Dlt(int Oid)
        {
            string Message = "";
            eSankBakeryEntities Db = new eSankBakeryEntities();
            var deleteRecord = Db.tblBookings.Where(p => p.OrderId == Oid).FirstOrDefault();
            if (deleteRecord != null)
            {
                Db.tblBookings.Remove(deleteRecord);
            };
            Db.SaveChanges();
            Message = "order Deleted Successfully";
            return Message;
        }

        public List<BookingModel> getusingsp()
        {
            eSankBakeryEntities db = new eSankBakeryEntities();
            List<BookingModel> lstPro = new List<BookingModel>();
            DataTable dtTable = new DataTable();
            using (var cmd = db.Database.Connection.CreateCommand())
            {
                db.Database.Connection.Open();

                cmd.CommandText = "ProBooking";
                cmd.CommandType = CommandType.StoredProcedure;
                DbDataAdapter da = DbProviderFactories.GetFactory("System.Data.SqlClient").CreateDataAdapter();

                da.SelectCommand = cmd;
                da.Fill(dtTable);
                db.Database.Connection.Close();
            }

            foreach (DataRow dr in dtTable.Rows)
            {
                BookingModel blmodel = new BookingModel();
                blmodel.ProductId = Convert.ToInt32(dr["ProductId"].ToString());
                blmodel.ProductName= (dr["ProductName"].ToString());
                blmodel.Name = (dr["Name"].ToString());
                blmodel.Address= (dr["Address"].ToString());
                lstPro.Add(blmodel);
            }
            return lstPro;
        }

        public List<BookingModel> usinglinq()
        {
            eSankBakeryEntities db = new eSankBakeryEntities();
            List<BookingModel> lstPro = new List<BookingModel>();
            var LinqList = from book in db.tblBookings
                            join pro in db.tblProducts on book.ProductId equals pro.ProductId
                            select new
                            {
                                book.ProductId,
                                pro.ProductName,
                                book.Name,
                                book.Address
                            };
            if (LinqList != null)
            {
                foreach (var AddProduct in LinqList)
                {
                    lstPro.Add(new BookingModel()
                    {
                        ProductId = AddProduct.ProductId,
                        Name = AddProduct.Name,
                        ProductName = AddProduct.ProductName,
                        
                    });
                }
            }
            return lstPro;
        }

    }
}
