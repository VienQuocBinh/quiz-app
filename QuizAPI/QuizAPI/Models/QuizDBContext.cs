using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models {
    public class QuizDBContext : DbContext {
        public QuizDBContext(DbContextOptions options) : base(options) {
        }
        public DbSet<Question>? Questions { get; set; }
        public DbSet<Participant>? Participants { get; set; }
    }
}
