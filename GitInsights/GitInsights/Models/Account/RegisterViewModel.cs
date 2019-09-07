using System.ComponentModel.DataAnnotations;

namespace GitInsights.Models.Account
{
	public class RegisterViewModel
	{
		[Required]
		public string UserName { get; set; }
		[Required]
		[Display(Name = "Email")]
		[EmailAddress]
		public string Email { get; set; }
		[Required]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password { get; set; }
		[DataType(DataType.Password)]
		[Display(Name = "Confirm password")]
		[Compare("Password")]
		public string ConfirmPassword { get; set; }
	}
}
