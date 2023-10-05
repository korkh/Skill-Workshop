using Application.Core;
using Domain;
using MediatR;
using Storage;

namespace Application.Trainings
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; } // from Domain
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var training = await _context.Trainings.FindAsync(request.Id);

                if (training == null) return null;

                _context.Remove(training);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete training");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}