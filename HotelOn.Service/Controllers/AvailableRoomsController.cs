using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelOn.Service.Data;
using HotelOn.Service.Models;

namespace HotelOn.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvailableRoomsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AvailableRoomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AvailableRooms
        [HttpGet]
        public IEnumerable<Room> GetRooms()
        {
            return _context.Rooms.Include(r => r.RoomType).Where(r => r.IsAvailable == true).OrderBy(r => r.RoomNumber);
        }

        private bool RoomExists(int id)
        {
            return _context.Rooms.Any(e => e.ID == id);
        }
    }
}