using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HotelOn.Service.Models
{
    public class Payment
    {
        public int ID { get; set; }
        public double Amount { get; set; }
        public double RemainingAmount { get; set; }
        public bool IsDone { get; set; }
        public DateTime PaymentDay { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
