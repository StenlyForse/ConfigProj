namespace ASUTP.API.Models
{
    public class ConfigsElem
    {
        public int Id { get; set; }
        public int CatalogId { get; set; }
        public int Count { get; set; }
        public int BoundleID { get; set; }
        /*public string? Name { get; set; }*/
    }

    public class BoundlesJoinCatalogElem
    {
        public int Id { get; set; }
        public string? Reference { get; set; }
        public int BoundleID { get; set; }
        public int Count { get; set; }
        public int ModuleCount { get; set; }
        public string? Desc { get; set; }
        public string? Currency { get; set; }
        public decimal? Price_w_tax { get; set; }
        public decimal? Price_wo_tax { get; set; }
        public string? VendorName { get; set; }
        public decimal? Total { get; set; }
        // Строки для отображения с ₽
        public string? Price_w_taxStr { get; set; }
        public string? Price_wo_taxStr { get; set; }
        public string? TotalStr { get; set; }
        public int CatalogId { get; set;}

    }

    /// <summary>
    /// Для отображения на странице редактирования конфигурации
    /// </summary>
    public class ConfigsData
    {
        public string? Title { get; set; }
        public string DateTime { get; set; }
        public int Revision { get; set; }
        public string? Total { get; set; }
        public string? PureNDS { get; set; }
        public string? TotalWithNDS { get; set; }
        public List<BoundlesJoinCatalogElem>? СonfigsElems { get; set; }
        public List<BoundlesJoinCatalogElem>? CpuElems { get; set; }
    }

    // Комбинированный объект для массивов цпу и контроллеров
    public class CpuAndControllersData
    {
        public bool DublicatingCPU { get; set; }
        public ConfigsElem[]? cpu { get; set; }
        public ConfigsElem[]? controllers { get; set; }
        public string Description { get; set; }
        public int Revision { get; set;}
    }
}
