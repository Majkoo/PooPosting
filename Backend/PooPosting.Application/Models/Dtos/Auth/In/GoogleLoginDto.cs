using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PooPosting.Application.Models.Dtos.Auth.In
{
    public class GoogleLoginDto
    {
        public string IdToken { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
