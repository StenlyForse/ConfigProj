namespace ASUTP.API.Models
{
    public class UsersElem
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }

    }
}
