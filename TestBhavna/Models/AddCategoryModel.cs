using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using TestBhavna.Data;
using System.Data.Common;
using System.Data.SqlClient;


namespace TestBhavna.Models
{
    public class AddCategoryModel
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SaveAddCategory(AddCategoryModel model)
        {
            string msg = "";
            eSankBakeryEntities db = new eSankBakeryEntities();
           
            {
                var saveAddCategory = new tblCategory()
                {
                 CategoryName = model.CategoryName,
                };
                db.tblCategories.Add(saveAddCategory);
                db.SaveChanges();
                return msg;
            }
        }

        public List<AddCategoryModel> GetCategory()
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<AddCategoryModel> lstCategory = new List<AddCategoryModel>();
            var CatModel = Db.tblCategories.ToList();
            if (CatModel != null)
            {
                foreach (var Cate in CatModel)
                {
                    lstCategory.Add(new AddCategoryModel()
                    {

                        CategoryId = Cate.CategoryId,
                        CategoryName = Cate.CategoryName,

                    });
                }
            }
            return lstCategory;
        }

        public List<AddCategoryModel> SearchCategory(string Prefix)
        {
            try
            {
                List<AddCategoryModel> model = new List<AddCategoryModel>();
                eSankBakeryEntities db = new eSankBakeryEntities();
                DataTable dtTable = new DataTable();
                using (var cmd = db.Database.Connection.CreateCommand())
                {
                    try
                    {
                        db.Database.Connection.Open();
                        cmd.CommandText = "SearchCategory";
                        cmd.CommandType = CommandType.StoredProcedure;

                        DbParameter LID = cmd.CreateParameter();
                        LID.ParameterName = "CategoryName";
                        LID.Value = Prefix;
                        cmd.Parameters.Add(LID);

                        DbDataAdapter da = DbProviderFactories.GetFactory("System.Data.SqlClient").CreateDataAdapter();
                        da.SelectCommand = cmd;
                        da.Fill(dtTable);
                        db.Database.Connection.Close();

                        foreach (DataRow dr in dtTable.Rows)
                        {
                            model.Add(new AddCategoryModel()
                            {
                                CategoryName = dr["CategoryName"].ToString(),
                               
                            });
                        }
                    }
                    catch
                    {
                        db.Database.Connection.Close();
                    }
                }
                db.Dispose();
                return model.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
