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
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public IEnumerable<Booking> GetBookings()
        {
            return _context.Bookings.Include(b => b.Room).Include(b => b.PaymentOption);
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        // PUT: api/Bookings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking([FromRoute] int id, [FromBody] Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != booking.ID)
            {
                return BadRequest();
            }

            var existingBooking = await _context.Bookings.FindAsync(id);
            var room = await _context.Rooms.FindAsync(existingBooking.RoomID);

            existingBooking.IsActive = !existingBooking.IsActive;
            room.IsAvailable = !room.IsAvailable;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: api/Bookings
        [HttpPost]
        public async Task<IActionResult> PostBooking([FromBody] Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var room = await _context.Rooms.FindAsync(booking.RoomID);
            var type = await _context.RoomTypes.FindAsync(room.RoomTypeID);
            var option = await _context.PaymentOptions.FindAsync(booking.PaymentOptionID);

            double roomTotal = type.Price + (type.Price * type.Tax / 100);
            double bookingTotal = (roomTotal + (roomTotal * option.Ratio / 100)) * booking.Duration * booking.Capacity;
            double amount = bookingTotal / option.Index;
            double remainingAmount = bookingTotal;

            int counter = 0;

            booking.Total = bookingTotal;
            booking.IsActive = false;
            booking.CreatedAt = DateTime.Now;

            _context.Bookings.Add(booking);

            for (int i = 0; i < option.Index; i++)
            {
                Payment payment = new Payment()
                {
                    BookingID = booking.ID,
                    Amount = amount,
                    RemainingAmount = remainingAmount - amount,
                    PaymentDay = DateTime.Now.AddDays(counter),
                    IsDone = false,
                    UpdatedAt = DateTime.Now,
                    CreatedAt = DateTime.Now
                };

                remainingAmount -= amount;
                counter += 30;

                _context.Payments.Add(payment);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.ID }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return Ok(booking);
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.ID == id);
        }
    }
}