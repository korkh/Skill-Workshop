using Application.Trainings;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUserName = null;
            //self-mapping, indicating that an Training object should be mapped to another Training object.
            CreateMap<Training, Training>();

            //Following mapping displayes The AppUser is obtained from the Attendees collection of the Training object, where the first attendee with IsHost set to true is selected.
            CreateMap<Training, TrainingDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            //Following mapping defines how an ActivitiyAttendee object should be mapped to a Profiles.Profile object. It appears to be mapping an attendee of an activity to a profile object.
            CreateMap<TrainingAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, options => options.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUserName)));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following,
                    o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUserName)));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, options => options.MapFrom(source => source.Author.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
            //Events in user profile
            CreateMap<TrainingAttendee, Profiles.UserTrainingDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Training.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Training.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Training.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Training.Category))
                .ForMember(d => d.HostUserName, o => o.MapFrom(s => s.Training.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
        }
    }
}