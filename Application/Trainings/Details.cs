using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Storage;

namespace Application.Trainings
{
    public class Details
    {
        public class Query : IRequest<Result<TrainingDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TrainingDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._mapper = mapper;
                _context = context;
            }

            public async Task<Result<TrainingDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var training = await _context.Trainings
                .ProjectTo<TrainingDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUserName() })
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TrainingDto>.Success(training);
            }

        }
    }
}