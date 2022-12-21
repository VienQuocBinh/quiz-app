using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase {
        private readonly QuizDBContext _context;

        public ParticipantController(QuizDBContext context) {
            _context = context;
        }

        // GET: api/Participant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants() {
            return await _context.Participants.ToListAsync();
        }

        // GET: api/Participant/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(int id) {
            var participant = await _context.Participants.FindAsync(id);

            if (participant == null) {
                return NotFound();
            }

            return participant;
        }

        // PUT: api/Participant/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(int id, ParticipantResult participantResult) {
            if (id != participantResult.ParticipantId) {
                return BadRequest();
            }

            // Update participant info
            Participant participant = _context.Participants.Find(id);
            participant.Score = participantResult.Score;
            participant.TimeTaken = participantResult.TimeTaken;
            _context.Entry(participant).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!ParticipantExists(id)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Participant
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant) {
            var temp = _context.Participants.Where(p => p.Name.Equals(participant.Name)
            && p.Email.Equals(participant.Email)).FirstOrDefault();
            if (temp == null) {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else {
                participant = temp;
            }

            return Ok(participant);
            //return CreatedAtAction("GetParticipant", new { id = participant.Id }, participant);
        }

        // DELETE: api/Participant/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipant(int id) {
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null) {
                return NotFound();
            }

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantExists(int id) {
            return _context.Participants.Any(e => e.Id == id);
        }
    }
}
