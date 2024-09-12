using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly DataContext _context;

        public TableController(DataContext context)
        {
            _context = context;
        }

        [HttpGet, Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<List<Table>>> GetAllTables()
        {
            var tables = await _context.Tables.ToListAsync();
            return Ok(tables);
        }

        [HttpGet("{id}"), Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<Table>> GetTable(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
                return NotFound("Table not found");
            return Ok(table);
        }

        [HttpPost, Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<List<Table>>> AddTable(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();
            return Ok(await _context.Tables.ToListAsync());
        }

        [HttpPatch("UpdateTable/{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<Table> UpdateTable(Table objTable)
        {
            _context.Entry(objTable).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objTable;
        }

        [HttpDelete("{id}"), Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<List<Table>>> DeleteTable(int id)
        {
            var dbTable = await _context.Tables.FindAsync(id);
            if (dbTable == null)
                return NotFound("Table not found");

            _context.Tables.Remove(dbTable);
            await _context.SaveChangesAsync();
            return Ok(await _context.Tables.ToListAsync());
        }

        // New endpoint to get tables by establishment type
        [HttpGet("by-establishment/{establishment}"), Authorize(Policy = "UserPolicy")]
        public async Task<ActionResult<List<Table>>> GetTablesByEstablishment(EstablishmentType establishment)
        {
            var tables = await _context.Tables
                .Where(t => t.Establishment == establishment)
                .ToListAsync();

            if (tables == null || tables.Count == 0)
            {
                return NotFound("No tables found for the specified establishment type.");
            }

            return Ok(tables);
        }
    }
}
