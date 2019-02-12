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
    public class GuestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GuestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Guests
        [HttpGet]
        public IEnumerable<Guest> GetGuests()
        {
            return _context.Guests;
        }

        // GET: api/Guests/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGuests([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var guests = await _context.Guests.Where(g => g.BookingID == id).ToListAsync();

            if (guests == null)
            {
                return NotFound();
            }

            return Ok(guests);
        }

        // PUT: api/Guests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuest([FromRoute] int id, [FromBody] Guest guest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != guest.ID)
            {
                return BadRequest();
            }

            _context.Entry(guest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GuestExists(id))
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

        // POST: api/Guests
        [HttpPost("{id}")]
        public async Task<IActionResult> PostGuest([FromRoute] int id, [FromBody] Guest guest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            guest.BookingID = id;

            _context.Guests.Add(guest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGuest", new { id = guest.ID }, guest);
        }

        // DELETE: api/Guests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGuest([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var guest = await _context.Guests.FindAsync(id);
            if (guest == null)
            {
                return NotFound();
            }

            _context.Guests.Remove(guest);
            await _context.SaveChangesAsync();

            return Ok(guest);
        }

        private bool GuestExists(int id)
        {
            return _context.Guests.Any(e => e.ID == id);
        }
    }
}