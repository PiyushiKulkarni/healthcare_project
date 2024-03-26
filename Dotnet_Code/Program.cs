using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            int port = 8085;
            var tcpServer = new ServerTCP(port);
            _ = tcpServer.StartAsync();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureServices((context, services) =>
                    {
                        services.AddSingleton<ServerTCP>(serviceProvider =>
                        {
                            var port = 8085;
                            return new ServerTCP(port);
                        });

                        services.AddControllers();
                        services.AddCors(options =>
                        {
                            options.AddPolicy("AllowOrigin",
                                builder => builder.WithOrigins("http://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
                        });

                        // Configure DbContext and Connection String
                        services.AddDbContext<MyDbContext>(options =>
                        options.UseSqlite(context.Configuration.GetConnectionString("DefaultConnection")));
                    });

                    webBuilder.Configure((app) =>
                    {
                        app.UseRouting();
                        app.UseCors("AllowOrigin");

                        app.UseEndpoints(endpoints =>
                        {
                            endpoints.MapControllers();
                        });
                    });
                });
    }
}
