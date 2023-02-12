namespace library_store_back.Models
{
    public class User
    {
        public int Id { get; set; }

        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? age { get; set; }
        public int isActive { get; set; }
    }
}
