using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestBhavna.Models;

namespace TestBhavna.Controllers
{
    public class FeedbackController : Controller
    {
        // GET: Feedback
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UserFeedback()
        {
            return View();
        }

        public ActionResult SaveFeedback(FeedbackModel model)
        {
            try
            {
                return Json(new { model = (new FeedbackModel().SaveFeed(model)) }, JsonRequestBehavior.AllowGet);
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
                return Json(new { model = new FeedbackModel().GetList() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}