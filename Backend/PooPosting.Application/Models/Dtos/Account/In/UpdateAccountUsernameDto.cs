using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PooPosting.Application.Models.Dtos.Account.In;
public class UpdateAccountUsernameDto
{
   public string Username { get; init; } = null!;
}
