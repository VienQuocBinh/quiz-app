using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase {
        private readonly QuizDBContext _context;

        public QuestionController(QuizDBContext context) {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions() {
            var random5Qns = await _context.Questions
                .Select(q => new {
                    qId = q.Id,
                    qInWords = q.InWords,
                    q.ImageName,
                    Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 }
                })
                .OrderBy(y => Guid.NewGuid())
                .Take(5).ToListAsync();
            return Ok(random5Qns);
            //return await _context.Questions.ToListAsync();
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id) {
            var question = await _context.Questions.FindAsync(id);

            if (question == null) {
                return NotFound();
            }

            return question;
        }

        // PUT: api/Question/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question) {
            if (id != question.Id) {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!QuestionExists(id)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Question/GetAnswer
        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Question>> RetrieveAnswers(int[] questionIds) {
            var answers = await _context.Questions
                .Where(q => questionIds.Contains(q.Id))
                .Select(q => new {
                    qId = q.Id,
                    qInWords = q.InWords,
                    q.ImageName,
                    Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 },
                    Answer = q.Answer
                }).ToListAsync();
            return Ok(answers);

        }

        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id) {
            var question = await _context.Questions.FindAsync(id);
            if (question == null) {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id) {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}
