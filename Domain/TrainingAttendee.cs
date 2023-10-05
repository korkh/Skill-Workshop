namespace Domain
{
    public class TrainingAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid TrainingId { get; set; }
        public Training Training { get; set; }
        public bool IsHost { get; set; }
    }
}