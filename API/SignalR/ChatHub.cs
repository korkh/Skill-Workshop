
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        // method is a hub method that handles incoming chat messages. When a new comment is received, it sends the comment to the corresponding group (using Clients.Group) and notifies all clients connected to that group to display the new comment 
        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command); //saving comment to DB 

            //ending to anybody conneted to the hub
            await Clients.Group(command.TrainingId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        //When client connects to the hub we want him to join the group
        public override async Task OnConnectedAsync() //we dont need same for disconnection, SignalR do it self
        {
            //actions when client connects
            var httpContext = Context.GetHttpContext();
            var trainingId = httpContext.Request.Query["trainingId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, trainingId); //add connected client to the group with name as activityId
            var result = await _mediator.Send(new List.Query { TrainingId = Guid.Parse(trainingId) }); //sending a list of comments to joined client
            await Clients.Caller.SendAsync("LoadComments", result.Value);

        }

    }
}