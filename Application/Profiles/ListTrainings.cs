using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Storage;

namespace Application.Profiles
{
    public class ListTrainings
    {
        public class Query : IRequest<Result<List<UserTrainingDto>>>
        {
            public string UserName { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<UserTrainingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<UserTrainingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.TrainingAttendees
                .Where(u => u.AppUser.UserName == request.UserName)
                .OrderBy(a => a.Training.Date)
                .ProjectTo<UserTrainingDto>(_mapper.ConfigurationProvider)
                .AsQueryable();
                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.UtcNow),
                    "hosting" => query.Where(a => a.HostUserName ==
                    request.UserName),
                    _ => query.Where(a => a.Date >= DateTime.UtcNow)
                };
                var trainings = await query.ToListAsync();

                return Result<List<UserTrainingDto>>.Success(trainings);
            }
        }
    }
}