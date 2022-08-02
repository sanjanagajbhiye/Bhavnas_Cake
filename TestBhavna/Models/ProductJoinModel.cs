using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestBhavna.Models
{
    public class ProductJoinModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        public static List<ProductJoinModel> Product()
        {
            List<ProductJoinModel> product = new List<ProductJoinModel>();

            return product;
        }
    }
}