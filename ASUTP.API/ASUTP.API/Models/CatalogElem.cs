namespace ASUTP.API.Models
{
    public class CatalogElem
    {
        public /*Guid*/ int Id { get; set; }
        //public string? Element { get; set; }
        public string? Reference { get; set; }
        public string? Name { get; set; }
        //public decimal? Price { get; set; }
        public decimal? Price_wo_tax { get; set; }
        public string? Currency { get; set; }
        //public string? Note { get; set; }
        public string? Comment { get; set; }

    }
}
