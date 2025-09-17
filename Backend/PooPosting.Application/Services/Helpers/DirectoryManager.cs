namespace PooPosting.Application.Services.Helpers;

public static class DirectoryManager
{
    private static readonly string[] DirectoryPaths = {
        "wwwroot",
        Path.Combine("wwwroot", "pictures"),
        Path.Combine("wwwroot", "accounts"),
        Path.Combine("wwwroot", "accounts", "profile_pictures"),
        Path.Combine("wwwroot", "accounts", "background_pictures"),
        "logs",
        Path.Combine("logs", "all"),
        Path.Combine("logs", "exceptions"),
        Path.Combine("logs", "request-time"),
        Path.Combine("logs", "requests"),
        Path.Combine("logs", "requests-warn"),
        Path.Combine("logs", "warnings")
    };

    public static void EnsureAllDirectoriesAreCreated()
    {
        foreach (var directoryPath in DirectoryPaths)
        {
            var absolutePath = GetAbsolutePath(directoryPath);
            EnsureDirectory(absolutePath);
        }
    }

    private static string GetAbsolutePath(string path)
    {
        return Path.Combine(Directory.GetCurrentDirectory(), path);
    }

    private static void EnsureDirectory(string path)
    {
        if (!Directory.Exists(path)) Directory.CreateDirectory(path!);
    }
}