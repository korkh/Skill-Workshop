using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{userName}")]
        public async Task<IActionResult> GetProfile(string userName)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = userName }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{userName}/trainings")]
        public async Task<IActionResult> GetUserTrainigs(string userName, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListTrainings.Query
            { UserName = userName, Predicate = predicate }));
        }

    }
}