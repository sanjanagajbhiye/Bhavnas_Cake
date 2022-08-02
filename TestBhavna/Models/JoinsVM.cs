using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestBhavna.Models;

namespace TestBhavna.Models
{
    public class JoinsVM
    {
        public BookingJoinModel booking { get; set; }
        public ProductJoinModel product { get; set; }
    }
}