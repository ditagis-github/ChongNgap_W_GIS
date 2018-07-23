using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using WebTNBDGIS.Models;
using WebTNBDGIS.Areas.Admin.Models;

namespace WebTNBDGIS.Areas.Admin.Controllers
{
    [Authorize]
    public class AdminGroupUserController : Controller
    {
        private IGroupUserRepository repository;
        private IUsersRepository userRepository;
        public AdminGroupUserController(IGroupUserRepository repository, IUsersRepository userRepository)
        {
            this.repository = repository;
            this.userRepository = userRepository;
        }

        //
        // GET: /Admin/AdminGroupUser/

        public ActionResult Index(int FillterID = 0, string SearchString = null, int sortBy = 0, bool isAsc = true, int PageSize = 10, int page = 1)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang quản lý nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            var dbEntry = from ug in repository.GroupUsers.Include(c => c.GroupUserParent) select ug;
            if (SearchString != null)
            {
                dbEntry = dbEntry.Where(ug => ug.name.Contains(SearchString));
                page = 1; // set trang hiển thị là 1
            }

            if (FillterID != 0)
            {
                dbEntry = dbEntry.Where(ug => ug.parent == FillterID);
                page = 1;// set trang hiển thị là 1
            }

            switch (sortBy)
            {
                case 1:
                    if (isAsc)
                    {
                        dbEntry = dbEntry.OrderBy(s => s.name);
                    }
                    else
                    {
                        dbEntry = dbEntry.OrderByDescending(s => s.name);
                    }
                    break;
                case 2:
                    if (isAsc)
                    {
                        dbEntry = dbEntry.OrderBy(s => s.parent);
                    }
                    else
                    {
                        dbEntry = dbEntry.OrderByDescending(s => s.parent);
                    }
                    break;
                case 3:
                    if (isAsc)
                    {
                        dbEntry = dbEntry.OrderBy(s => s.status);
                    }
                    else
                    {
                        dbEntry = dbEntry.OrderByDescending(s => s.status);
                    }
                    break;
                default: // mặc đinh sắp xếp theo ID
                    dbEntry = dbEntry.OrderBy(s => s.id);
                    break;
            }

            int totalItem;

            totalItem = dbEntry.Count();
            dbEntry = dbEntry.Skip((page - 1) * PageSize).Take(PageSize);

            AdminGroupUserModel group = new AdminGroupUserModel
            {
                groupUser = dbEntry,
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = PageSize,
                    TotalItems = totalItem

                },
                fillterID = FillterID,
                isAsc = isAsc,
                sort = sortBy,
                strSearch = SearchString
            };

            ViewBag.FillterID = new SelectList(repository.GroupUsers, "id", "name", FillterID);
            return View(group);
        }

        //
        // GET: /Admin/AdminGroupUser/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Admin/AdminGroupUser/Create

        public ActionResult Create()
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang tạo nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            GroupUser group;
            group = new GroupUser();
            group.status = true;
            ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name");

            return View(group);
        }

        //
        // POST: /Admin/AdminGroupUser/Create

        [HttpPost]
        public ActionResult Create(GroupUser collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang tạo nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                // TODO: Add insert logic here
                if (ModelState.IsValid)
                {
                    GroupUser group = repository.GroupUsers.Where(g=> g.name.Trim() == collection.name.Trim()).FirstOrDefault();

                    if (group != null)
                    {
                        ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name");
                        TempData["message"] = "Đã có nhóm người dùng này";
                        TempData["messageType"] = "error";
                        return View(collection);
                    }
                    else
                    {

                        string result = repository.saveGroupUser(collection);
                        if (result.Trim().Length == 0)
                        {
                            TempData["message"] = "Đã thêm mới nhóm người dùng";
                            TempData["messageType"] = "inf";
                            return RedirectToAction("Index");
                        }
                        else
                        {
                            ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name");
                            TempData["message"] = result;
                            TempData["messageType"] = "error";
                            return View(collection);
                        }
                    }
                }
                else
                {
                    ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name");
                    TempData["message"] = "Dữ liệu bạn nhập vào không hợp lệ";
                    TempData["messageType"] = "error";
                    return View(collection);
                }
            }
            catch
            {
                ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name");
                return View(collection);
            }
        }

        //
        // GET: /Admin/AdminGroupUser/Edit/5

        public ActionResult Edit(int id)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang cập nhật nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            GroupUser group = repository.GroupUsers.Where(g => g.id == id).FirstOrDefault();
            if (group != null)
            {
                ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true && g.id != id && g.parent != id), "id", "name",group.parent);
                return View(group);
            }
            else
            {
                TempData["message"] = "Không có nhóm người dùng này trong hệ thống";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }
        }

        //
        // POST: /Admin/AdminGroupUser/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, GroupUser collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang cập nhật nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                if (ModelState.IsValid)
                {
                     GroupUser group = repository.GroupUsers.Where(g=> g.name.Trim() == collection.name.Trim()).FirstOrDefault();

                     if (group == null)
                     {
                         string result = repository.saveGroupUser(collection);
                         if (result.Trim().Length == 0)
                         {
                             TempData["message"] = "Đã cập nhật thông tin nhóm người dùng";
                             TempData["messageType"] = "inf";
                             return RedirectToAction("Index");
                         }
                         else
                         {
                             TempData["message"] = result;
                             TempData["messageType"] = "error";
                             ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name", collection.parent);
                             return View(collection);
                         }
                     }
                     else
                     {
                         if (group.id == collection.id)
                         {
                             string result = repository.saveGroupUser(collection);
                             if (result.Trim().Length == 0)
                             {
                                 TempData["message"] = "Đã cập nhật thông tin nhóm người dùng";
                                 TempData["messageType"] = "inf";
                                 return RedirectToAction("Index");
                             }
                             else
                             {
                                 TempData["message"] = result;
                                 TempData["messageType"] = "error";
                                 ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name", collection.parent);
                                 return View(collection);
                             }
                         }
                         else
                         {
                             TempData["message"] = "Đã có nhóm người dùng này trong hệ thống";
                             TempData["messageType"] = "error";
                             ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name", collection.parent);
                             return View(collection);
                         }
                     }
                }
                else
                {
                    TempData["message"] = "Dữ liệu bạn nhập vào không hợp lệ";
                    TempData["messageType"] = "error";
                    ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name",collection.parent);
                    return View(collection);
                }
            }
            catch (Exception ex)
            {
                TempData["message"] = "Có lỗi hệ thống : " + ex.Message;
                TempData["messageType"] = "error";
                ViewBag.parent = new SelectList(repository.GroupUsers.Where(g => g.status == true), "id", "name",collection.parent);
                return View(collection);
            }
        }

        //
        // GET: /Admin/AdminGroupUser/Delete/5

        public ActionResult Delete(int id)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang xóa nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            GroupUser group = repository.GroupUsers.Where(g => g.id == id).FirstOrDefault();
            if (group != null)
            {
                return View(group);
            }
            else
            {
                TempData["message"] = "Không có nhóm người dùng này trong hệ thống";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }
        }

        //
        // POST: /Admin/AdminGroupUser/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang xóa nhóm người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {               
                string result = repository.deleteGroupUser(id);

                if (result.Trim().Length == 0)
                {
                    result = "Đã xóa thành công ";
                }

                TempData["message"] = result;
                TempData["messageType"] = "inf";
                return RedirectToAction("Index");
            }
            catch
            {
                return View(id);
            }
        }
    }
}
