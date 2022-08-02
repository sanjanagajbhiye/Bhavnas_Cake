using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestBhavna.Data;
using System.IO;

namespace TestBhavna.Models
{
    public class CustEventModel
    {
        public int EventId { get; set; }
        public string CustomerName { get; set; }
        public string MobileNo { get; set; }
        public string WhatsAppNo { get; set; }
        public string EventType { get; set; }
        public System.DateTime EventDate { get; set; }

        public string EveDate { get; set; }
        public string photo { get; set; }

        //public string SaveCustEvent(CustEventModel model)
        //{
        //    string msg = "";
        //    eSankBakeryEntities db = new eSankBakeryEntities();

        //    var saveCustEvent = new tblCustomerEvent()
        //    {

        //        CustomerName = model.CustomerName,
        //        MobileNo = model.MobileNo,
        //        WhatsAppNo = model.WhatsAppNo,
        //        EventType = model.EventType,
        //        EventDate = model.EventDate,
        //    };

        //    db.tblCustomerEvents.Add(saveCustEvent);
        //    db.SaveChanges();
        //    return msg;
        //}

        //public List<CustEventModel> GetEventList()
        //{
        //    eSankBakeryEntities db = new eSankBakeryEntities();
        //    List<CustEventModel> EventList = new List<CustEventModel>();
        //    var Event = db.tblCustomerEvents.ToList();
        //    if (Event != null)
        //    {
        //        foreach (var Eve in Event)
        //        {
        //            EventList.Add(new CustEventModel()
        //            {
        //                EventId = Eve.EventId,
        //                CustomerName = Eve.CustomerName,
        //                MobileNo= Eve.MobileNo,
        //                WhatsAppNo= Eve.WhatsAppNo,
        //                EventType= Eve.EventType,
        //                EveDate= Eve.EventDate.ToString("dd/mm/yyyy"),
        //            });
        //        }
        //    }
        //    return EventList;
        //}
        public string SaveCustEvent(HttpPostedFileBase fb, CustEventModel model)
        {
            string msg = "";
            eSankBakeryEntities db = new eSankBakeryEntities();
            string filePath = "";
            string fileName = "";
            string sysFileName = "";

            if (fb != null && fb.ContentLength > 0)
            {

                //filePath = HttpContext.Current.Server.MapPath("~/Content/Pages/img/");
                filePath = HttpContext.Current.Server.MapPath("~/Content/img/");
                DirectoryInfo di = new DirectoryInfo(filePath);
                if (!di.Exists)
                {
                    di.Create();
                }
                fileName = fb.FileName;
                sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb.FileName);
                fb.SaveAs(filePath + "//" + sysFileName);
                if (!string.IsNullOrWhiteSpace(fb.FileName))
                {
                    string afileName = HttpContext.Current.Server.MapPath("~/Content/img/") + "/" + sysFileName;

                }
            }


            var saveCustEvent = new tblCustomerEvent
            {

                CustomerName = model.CustomerName,
                MobileNo = model.MobileNo,
                WhatsAppNo = model.WhatsAppNo,
                EventType = model.EventType,
                EventDate = model.EventDate,
                photo = sysFileName,
            };

            db.tblCustomerEvents.Add(saveCustEvent);
            db.SaveChanges();
            return msg;
        }
        public List<CustEventModel> GetList()
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<CustEventModel> lstCustEvent = new List<CustEventModel>();
            DateTime backdate = DateTime.Now.AddDays(-10);
            DateTime tommdate = DateTime.Now.AddDays(10);
            var CustEventModel = Db.tblCustomerEvents.Where(p=>p.EventDate>=backdate && p.EventDate <= tommdate).ToList();
            if (CustEventModel != null)
            {
                foreach (var CustEvent in CustEventModel)
                {
                    lstCustEvent.Add(new CustEventModel()
                    {
                        EventId = CustEvent.EventId,
                        CustomerName = CustEvent.CustomerName,
                        MobileNo = CustEvent.MobileNo,
                        WhatsAppNo = CustEvent.WhatsAppNo,
                        EventType = CustEvent.EventType,
                        EveDate = CustEvent.EventDate.ToString("MM/dd/yyyy"),
                        photo = CustEvent.photo,
                    });
                }
            }
            return lstCustEvent;
        }

        public List<CustEventModel> AllEvent()
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<CustEventModel> lstCustEvent = new List<CustEventModel>();
            var CustEventModel = Db.tblCustomerEvents.ToList();
            if (CustEventModel != null)
            {
                foreach (var CustEvent in CustEventModel)
                {
                    lstCustEvent.Add(new CustEventModel()
                    {
                        EventId = CustEvent.EventId,
                        CustomerName = CustEvent.CustomerName,
                        MobileNo = CustEvent.MobileNo,
                        WhatsAppNo = CustEvent.WhatsAppNo,
                        EventType = CustEvent.EventType,
                        EveDate = CustEvent.EventDate.ToString("MM/dd/yyyy"),
                        photo = CustEvent.photo,
                    });
                }
            }
            return lstCustEvent;
        }
        public string DltEvent(int EId)
        {
            string Message = "";
            eSankBakeryEntities Db = new eSankBakeryEntities();
            var deleteRecord = Db.tblCustomerEvents.Where(p => p.EventId == EId).FirstOrDefault();
            if (deleteRecord != null)
            {
                Db.tblCustomerEvents.Remove(deleteRecord);
            };
            Db.SaveChanges();
            Message = "Item Deleted Successfully";
            return Message;
        }

    }
}







