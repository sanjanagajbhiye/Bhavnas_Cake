using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Web;
using TestBhavna.Data;

namespace TestBhavna.Models
{
    public class ProductModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public decimal Size { get; set; }
        public string Unit { get; set; }
        public string ProductPhoto { get; set; }
        public System.DateTime ManufacturingDate { get; set; }
        public System.DateTime ExpiryDate { get; set; }
        public string MDateString { get; set; }
        public string EDateString { get; set; }

        public string SaveAddProduct(HttpPostedFileBase fb, ProductModel model)
        {
            string msg = "Product Added!!!";

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
            var saveAddProduct = new tblProduct()
            {
                ProductName = model.ProductName,
                CategoryId = model.CategoryId,
                Price = model.Price,
                Size = model.Size,
                Unit = model.Unit,
                ProductPhoto = sysFileName,
                ManufacturingDate = model.ManufacturingDate,
                ExpiryDate = model.ExpiryDate,

            };
            db.tblProducts.Add(saveAddProduct);
            db.SaveChanges();
            return msg;
        }


        public List<ProductModel> GetAdProductList(int CategoryId)
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<ProductModel> lstAddProduct = new List<ProductModel>();
            
            var AddAddProductList = Db.tblProducts.Where(p=>p.CategoryId==CategoryId).ToList();
            if (AddAddProductList != null)
            {
                foreach (var AddProduct in AddAddProductList)
                {
                    lstAddProduct.Add(new ProductModel()
                    {
                        ProductId = AddProduct.ProductId,
                        ProductName = AddProduct.ProductName,
                        CategoryId =AddProduct.CategoryId,
                        Price=AddProduct.Price,
                        Size=AddProduct.Size,
                        Unit=AddProduct.Unit,
                        ProductPhoto=AddProduct.ProductPhoto,
                        MDateString = AddProduct.ManufacturingDate.ToString("MM/dd/yyyy"),
                        EDateString = AddProduct.ExpiryDate.ToString("MM/dd/yyyy"),
                        
                    });
                }
            }
            return lstAddProduct;
        }

        public List<ProductModel> AdProductList()
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<ProductModel> lstAddProduct = new List<ProductModel>();

            var AddAddProductList = Db.tblProducts.ToList();
            if (AddAddProductList != null)
            {
                foreach (var AddProduct in AddAddProductList)
                {
                    lstAddProduct.Add(new ProductModel()
                    {
                        ProductId = AddProduct.ProductId,
                        ProductName = AddProduct.ProductName,
                        CategoryId = AddProduct.CategoryId,
                        Price = AddProduct.Price,
                        Size = AddProduct.Size,
                        Unit = AddProduct.Unit,
                        ProductPhoto = AddProduct.ProductPhoto,
                        MDateString = AddProduct.ManufacturingDate.ToString("MM/dd/yyyy"),
                        EDateString = AddProduct.ExpiryDate.ToString("MM/dd/yyyy"),

                    });
                }
            }
            return lstAddProduct;
        }


        public ProductModel GetProductDetails(int ID)
        {
           eSankBakeryEntities db = new eSankBakeryEntities();
            try
            {
                ProductModel model = new ProductModel();
                var ProductDet = db.tblProducts.Where(p => p.ProductId == ID).FirstOrDefault();
                if (ProductDet != null)
                {
                    model.ProductId = ProductDet.ProductId;
                    model.ProductName = ProductDet.ProductName;
                    model.CategoryId = ProductDet.CategoryId;
                    model.Price = ProductDet.Price;
                    model.Size = ProductDet.Size;
                    model.Unit = ProductDet.Unit;
                    model.ProductPhoto = ProductDet.ProductPhoto;
                    model.MDateString = ProductDet.ManufacturingDate.ToString("MM/dd/yyyy");
                    model.EDateString = ProductDet.ExpiryDate.ToString("MM/dd/yyyy");
                }
                db.Dispose();
                return model;
            }
            catch (Exception ex)
            {
                db.Database.Connection.Close();
                throw ex;
            }
        }
        public string deleteItem(int ProductId)
        {
            string Message = "";
            eSankBakeryEntities Db = new eSankBakeryEntities();
            var deleteRecord = Db.tblProducts.Where(p => p.ProductId == ProductId).FirstOrDefault();
            if (deleteRecord != null)
            {
                Db.tblProducts.Remove(deleteRecord);
            };
            Db.SaveChanges();
            Message = "Item Deleted Successfully";
            return Message;
        }


    }
}