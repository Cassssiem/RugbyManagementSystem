using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RugbyManagementSystem.Application.DTOs.SponsorDTOs;
using RugbyManagementSystem.Application.Interfaces;

namespace RugbyManagementSystem_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorInquiryController : ControllerBase
    {
        private readonly ISponsorInquiryServices _services;

        public SponsorInquiryController(ISponsorInquiryServices services)
        {
            _services = services;
        }

        [HttpPost]
        public async Task<ActionResult> Submit(CreateSponsorInquiryDTO dto)
        {
            await _services.CreateAsync(dto);
            return Ok("Thank you — we'll be in touch.");
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<GetSponsorInquiryDTO>>> GetAll()
        {
            return Ok(await _services.GetAllAsync());
        }

        [HttpPut("{id:int}/reviewed")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> MarkReviewed(int id)
        {
            var result = await _services.MarkReviewedAsync(id);
            if (!result) return NotFound();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _services.DeleteAsync(id);
            if (!result) return NotFound();
            return Ok();
        }
    }
}