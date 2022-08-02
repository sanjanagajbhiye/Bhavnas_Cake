using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestBhavna.Models;

namespace TestBhavna.Controllers.Customer
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult CustomerEvents()
        {
            return View();
        }
       public ActionResult UserEvent()
        {
            return View();
        }
        public ActionResult Checkout()
        {
            return View();
        }

        public ActionResult TestCheckout()
        {
            return View();
        }

        //public ActionResult SaveCustEvent(CustEventModel model)
        //{
        //    try
        //    {
        //        return Json(new { message = (new CustEventModel().SaveCustEvent(model)) }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { ex.Message },JsonRequestBehavior.AllowGet);
        //    }
        //}
        public ActionResult SaveCustEvent(CustEventModel model)
        {
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }
                return Json(new { message = (new CustEventModel().SaveCustEvent(fb, model)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message });
            }
        }

        public ActionResult GetList()
        {
            try
           {
                return Json(new { model = (new CustEventModel().GetList()) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message });
            }
        }

        public ActionResult AllEvent()
        {
            try
            {
                return Json(new { model = (new CustEventModel().AllEvent()) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message });
            }
        }

        public ActionResult DltEvent(int EId)
        {
            try
            {
                return Json(new { model = (new CustEventModel().DltEvent(EId)) },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}