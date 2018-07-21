using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserToDoItems.Models;
namespace UserToDoItems.Controllers
{
    [Produces("application/json")]
    [Route("api/ToDo")]
    public class ToDoController : Controller
    {
        private readonly ToDoContext _context;
        public ToDoController(ToDoContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetAllToDoItems")]
        public List<ToDoItem> GetAllToDoItems()
        {
            //var items = _context.ToDoItems.ToList();
            var itms = (from itm in _context.ToDoItems
                        join usr in _context.ToDoUsers on itm.UserID equals usr.ID
                        select new ToDoItem() { ID = itm.ID, Name = itm.Name, IsComplete = itm.IsComplete, UserID = itm.UserID, User = new ToDoUsers() { ID = usr.ID, FirstName = usr.FirstName, LastName = usr.LastName } }).ToList();
            //foreach (var item in items)
            //{

            //    item.User = (from users in _context.ToDoUsers where users.ID == item.UserID select new ToDoUsers() { FirstName = users.FirstName, LastName = users.LastName, ID = users.ID }).FirstOrDefault();
            //    //_context.ToDoUsers.Where(us => us.ID == item.UserID).FirstOrDefault();
            //}
            return itms.OrderByDescending((item) => item.ID).ToList();

        }
        [HttpGet("{id}")]
        [Route("GetToDoItemById/{id}")]
        public async Task<ToDoItem> GetToDoItemById(int id)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            return item;
        }
        [HttpGet("{uid}")]
        [Route("GetFinishedTasks/{uid}")]
        public IActionResult GetFinishedTasks(int uid)
        {

            var finishedTasks = (from items in _context.ToDoItems where items.UserID == uid && items.IsComplete == true select new ToDoItem { ID = items.ID, Name = items.Name, IsComplete = items.IsComplete, UserID = items.UserID, User = new ToDoUsers { FirstName = items.User.FirstName, LastName = items.User.LastName } }).ToList();
            if(finishedTasks == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(finishedTasks);
            }
        }
        [HttpPost]
        [Route("Create")]
        public ToDoItem CreateToDo([FromBody]ToDoItem item)
        {

            //ToDoUsers users = new ToDoUsers();
            if(item == null)
            {

            }
            _context.Add(item);
            //var result = (from td in _context.ToDoItems join tu in _context.ToDoUsers on td.UserID equals tu.ID select new { tu.FirstName, tu.LastName }).ToList();
            _context.SaveChanges();
            item.User = (from user in _context.ToDoUsers where user.ID == item.UserID select user).FirstOrDefault() ;
            item.User.ToDoItems = (from items in _context.ToDoItems where items.UserID == item.UserID select new ToDoItem{ ID=items.ID,IsComplete=items.IsComplete,Name=items.Name,UserID=items.UserID }).ToList();
            return item;
        }
        [HttpPut("{id}")]
        [Route("Update/{id}")]
        public ToDoItem UpdateToDoItem([FromBody]ToDoItem ToDo, int id)
        {
            var item = _context.ToDoItems.Find(id);
            item.Name = ToDo.Name;
            item.IsComplete = ToDo.IsComplete;
            _context.ToDoItems.Update(item);
            _context.SaveChanges();
            return item;
        }
        [HttpDelete("{id}")]
        [Route("Delete/{id}")]
        public void DeleteToDo(int id)
        {
            var item = _context.ToDoItems.Find(id);
            _context.Remove(item);
            _context.SaveChanges();

        }
    }
}