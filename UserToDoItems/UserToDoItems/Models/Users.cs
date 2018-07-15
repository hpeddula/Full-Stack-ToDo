using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserToDoItems.Models
{
    public class ToDoUsers
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<ToDoItem> ToDoItems { get; set; }
        public Login Login { get; set; }
    }
}
