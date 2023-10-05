using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Storage;

namespace Application.Trainings
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<TrainingDto>>>
        {
            public TrainingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<TrainingDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<TrainingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Trainings
                    .Where(d => d.Date >= request.Params.StartDate)
                    .OrderBy(d => d.Date) //ordering activities by date
                    .ProjectTo<TrainingDto>(_mapper.ConfigurationProvider,
                        new { currentUserName = _userAccessor.GetUserName() })
                    //dropped usage of .includes and used ProjectTo to reduce amount of querries that we are not using but exist in services
                    //we are not using .Select().. because we are using AutoMapper to make all for us
                    .AsQueryable();

                //Filter 1 - if not a Host and is Going to activity
                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.UserName == _userAccessor.GetUserName()));
                }

                //Filter 2 - if is a Host and not going
                if (!request.Params.IsGoing && request.Params.IsHost)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUserName());
                }

                return Result<PagedList<TrainingDto>>.Success(
                    await PagedList<TrainingDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}