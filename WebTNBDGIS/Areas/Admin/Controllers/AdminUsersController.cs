using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebTNBDGIS.Areas.Admin.Models;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Areas.Admin.Controllers
{
   [Authorize]
    public class AdminUsersController : Controller
    {
        private IUsersRepository repository;
        private IGroupRoleRepository groupRoleRepository;
        private IUserInGroupRepository userInGroupRepository;
        private Helper help;

        public AdminUsersController(IUsersRepository repository, IGroupRoleRepository groupRoleRepository, IUserInGroupRepository userInGroupRepository)
        {
            this.repository = repository;
            this.groupRoleRepository = groupRoleRepository;
            this.userInGroupRepository = userInGroupRepository;
            help = new Helper();
        }

        //
        // GET: /Admin/AdminUsers/

        public ActionResult Index(int FillterID = 0, string SearchString = null, int sortBy = 0, bool isAsc = true, int PageSize = 10, int page = 1)
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang quản lý người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            var dbEntry = from ug in repository.Users select ug;
            if (SearchString != null)
            {
                dbEntry = dbEntry.Where(ug => ug.username.Contains(SearchString));
                page = 1; // set trang hiển thị là 1
            }

            if (FillterID != 0)
            {
                dbEntry = dbEntry.Where(ug => ug.id == FillterID);
                page = 1;// set trang hiển thị là 1
            }

            switch (sortBy)
            {
                case 1:
                    if (isAsc)
                    {
                        dbEntry = dbEntry.OrderBy(s => s.username);
                    }
                    else
                    {
                        dbEntry = dbEntry.OrderByDescending(s => s.username);
                    }
                    break;
                case 2:
                    if (isAsc)
                    {
                        dbEntry = dbEntry.OrderBy(s => s.NameDisplay);
                    }
                    else
                    {
                        dbEntry = dbEntry.OrderByDescending(s => s.NameDisplay);
                    }
                    break;
                case 3:
                    if (isAsc)
                    {
                        dbEntry = dbEntry.OrderBy(s => s.email);
                    }
                    else
                    {
                        dbEntry = dbEntry.OrderByDescending(s => s.email);
                    }
                    break;
                case 4:
                    if (isAsc)
                    {
                        dbEntry = dbEntry.OrderBy(s => s.Status);
                    }
                    else
                    {
                        dbEntry = dbEntry.OrderByDescending(s => s.Status);
                    }
                    break;
                default: // mặc đinh sắp xếp theo ID
                    dbEntry = dbEntry.OrderBy(s => s.id);
                    break;
            }

            int totalItem;

            totalItem = dbEntry.Count();
            dbEntry = dbEntry.Skip((page - 1) * PageSize).Take(PageSize);

            AdminUsersModel user = new AdminUsersModel
            {
                Users = dbEntry,
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

            // ViewBag.FillterID = new SelectList(categoryRepository.Categories, "id", "TenLoai", FillterID);
            return View(user);
        }

        //
        // GET: /Admin/AdminUsers/Details/5

        public ActionResult Details(int id)
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang xem thông tin người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            Users user = null;
            user = repository.Users.Where(u => u.id == id).FirstOrDefault();
            if (user != null)
            {
                List<SelectListItem> list;
                list = new List<SelectListItem>()
                {
                    new SelectListItem() {Text="Phân nhóm cho người dùng ", Value="UserInGroup"},
                    new SelectListItem() { Text="Phân quyền cho nhóm người dùng", Value="GroupRole"},
                    new SelectListItem() {Text="Quản lý nhóm người dùng", Value="GroupUser"},
                    new SelectListItem() { Text="Quản lý người dùng", Value="Users"}
                };
                ViewBag.ListData = list;

                UserInGroup ug = userInGroupRepository.UserInGroups.Where(u => u.UserID == user.id).FirstOrDefault();
                if (ug != null)
                {
                    ViewBag.GroupRole = from gr in groupRoleRepository.GroupRoles.Where(g => g.GroupID == ug.GroupID) select gr;
                }
                return View(user);
            }
            else
            {
                TempData["message"] = "Người dùng này không tồn tại";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }
        }

        //
        // GET: /Admin/AdminUsers/Create

        public ActionResult Create()
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang tạo người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            Users user = new Users();
            user.DateCreate = DateTime.Now;
            user.active = true;
            user.Status = true;
            return View(user);
        }

        //
        // POST: /Admin/AdminUsers/Create

        [HttpPost]
        public ActionResult Create(Users collection)
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang tạo người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                // TODO: Add insert logic here
                if (ModelState.IsValid)
                {
                    Users user = null;
                    user = repository.Users.Where(u => u.username.Trim() == collection.username.Trim()).FirstOrDefault();
                    if (user != null)
                    {
                        TempData["message"] = "Đã có người dùng : " + collection.username + " trong hệ thống.";
                        TempData["messageType"] = "error";
                        return View(collection);
                    }

                    user = repository.Users.Where(u => u.email.Trim() == collection.email.Trim()).FirstOrDefault();
                    if (user != null)
                    {
                        TempData["message"] = "Địa chỉ email này đã được sử dụng. Vui lòng nhập địa chỉ mail khác";
                        TempData["messageType"] = "error";
                        return View(collection);
                    }

                    collection.pass = help.mahoa(collection.pass); // mã hóa md5 chp password
                    collection.c_pass = collection.pass;

                   string result = repository.saveUser(collection);
                   if (result.Trim().Length == 0)
                   {
                       TempData["message"] = "Đã thêm mới người dùng";
                       TempData["messageType"] = "inf";
                      
                       return RedirectToAction("Index");
                   }
                   else
                   {
                       TempData["message"] = result;
                       TempData["messageType"] = "error";
                       return View(collection);
                   }
                }
                else
                {
                    TempData["message"] = "Dữ liệu bạn nhập không hợp lệ";
                    TempData["messageType"] = "error";
                    return View(collection);
                }
            }
            catch (Exception ex)
            {
                TempData["message"] = "Có lỗi hệ thống : " + ex.Message;
                TempData["messageType"] = "error";
                return View(collection);
            }
        }

        //
        // GET: /Admin/AdminUsers/Edit/5

        public ActionResult Edit(int id)
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang cập nhật người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            Users user = null;
            user = repository.Users.Where(u => u.id == id).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Người dùng này không tồn tại";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }

            userInfor userEdit = repository.getInfor(user.username);
            userInfor userCanEdit = repository.getInfor(User.Identity.Name);

            if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");

            }

            if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }

            return View(user);
        }

        //
        // POST: /Admin/AdminUsers/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, Users collection)
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang cập nhật người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {

                if (ModelState.IsValid)
                {
                    Users user = null;
                    user = repository.Users.Where(u => u.username.Trim() == collection.username.Trim() && u.id == id).FirstOrDefault();
                    if (user == null)
                    {
                        TempData["message"] = "Mã ID và tên đăng nhập không khớp. Hệ thống không cho phép thực hiện lệnh này.";
                        TempData["messageType"] = "error";
                        return View(collection);
                    }

                    if (user.email != collection.email)
                    {
                        user = repository.Users.Where(u => u.email.Trim() == collection.email.Trim()).FirstOrDefault();
                        if (user != null)
                        {
                            TempData["message"] = "Địa chỉ email này đã được sử dụng. Vui lòng nhập địa chỉ email khác.";
                            TempData["messageType"] = "error";
                            return View(collection);
                        }
                    }

                    userInfor userEdit = repository.getInfor(collection.username);
                    userInfor userCanEdit = repository.getInfor(User.Identity.Name);

                    if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
                    {
                        string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                        message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                        message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";
                        TempData["message"] = message;
                        TempData["messageType"] = "error";
                        return RedirectToAction("Index");

                    }

                    if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
                    {
                        string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                        message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                        message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền chỉnh sửa tài khoản này";

                        TempData["message"] = message;
                        TempData["messageType"] = "error";
                        return RedirectToAction("Index");
                    }

                   string result =  repository.saveUser(collection);
                   if (result.Trim().Length == 0)
                   {
                       TempData["message"] = "Cập nhật người dùng thành công";
                       TempData["messageType"] = "inf";
                       return RedirectToAction("Index");
                   }
                   else
                   {
                       TempData["message"] = result;
                       TempData["messageType"] = "error";
                       return View(collection); 
                   }
                }
                else
                {
                    TempData["message"] = "Dữ liệu bạn nhập không hợp lệ";
                    TempData["messageType"] = "error";
                    return View(collection);
                }
            }
            catch (Exception ex)
            {
                TempData["message"] = "Có lỗi hệ thống : " + ex.Message;
                TempData["messageType"] = "error";
                return View(collection);
            }
        }

        //
        // GET: /Admin/AdminUsers/Delete/5

        public ActionResult Delete(int id)
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang xóa người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }


            Users user = null;
            user = repository.Users.Where(u => u.id == id).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Không có người dùng này trong hệ thống";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }


            userInfor userEdit = repository.getInfor(user.username);
            userInfor userCanEdit = repository.getInfor(User.Identity.Name);

            if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền xóa tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");

            }

            if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền xóa tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }

            return View(user);
        }

        //
        // POST: /Admin/AdminUsers/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, Users collection)
        {
            if (!Request.IsAuthenticated || !repository.canAccessData(User.Identity.Name, "QuanTriNguoiDung"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang xóa người dùng";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            Users user = null;
            user = repository.Users.Where(u => u.username.Trim() == collection.username.Trim() && u.id == id).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Mã ID và tên đăng nhập không khớp. Hệ thống không cho phép thực hiện lệnh này.";
                TempData["messageType"] = "error";
                return View(collection);
            }


            userInfor userEdit = repository.getInfor(user.username);
            userInfor userCanEdit = repository.getInfor(User.Identity.Name);

            if (userEdit.GroupID != null && userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền xóa tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");

            }

            if (userEdit.GroupID != null && userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền xóa tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }

            string result = repository.deleteUser(id);

            if (result.Trim().Length == 0)
            {
                result = "Đã xóa thành công ";
            }

            TempData["message"] = result;
            TempData["messageType"] = "inf";
            return RedirectToAction("Index");
        }

        public ActionResult ChangePass(int id)
        {
            Users user = null;
            user = repository.Users.Where(u => u.id == id).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Không có người dùng này trong hệ thống.";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }

            userInfor userEdit = repository.getInfor(user.username);
            userInfor userCanEdit = repository.getInfor(User.Identity.Name);

            if (userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền đổi mật khẩu tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");

            }

            if (userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền đổi mật khẩu tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }
            return View(user);
        }

        [HttpPost]
        public ActionResult ChangePass(int id, Users collection)
        {
            Users user = null;
            user = repository.Users.Where(u => u.id == id && u.username.Trim() == collection.username.Trim()).FirstOrDefault();
            if (user == null)
            {
                TempData["message"] = "Mã ID và tên đăng nhập không khớp. Hệ thống không cho phép thực hiện lệnh này.";
                TempData["messageType"] = "error";
                return View(collection);
            }

            userInfor userEdit = repository.getInfor(user.username);
            userInfor userCanEdit = repository.getInfor(User.Identity.Name);

            if (userCanEdit.groupParent == userEdit.GroupID)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền cao hơn bạn trong hệ thống . Bạn không có quyền đổi mật khẩu tài khoản này";
                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");

            }

            if (userCanEdit.GroupID == userEdit.GroupID && userCanEdit.username != userEdit.username && userCanEdit.id != userEdit.id)
            {
                string message = "Rất lấy làm tiếc " + userCanEdit.NameDisplay + " ! <br/> ";
                message += "Tài khoản : " + userEdit.username + " là một " + userEdit.groupName + " <br/>";
                message += "Tài khoản này có quyền ngang hàng với bạn trong hệ thống . Bạn không có quyền đổi mật khẩu tài khoản này";

                TempData["message"] = message;
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }

            user.pass = help.mahoa(collection.pass); // mã hóa md5 chp password  
            repository.changePass(user);
            TempData["message"] = "Đã đổi mật khẩu người dùng ";
            TempData["messageType"] = "inf";
            return RedirectToAction("Index");
        }


    }
}
