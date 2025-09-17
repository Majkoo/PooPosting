namespace PooPosting.Application.Services.Startup;

public class EnvironmentVariableSetter
{
    public void Set()
    {
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS",
            Path.Combine(Environment.CurrentDirectory, "authKey.json"));
    }
}