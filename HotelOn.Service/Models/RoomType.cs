using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HotelOn.Service.Models
{
    public class RoomType
    {
        public int ID { get; set; }

        [Required]
        [StringLength(15)]
        public string Name { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public double Tax { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
