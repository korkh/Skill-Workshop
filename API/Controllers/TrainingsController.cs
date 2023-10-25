using Application.Trainings;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TrainingsController : BaseApiController
    {
         [HttpGet] //api/trainings
        public async Task<IActionResult> GetTrainings([FromQuery] TrainingParams param) //we cannot use params due to reserved name so named that param
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")] //api/trainings/asdasdasdd
        public async Task<IActionResult> GetTraining(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        //in that method we are returning nothing. And when we are using IActionRequest it gives us access to the http response types which returns Ok(), return back request, return "Not found" but we don't need to specify the type we returning here
        [HttpPost]
        public async Task<IActionResult> CreateTraining(Training training)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Training = training }));
            //Mediator is smart enough to recognize to look inside the body of the request (Training training) to get that object and compare the properties avalable inside training and if they match it that training you want to pass as parameter and it will look inside the body and going get it.
        }

        //Only host can edit and delete an training
        //Check IdentityServiceExtensions and IsHostRequirement
        [Authorize(Policy = "IsTrainingHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTraining(Guid id, Training training)
        {
            training.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Training = training }));
        }

        //Only host can edit and delete an activity
        //Check IdentityServiceExtensions and IsHostRequirement
        [Authorize(Policy = "IsTrainingHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTraining(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id })); //{Id = id} - object initializer
        }

        //Method to Update Attendance
        //Each time sending request it will activate command UpdateAttendance
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id })); //{Id = id} - object initializer
        }
    }
}