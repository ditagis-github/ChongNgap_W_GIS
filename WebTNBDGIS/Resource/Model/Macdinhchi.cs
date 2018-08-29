namespace WebTNBDGIS.Resource.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Macdinhchi")]
    public partial class Macdinhchi
    {
        public int? Nam { get; set; }

        public int? Ngay { get; set; }

        public double? Thang1 { get; set; }

        public double? Thang2 { get; set; }

        public double? Thang3 { get; set; }

        public double? Thang4 { get; set; }

        public double? Thang5 { get; set; }

        public double? Thang6 { get; set; }

        public double? Thang7 { get; set; }

        public double? Thang8 { get; set; }

        public double? Thang9 { get; set; }

        public double? Thang10 { get; set; }

        public double? Thang11 { get; set; }

        public double? Thang12 { get; set; }

        public int? Tuan { get; set; }

        [StringLength(255)]
        public string Value { get; set; }

        [StringLength(255)]
        public string Value2 { get; set; }

        public int ID { get; set; }

        public int? TT { get; set; }
    }
}
