﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OpenSim.WebServer.App.Model;

namespace OpenSim.WebServer.Controllers
{
    [ApiVersion("1.0")]
    [Produces("application/hal+json")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<ActionResult<UserInfoResource>> Post([FromBody] AuthenticationViewModel auth)
        {
            await signInManager.SignOutAsync();

            var user = await userManager.FindByNameAsync(auth.Username);
            if (user == null) return NotFound();

            var res = await signInManager.PasswordSignInAsync(user, auth.Password, false, false);
            return res.Succeeded ? new ActionResult<UserInfoResource>(new UserInfoResource(user)) : BadRequest(res.ToString());
        }
    }

    public class AuthenticationViewModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
