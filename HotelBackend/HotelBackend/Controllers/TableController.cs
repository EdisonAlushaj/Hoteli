using HotelBackend.Data;
using HotelBackend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        public readonly DataContext _context;

        public TableController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Table>>> GetAllTables()
        {
            var tables = await _context.Tables.ToListAsync();

            return Ok(tables);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List<Table>>> GetTable(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
                return NotFound("Table not found");
            return Ok(table);
        }

        [HttpPost]
        public async Task<ActionResult<List<Table>>> AddTable(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();

            return Ok(await _context.Tables.ToListAsync()); ;
        }

        [HttpPatch]
        [Route("UpdateTable/{id}")]
        public async Task<Table> UpdateTable(Table objTable)
        {
            _context.Entry(objTable).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return objTable;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Table>>> DeleteTable(int id)
        {
            var dbTable = await _context.Tables.FindAsync(id);
            if (dbTable == null)
                return NotFound("Table not found");

            _context.Tables.Remove(dbTable);

            await _context.SaveChangesAsync();

            return Ok(await _context.Tables.ToListAsync()); ;
        }
    }
}
