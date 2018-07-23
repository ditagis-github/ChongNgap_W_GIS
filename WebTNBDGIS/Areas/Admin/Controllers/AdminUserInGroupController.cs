using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using WebTNBDGIS.Models;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Areas.Admin.Controllers
{
    [Authorize]
    public class AdminUserInGroupController : Controller
    {
        private IUserInGroupRepository repository;
        private IUsersRepository userRepository;
        private IGroupUserRepository groupUserRepository;
        public AdminUserInGroupController(IGroupUserRepository groupUserRepository, IUsersRepository userRepository, IUserInGroupRepository repository)
        {
            this.groupUserRepository = groupUserRepository;
            this.userRepository = userRepository;
            this.repository = repository;
        }

        //
        // GET: /Admin/AdminUserInGroup/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Admin/AdminUserInGroup/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Admin/AdminUserInGroup/Create

        public ActionResult Create(int UserID)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang gán nhóm cho người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            Users user = null;
            user = userRepository.Users.Where(u => u.id == UserID).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Người dùng này không tồn tại";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }

            userInfor userEdit = userRepository.getInfor(user.username);
            userInfor userCanEdit = userRepository.getInfor(User.Identity.Name);

            if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");

            }

            if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }



            UserInGroup userGroup = repository.UserInGroups.Where(ug => ug.UserID == UserID).FirstOrDefault();
            if (userGroup != null)
            {
                return RedirectToAction("Edit", "AdminUserInGroup", new { UserID = UserID });
            }
            else
            {
                ViewBag.UserID = new SelectList(userRepository.Users.Where(u => u.id == UserID), "id", "username", UserID);
                if (userCanEdit.groupParent == null)
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true), "id", "name");
                }
                else
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true && g.id != userCanEdit.GroupID && g.id != userCanEdit.groupParent), "id", "name");
                }
                return View();
            }
        }

        //
        // POST: /Admin/AdminUserInGroup/Create

        [HttpPost]
        public ActionResult Create(UserInGroup collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang gán nhóm cho người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }


            Users user = null;
            user = userRepository.Users.Where(u => u.id == collection.UserID).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Người dùng này không tồn tại";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }

            userInfor userEdit = userRepository.getInfor(user.username);
            userInfor userCanEdit = userRepository.getInfor(User.Identity.Name);

            if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");

            }

            if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }



            try
            {
                // TODO: Add insert logic here
                if (ModelState.IsValid)
                {
                    repository.saveUserInGroup(collection);
                    TempData["message"] = "Đã gán quyền cho người dùng trong hệ thống.";
                    TempData["messageType"] = "inf";
                    return RedirectToAction("Index", "AdminUsers");
                }
                else
                {
                    ViewBag.UserID = new SelectList(userRepository.Users.Where(u => u.id == collection.UserID), "id", "username", collection.UserID);

                    if (userCanEdit.groupParent == null)
                    {
                        ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true), "id", "name",collection.GroupID);
                    }
                    else
                    {
                        ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true && g.id != userCanEdit.GroupID && g.id != userCanEdit.groupParent), "id", "name");
                    }
                    
                    TempData["message"] = "Dữ liệu bạn nhập vào không hợp lệ.";
                    TempData["messageType"] = "error";
                    return View(collection);
                }
            }
            catch (Exception ex)
            {
                ViewBag.UserID = new SelectList(userRepository.Users.Where(u => u.id == collection.UserID), "id", "username", collection.UserID);


                if (userCanEdit.groupParent == null)
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true), "id", "name", collection.GroupID);
                }
                else
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true && g.id != userCanEdit.GroupID && g.id != userCanEdit.groupParent), "id", "name");
                }
                TempData["message"] = "Có lỗi hệ thống :" + ex.Message;
                TempData["messageType"] = "error";
                return View(collection);
            }
        }

        //
        // GET: /Admin/AdminUserInGroup/Edit/5

        public ActionResult Edit(int UserID)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang gán nhóm cho người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }


            Users user = null;
            user = userRepository.Users.Where(u => u.id == UserID).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Người dùng này không tồn tại";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }

            userInfor userEdit = userRepository.getInfor(user.username);
            userInfor userCanEdit = userRepository.getInfor(User.Identity.Name);

            if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");

            }

            if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }



            UserInGroup userGroup = repository.UserInGroups.Where(ug => ug.UserID == UserID).FirstOrDefault();
            if (userGroup != null)
            {
                ViewBag.UserID = new SelectList(userRepository.Users.Where(u => u.id == UserID), "id", "username", UserID);


                if (userCanEdit.groupParent == null)
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true), "id", "name",userGroup.GroupID);
                }
                else
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true && g.id != userCanEdit.GroupID && g.id != userCanEdit.groupParent), "id", "name");
                }
                return View(userGroup);
            }
            else
            {
                TempData["message"] = "Người dùng này không có trong hệ thống.";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }
        }

        //
        // POST: /Admin/AdminUserInGroup/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, UserInGroup collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang gán nhóm cho người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }


            Users user = null;
            user = userRepository.Users.Where(u => u.id == collection.UserID).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Người dùng này không tồn tại";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }

            userInfor userEdit = userRepository.getInfor(user.username);
            userInfor userCanEdit = userRepository.getInfor(User.Identity.Name);

            if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");

            }

            if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminUsers");
            }


            try
            {
                // TODO: Add update logic here
                if (ModelState.IsValid)
                {
                    repository.saveUserInGroup(collection);
                    TempData["message"] = "Đã gán quyền cho người dùng trong hệ thống";
                    TempData["messageType"] = "inf";
                    return RedirectToAction("Index", "AdminUsers");
                }
                else
                {
                    ViewBag.UserID = new SelectList(userRepository.Users.Where(u => u.id == collection.UserID), "id", "username", collection.UserID);


                    if (userCanEdit.groupParent == null)
                    {
                        ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true), "id", "name", collection.GroupID);
                    }
                    else
                    {
                        ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true && g.id != userCanEdit.GroupID && g.id != userCanEdit.groupParent), "id", "name");
                    }
                    TempData["message"] = "Dữ liệu bạn nhập vào không hợp lệ.";
                    TempData["messageType"] = "error";
                    return View(collection);
                }
            }
            catch (Exception ex)
            {
                ViewBag.UserID = new SelectList(userRepository.Users.Where(u => u.id == collection.UserID), "id", "username", collection.UserID);


                if (userCanEdit.groupParent == null)
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true), "id", "name", collection.GroupID);
                }
                else
                {
                    ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.status == true && g.id != userCanEdit.GroupID && g.id != userCanEdit.groupParent), "id", "name");
                }
                
                TempData["message"] = "Có lỗi hệ thống " + ex.Message;
                TempData["messageType"] = "error";
                return View(collection);
            }
        }

        //
        // GET: /Admin/AdminUserInGroup/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Admin/AdminUserInGroup/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
