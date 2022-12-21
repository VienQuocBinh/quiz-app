using System.ComponentModel.DataAnnotations;

namespace QuizAPI.Models {

    public class Participant {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
    public class ParticipantResult {
        public int ParticipantId { get; set; }
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
}
