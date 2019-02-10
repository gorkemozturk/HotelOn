using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HotelOn.Service.Models
{
    public class Guest
    {
        public int ID { get; set; }
        public int BookingID { get; set; }

        [Required]
        [StringLength(15)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(15)]
        public string LastName { get; set; }

        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        [StringLength(35)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Address { get; set; }

        [ForeignKey("BookingID")]
        public virtual Booking Booking { get; set; }
    }
}
