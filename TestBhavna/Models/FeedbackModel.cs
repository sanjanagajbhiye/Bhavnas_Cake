using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TestBhavna.Data;

namespace TestBhavna.Models
{
    public class FeedbackModel
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Feedback { get; set; }

        public string SaveFeed(FeedbackModel model)
        {
            string msg = "";
            eSankBakeryEntities db = new eSankBakeryEntities();
            var savefeedback = new tblfeedback()
            {
                Name = model.Name,
                City = model.City,
                Address = model.Address,
                Feedback = model.Feedback,
            };
            db.tblfeedbacks.Add(savefeedback);
            db.SaveChanges();
            return msg;
        }
        public List<FeedbackModel> GetList()
        {
            eSankBakeryEntities Db = new eSankBakeryEntities();
            List<FeedbackModel> lstFeedback = new List<FeedbackModel>();
            var FeedbackModel = Db.tblfeedbacks.ToList();
            if (FeedbackModel != null)
            {
                foreach (var Feedback in FeedbackModel)
                {
                    lstFeedback.Add(new FeedbackModel()
                    {

                        CustomerId = Feedback.CustomerId,
                        Name = Feedback.Name,
                        City = Feedback.City,
                        Address = Feedback.Address,
                        Feedback = Feedback.Feedback,

                    });
                }
            }
            return lstFeedback;

        }
    }
}