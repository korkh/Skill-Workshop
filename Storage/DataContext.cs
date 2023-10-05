using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Storage
{
    public class DataContext : IdentityDbContext<AppUser>
    {
         public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Training> Trainings { get; set; } //now we can add migration
        public DbSet<TrainingAttendee> TrainingAttendees { get; set; } //now we can add migration
        public DbSet<Photo> Photos { get; set; } //now we can add migration
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

        //we need overide IdentityDbContext method
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Configuration many-to-many relationship
            builder.Entity<TrainingAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.TrainingId })); //creating new Primary key as combination of 2 Id (AppUserId & TrainingId)
            builder.Entity<TrainingAttendee>()
                            .HasOne(u => u.AppUser)
                            .WithMany(a => a.Trainings)
                            .HasForeignKey(aa => aa.AppUserId);
            builder.Entity<TrainingAttendee>()
                            .HasOne(u => u.Training)
                            .WithMany(a => a.Attendees)
                            .HasForeignKey(aa => aa.TrainingId);

            builder.Entity<Comment>()
                .HasOne(a => a.Training)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade); //if we will delete an training it will cascade down comments assosiated with that training

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer).WithMany(f => f.Followings).HasForeignKey(o => o.ObserverId).OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target).WithMany(f => f.Followers).HasForeignKey(o => o.TargetId).OnDelete(DeleteBehavior.Cascade); //target with many followee
            });
        }
    }
}