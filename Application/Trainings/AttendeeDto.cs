using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Trainings
{
    public class AttendeeDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public bool Following { get; set; } //property for current user when he returns another user's profile we want to know that the following loggedin user is following that particular user
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}