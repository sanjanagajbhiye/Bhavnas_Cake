//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestBhavna.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblProduct
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
    }
}