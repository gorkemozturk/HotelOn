using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HotelOn.Service.Models
{
    public class Room
    {
        public int ID { get; set; }
        public int RoomTypeID { get; set; }

        [Required]
        public int RoomNumber { get; set; }
        public bool IsAvailable { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey("RoomTypeID")]
        public virtual RoomType RoomType { get; set; }
    }
}
