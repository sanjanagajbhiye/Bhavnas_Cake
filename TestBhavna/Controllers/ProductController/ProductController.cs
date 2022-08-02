using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestBhavna.Models;

namespace TestBhavna.Controllers.ProductController
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdminProductlist()
        {
            return View();
        }
        // GET: Product
        public ActionResult AddProduct()
        {
            return View();
        }

        public ActionResult AllCakes(int cid)
        {
            ViewBag.Cid = cid;
            return View();
        }

        public ActionResult ProductDetails(int pid)
        {
            ViewBag.Pid = pid;
            return View();
        }

        public ActionResult TestDetails()
        {
            return View();
        }

        public ActionResult AddCategory()
        {
            return View();
        }

        public ActionResult SaveAddCategory(AddCategoryModel model)
        {
            try
            {
                return Json(new { model = (new AddCategoryModel().SaveAddCategory(model)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        
        public ActionResult GetCatagory()
        {
            try
            {
                return Json(new { model = new AddCategoryModel().GetCategory() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message });
            }
        }

        public ActionResult SearchCatagory(string Prefix)
        {
            try
            {
                return Json(new { model = new AddCategoryModel().SearchCategory(Prefix) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message },JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult SaveAddProduct(ProductModel model)
        {
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }

                return Json(new { message = (new ProductModel().SaveAddProduct(fb, model)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AdProductList()
        {
            try
            {
                return Json(new { model = new ProductModel().AdProductList() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult GetAdProductList(int CategoryId)
        {
            try
            {
                return Json(new { model = new ProductModel().GetAdProductList(CategoryId) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult GetProductDetails(int ID)
        {
            try
            {
                return Json((new ProductModel().GetProductDetails(ID)), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult deleteItem(int ProductId)
        {
            try
            {
                return Json(new { model = (new ProductModel().deleteItem(ProductId)) },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception Ex)
            {
                return Json(new { Ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult ThemeCake()
        {
            return View();
        }

        public ActionResult Bakery()
        {
            return View();
        }
        public ActionResult BoyCake()
        {
            return View();
        }
       
        public ActionResult PhotoCake()
        {
            return View();
        }
        public ActionResult Snacks()
        {
            return View();
        }
        public ActionResult ShopByRelation()
        {
            return View();
        }
        public ActionResult ShopByOccasion()
        {
            return View();
        }

        


    }
}