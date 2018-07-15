using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UserToDoItems.Models
{
    public class ToDoItem
    {
        [Required]
        public int ID { get; set; }
        public bool IsComplete { get; set; }
        public string Name { get; set; }
        public int UserID { get; set; }
        public ToDoUsers User { get; set; }
    }
}
