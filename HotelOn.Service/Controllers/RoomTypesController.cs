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
    public class RoomTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RoomTypes
        [HttpGet]
        public IEnumerable<RoomType> GetRoomTypes()
        {
            return _context.RoomTypes;
        }

        // GET: api/RoomTypes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomType([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var roomType = await _context.RoomTypes.FindAsync(id);

            if (roomType == null)
            {
                return NotFound();
            }

            return Ok(roomType);
        }

        // PUT: api/RoomTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomType([FromRoute] int id, [FromBody] RoomType roomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomType.ID)
            {
                return BadRequest();
            }

            _context.Entry(roomType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RoomTypes
        [HttpPost]
        public async Task<IActionResult> PostRoomType([FromBody] RoomType roomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            roomType.CreatedAt = DateTime.Now;

            _context.RoomTypes.Add(roomType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoomType", new { id = roomType.ID }, roomType);
        }

        // DELETE: api/RoomTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomType([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null)
            {
                return NotFound();
            }

            _context.RoomTypes.Remove(roomType);
            await _context.SaveChangesAsync();

            return Ok(roomType);
        }

        private bool RoomTypeExists(int id)
        {
            return _context.RoomTypes.Any(e => e.ID == id);
        }
    }
}