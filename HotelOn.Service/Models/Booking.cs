using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HotelOn.Service.Models
{
    public class Booking
    {
        public int ID { get; set; }
        public int RoomID { get; set; }
        public int PaymentOptionID { get; set; }

        [Required]
        [StringLength(100)]
        public string BookingName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime StartOn { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public int Capacity { get; set; }
        public double Total { get; set; }
        public bool IsActive { get; set; }

        [Display(Name = "Created at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey("RoomID")]
        public virtual Room Room { get; set; }

        [ForeignKey("PaymentOptionID")]
        public virtual PaymentOption PaymentOption { get; set; }
    }
}
