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
        public string? Name { get; set; }
        public int BoundleID { get; set; }
        public int Count { get; set; }
        public int ModuleCount { get; set; }
    }

    /// <summary>
    /// Для отображения на странице редактирования конфигурации
    /// </summary>
    public class ConfigsData
    {
        public string? Title { get; set; }
        public string DateTime { get; set; }
        public int Revision { get; set; }
        public List<BoundlesJoinCatalogElem>? СonfigsElems { get; set; }
    }
}
