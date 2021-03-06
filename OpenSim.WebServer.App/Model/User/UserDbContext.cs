﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace OpenSim.WebServer.App.Model
{
    public class UserDbContext : IdentityDbContext<User, IdentityRole<long>, long>
    {
        public UserDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}