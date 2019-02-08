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
    public class PaymentOptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentOptionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PaymentOptions
        [HttpGet]
        public IEnumerable<PaymentOption> GetPaymentOptions()
        {
            return _context.PaymentOptions;
        }

        // GET: api/PaymentOptions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentOption([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paymentOption = await _context.PaymentOptions.FindAsync(id);

            if (paymentOption == null)
            {
                return NotFound();
            }

            return Ok(paymentOption);
        }

        // PUT: api/PaymentOptions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentOption([FromRoute] int id, [FromBody] PaymentOption paymentOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paymentOption.ID)
            {
                return BadRequest();
            }

            _context.Entry(paymentOption).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentOptionExists(id))
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

        // POST: api/PaymentOptions
        [HttpPost]
        public async Task<IActionResult> PostPaymentOption([FromBody] PaymentOption paymentOption)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            paymentOption.CreatedAt = DateTime.Now;

            _context.PaymentOptions.Add(paymentOption);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentOption", new { id = paymentOption.ID }, paymentOption);
        }

        // DELETE: api/PaymentOptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentOption([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paymentOption = await _context.PaymentOptions.FindAsync(id);
            if (paymentOption == null)
            {
                return NotFound();
            }

            _context.PaymentOptions.Remove(paymentOption);
            await _context.SaveChangesAsync();

            return Ok(paymentOption);
        }

        private bool PaymentOptionExists(int id)
        {
            return _context.PaymentOptions.Any(e => e.ID == id);
        }
    }
}