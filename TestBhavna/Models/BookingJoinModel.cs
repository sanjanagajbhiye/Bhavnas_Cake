using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestBhavna.Models
{
    public class BookingJoinModel
    {
        public int ProductId { get; set; }
        public string Name { get; set; }

        public static List<BookingJoinModel> Booking()
        {
            List<BookingJoinModel> booking = new List<BookingJoinModel>();

            return booking;
        }
    }
}