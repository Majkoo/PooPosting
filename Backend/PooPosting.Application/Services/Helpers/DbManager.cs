using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PooPosting.Domain.DbContext;

namespace PooPosting.Application.Services.Helpers;

public static class DbManager
{
    public static void UpdateDb(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        var db = serviceScope.ServiceProvider.GetRequiredService<PictureDbContext>();
        db.Database.Migrate();
        db.SaveChanges();
    }
}