using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestBhavna.Models;

namespace TestBhavna.Controllers
{
    public class BookingController : Controller
    {
        // GET: Booking
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SPInnerJoin()
        {
            return View();
        }

        public ActionResult UserBooking(int pid)
        {
            ViewBag.Pid = pid;
            return View();
        }

        public ActionResult SaveBooking(BookingModel model)
        {
            try
            {
                return Json(new { message = (new BookingModel().SaveBooking(model)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetList()
        {
            try
            {
                return Json(new { model = (new BookingModel().GetList()) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult SPList()
        {
            try
            {
                return Json(new { model = (new BookingModel().getusingsp()) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Linqlist()
        {
            try
            {
                return Json(new { model = (new BookingModel().usinglinq()) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Dlt(int OrderId)
        {
            try
            {
                return Json(new { model = (new BookingModel().Dlt(OrderId)) },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //public ActionResult GetOrder(int ID)
        //{
        //    try
        //    {
        //        return Json((new BookingModel().GetOrder(ID)), JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
        //    }
        //}
    }
}