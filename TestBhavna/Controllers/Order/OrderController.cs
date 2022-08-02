using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestBhavna.Models;

namespace TestBhavna.Controllers.Order
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UserIndex()
        {
            //ViewBag.Pid = pid;
            return View();
        }

        public ActionResult SaveOrder(OrderModel model)
        {
            try
            {
                return Json(new { message = (new OrderModel().SaveOrder(model)) }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetList()
        {
            try
            {
                return Json(new {model = (new OrderModel().GetList()) }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new {model= ex.Message});
            }
        }

    }
}