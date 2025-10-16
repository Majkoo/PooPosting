using PooPosting.Domain.DbContext.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace PooPosting.Domain.DbContext.Entities;

public class AccountsSetTags : IIdentifiable
{
    [Key]
    public int Id { get; set; }
    public int AccountId { get; set; }
    public List<string>? Tags { get; set; }
}
