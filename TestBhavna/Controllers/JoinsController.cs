using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestBhavna.Models;

namespace TestBhavna.Controllers
{
    public class JoinsController : Controller
    {
        // GET: Joins
        public ActionResult LinqJoin()
        {
            return View();
        }
        public ActionResult LinqQuery()
        {
            JoinsVM mymodel = new JoinsVM();
            
            List<ProductJoinModel> pro = ProductJoinModel.Product();
            List<BookingJoinModel> book = BookingJoinModel.Booking();

            var innerjoin = (from pron in pro
                             join bon in book
                             on pron.ProductId equals bon.ProductId
                             select new JoinsVM()
                             {
                                 product = pron,
                                 booking = bon,
                             });
            return View(innerjoin);
        }
    }
}