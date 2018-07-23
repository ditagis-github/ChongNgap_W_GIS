using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebTNBDGIS.Models;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Areas.Admin.Controllers
{
    [Authorize]
    public class AdminGroupRoleController : Controller
    {
        private IGroupUserRepository groupUserRepository;
        private IGroupRoleRepository repository;
        private IUsersRepository userRepository;

        public AdminGroupRoleController(IGroupRoleRepository repository, IGroupUserRepository groupUserRepository, IUsersRepository userRepository)
        {
            this.repository = repository;
            this.groupUserRepository = groupUserRepository;
            this.userRepository = userRepository;
        }

        //
        // GET: /Admin/AdminGroupRole/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Admin/AdminGroupRole/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Admin/AdminGroupRole/Create

        public ActionResult Create(int GroupID)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang phân quyền nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            ViewBag.GroupID = new SelectList(groupUserRepository.GroupUsers.Where(g => g.id == GroupID), "id", "name", GroupID);
            GroupRole collection = repository.GroupRoles.Where(g => g.GroupID == GroupID).FirstOrDefault();
            return View(collection);
        }

        //
        // POST: /Admin/AdminGroupRole/Create

        [HttpPost]
        public ActionResult Create(GroupRole collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang phân quyền nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                // TODO: Add insert logic here

                GroupRole groupRole = repository.GroupRoles.Where(gr => gr.GroupID == collection.GroupID).FirstOrDefault();

                if (groupRole != null)
                {
                    collection.id = groupRole.id;
                }

                repository.saveGroupRole(collection);
                TempData["message"] = "Đã phân quyền cho nhóm người dùng";
                TempData["messageType"] = "inf";
                return RedirectToAction("Create", new { GroupID = collection.GroupID });
            }
            catch (Exception ex)
            {
                TempData["message"] = "Có lỗi hệ thống : " + ex.Message;
                TempData["messageType"] = "error";
                return View(new { GroupID = collection.GroupID });
            }
        }

        //
        // GET: /Admin/AdminGroupRole/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Admin/AdminGroupRole/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Admin/AdminGroupRole/Delete/5

        public ActionResult Delete(int id, int GroupID)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang phân quyền nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            GroupRole groupRole = repository.GroupRoles.Where(gr => gr.id == id).FirstOrDefault();

            if (groupRole != null)
            {
                GroupUser groupUser = groupUserRepository.GroupUsers.Where(g => g.id == GroupID).FirstOrDefault();
                ViewBag.Group = groupUser;
                return View(groupRole);
            }
            else
            {
                TempData["message"] = "Không tìm thấy quyền của nhóm trong hệ thống";
                TempData["messageType"] = "error";
                return RedirectToAction("Create", new { GroupID = GroupID });
            }

        }

        //
        // POST: /Admin/AdminGroupRole/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, GroupRole collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang phân quyền nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                string result = repository.deleteGroupRole(id);

                if (result.Trim().Length == 0)
                {
                    result = "Đã xóa thành công ";
                }

                TempData["message"] = result;
                TempData["messageType"] = "inf";
                return RedirectToAction("Create", new { GroupID = collection.GroupID });
            }
            catch (Exception ex)
            {
                TempData["message"] = "Có lỗi hệ thống : " + ex.Message;
                TempData["messageType"] = "error";
                return View(id);
            }
        }
    }
}
