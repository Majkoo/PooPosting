using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PooPosting.Application.Models.Dtos.Auth.In
{
    public class GoogleLoginDto
    {
        public required string IdToken { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PhotoUrl { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
