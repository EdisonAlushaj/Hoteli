using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        public readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<List<Activities>>> GetAllActivities()
        {
            var activities = await _context.Activities.ToListAsync();

            return Ok(activities);
        }


        [HttpGet("{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<List<Activities>>> GetActivities(int id)
        {
            var Activities = await _context.Activities.FindAsync(id);
            if (Activities == null)
                return NotFound("Activities not found");
            return Ok(Activities);
        }

        [HttpPost, Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<List<Activities>>> AddActivities(Activities Activities)
        {
            _context.Activities.Add(Activities);
            await _context.SaveChangesAsync();

            return Ok(await _context.Activities.ToListAsync()); ;
        }

        [HttpPatch, Authorize(Policy = "AdminPolicy")]
        [Route("UpdateActivities/{id}")]
        public async Task<Activities> UpdateActivities(Activities objActivities)
        {
            _context.Entry(objActivities).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objActivities;
        }

        [HttpDelete("{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<List<Activities>>> DeleteActivities(int id)
        {
            var dbActivities = await _context.Activities.FindAsync(id);
            if (dbActivities == null)
                return NotFound("Activities not found");

            _context.Activities.Remove(dbActivities);

            await _context.SaveChangesAsync();

            return Ok(await _context.Activities.ToListAsync()); ;
        }
    }
}
