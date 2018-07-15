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
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly ToDoContext _context;
        public UsersController(ToDoContext context)
        {
            _context = context;
        }
        // Get Method which returns a list of Users.
        [HttpGet]
        [Route("GetUser")]
        public List<ToDoUsers> GetUser()
        {
            return _context.ToDoUsers.ToList();
        }
        [HttpGet("{id}")]
        [Route("GetUserById/{id}")]
        public ToDoUsers GetUser(int id)
        {
            var user = _context.ToDoUsers.Find(id);
            return user;
        }
        [HttpGet]
        [Route("GetItemByUser/{uid}")]
        public List<ToDoItem> GetItemByUser(int uid)
        {
            var items = from item in _context.ToDoItems
                        join user in _context.ToDoUsers on item.UserID equals user.ID
                        where item.UserID == uid select new ToDoItem {ID=item.ID,UserID = item.UserID, Name = item.Name, IsComplete = item.IsComplete,User = new ToDoUsers() { FirstName = user.FirstName,LastName = user.LastName} };
            
            return items.OrderByDescending((item)=>item.ID).ToList();
        }
        [HttpPost]
        [Route("CreateUser")]
        public IActionResult CreateUser([FromBody]Login user)
        {
            try
            {
                var newUser = _context.ToDoUsers.FirstOrDefault(u => u.FirstName == user.User.FirstName && u.LastName == user.User.LastName);
                if (newUser != null)
                {
                    return NotFound();
                }
                else
                {
                    _context.Add(user);
                    _context.SaveChanges();
                    return Ok(user);
                }
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        [HttpPost]
        [Route("ValidateUser")]
        public IActionResult ValidateUser([FromBody]Login user)
        {
            var existingUser = _context.UserLogin.FirstOrDefault(euser => euser.UserName == user.UserName && euser.Password == user.Password);
            if(existingUser == null)
            {
                return NotFound();
            }
            else
            {
                existingUser.User = (from euser in _context.ToDoUsers
                                     join ulogin in _context.UserLogin on euser.ID equals ulogin.UserID where ulogin.UserName == user.UserName select new ToDoUsers() { FirstName = euser.FirstName, LastName = euser.LastName }).FirstOrDefault();
                return Ok(existingUser);
            }
        }
        [HttpPut("{id}")]
        [Route("UpdateUser/{id}")]
        public ToDoUsers Update([FromBody]ToDoUsers toDoUsers, int id)
        {
            var user = _context.ToDoUsers.Find(id);
            user.FirstName = toDoUsers.FirstName;
            user.LastName = toDoUsers.LastName;
            _context.ToDoUsers.Update(user);
            _context.SaveChanges();
            return user;
        }
        [HttpDelete("{id}")]
        [Route("DeleteUser/{id}")]
        public void DeleteUser(int id)
        {
            var user = _context.ToDoUsers.Find(id);
            _context.ToDoUsers.Remove(user);
            _context.SaveChanges();
        }
    }
}