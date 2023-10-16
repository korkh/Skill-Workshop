using Domain;
using Microsoft.AspNetCore.Identity;

namespace Storage
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
           UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Trainings.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        Bio = "Hello! My name is Bob!"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var trainings = new List<Training>
                {
                    new Training
                    {
                        Title = "Past Training 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Training 2 months ago",
                        Category = "seminars",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Training
                    {
                        Title = "Past Training 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Training 1 month ago",
                        Category = "webinars",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 1",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "Training 1 month in future",
                        Category = "courses",
                        City = "London",
                        Venue = "Wembly Stadium",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 2",
                        Date = DateTime.UtcNow.AddMonths(2),
                        Description = "Training 2 months in future",
                        Category = "bootcamps",
                        City = "London",
                        Venue = "Jamies Italian",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 3",
                        Date = DateTime.UtcNow.AddMonths(3),
                        Description = "Training 3 months in future",
                        Category = "seminars",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[0],
                                IsHost = false
                            },
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 4",
                        Date = DateTime.UtcNow.AddMonths(4),
                        Description = "Training 4 months in future",
                        Category = "webinars",
                        City = "London",
                        Venue = "British Museum",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[1],
                                IsHost = true
                            }
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 5",
                        Date = DateTime.UtcNow.AddMonths(5),
                        Description = "Training 5 months in future",
                        Category = "seminars",
                        City = "London",
                        Venue = "Punch and Judy",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 6",
                        Date = DateTime.UtcNow.AddMonths(6),
                        Description = "Training 6 months in future",
                        Category = "courses",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 7",
                        Date = DateTime.UtcNow.AddMonths(7),
                        Description = "Training 7 months in future",
                        Category = "lectures",
                        City = "Berlin",
                        Venue = "All",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Training
                    {
                        Title = "Future Training 8",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "Training 8 months in future",
                        Category = "seminars",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<TrainingAttendee>
                        {
                            new TrainingAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new TrainingAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    }
                };

                await context.Trainings.AddRangeAsync(trainings);
                await context.SaveChangesAsync();
            }
        }
    }
}