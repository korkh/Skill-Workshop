using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Storage;

namespace Application.Trainings
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var training = await _context.Trainings
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id); //we can use also .SingleOrDefaultAsync (controls that you don't have duplicates of Id inside database), but if we have more than 1 Id we'll get an exeption. That's why we are using FirstOrDefault() because it will return null, but not exeption if not found or first that comes accross if there are more than 1.
                if (training == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var hostUsername = training.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName; //This is not async method because we already got an training as well as Attendees in memory at this stage from method "var training = await _context.Trainings

                var attendance = training.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                    training.IsCancelled = !training.IsCancelled;

                if (attendance != null && hostUsername != user.UserName)
                    training.Attendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new TrainingAttendee
                    {
                        AppUser = user,
                        Training = training,
                        IsHost = false
                    };

                    training.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}