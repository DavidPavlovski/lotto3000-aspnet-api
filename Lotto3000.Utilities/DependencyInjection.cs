using Lotto3000.DataAccess;
using Lotto3000.DataAccess.Abstraction;
using Lotto3000.DataAccess.Repositories;
using Lotto3000.Domain.Entities;
using Lotto3000.Services.Abstraction;
using Lotto3000.Services.Implementation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lotto3000.Utilities
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterModule(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<Lotto3000DbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            //Services
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ILottoSessionService, LottoSessionService>();
            services.AddTransient<ILottoTicketService, LottoTicketService>();

            //Repositories
            //services.AddTransient<IRepository<UserDto>, UserStaticRepository>();
            //services.AddTransient<IRepository<LottoSessionDto>, LottoSessionStaticRepository>();
            //services.AddTransient<IRepository<LottoTicketDto>, LottoTicketStaticRepository>();

            services.AddTransient<IRepository<UserDto>, UserRepository>();
            services.AddTransient<IRepository<LottoSessionDto>, LottoSessionRepository>();
            services.AddTransient<IRepository<LottoTicketDto>, LottoTicketRepository>();


            return services;
        }
    }
}
