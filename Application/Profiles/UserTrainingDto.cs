using System.Text.Json.Serialization;

namespace Application.Profiles
{
    public class UserTrainingDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore] //not interesting in returning but needs access, so we are ignoring that
        public string HostUserName { get; set; }
    }
}