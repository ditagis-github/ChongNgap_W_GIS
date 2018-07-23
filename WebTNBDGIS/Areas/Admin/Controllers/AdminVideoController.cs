﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebTNBDGIS.Areas.Admin.Models;
using WebTNBDGIS.Models;

namespace WebTNBDGIS.Areas.Admin.Controllers
{
    public class AdminVideoController : Controller
    {
        private IVideosRepository repository;
        private IUsersRepository userRepository;
        public AdminVideoController(IVideosRepository repository, IUsersRepository userRepository)
        {
            this.repository = repository;
            this.userRepository = userRepository;
        }

        //
        // GET: /Admin/AdminVideo/

        public ActionResult Index(string SearchString = null, int sortBy = 0, bool isAsc = true, int PageSize = 10, int page = 1)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "AddFile"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang quản lý link youtube";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            var item = from ug in repository.Videos select ug;
            if (SearchString != null)
            {
                item = item.Where(ug => ug.link.Contains(SearchString));
                page = 1; // set trang hiển thị là 1
            }
            
            switch (sortBy)
            {
                case 1:
                    if (isAsc)
                    {
                        item = item.OrderBy(s => s.link);
                    }
                    else
                    {
                        item = item.OrderByDescending(s => s.link);
                    }

                    break;
                default: // mặc đinh sắp xếp theo ID
                    item = item.OrderBy(s => s.id);
                    break;
            }

            int totalItem;

            totalItem = item.Count();
            item = item.Skip((page - 1) * PageSize).Take(PageSize);

            AdminVideosModel items = new AdminVideosModel
            {
                Videos = item,
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = PageSize,
                    TotalItems = totalItem

                },
                isAsc = isAsc,
                sort = sortBy,
                strSearch = SearchString
            };

            return View(items);
        }

        //
        // GET: /Admin/AdminVideo/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Admin/AdminVideo/Create

        public ActionResult Create()
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "AddFile"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang tạo link youtube";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            return View();
        }

        //
        // POST: /Admin/AdminVideo/Create

        [HttpPost]
        public ActionResult Create(Videos collection)
        {

            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "AddFile"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang tạo link youtube";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                if (ModelState.IsValid)
                {
                    repository.saveVideo(collection);
                    TempData["message"] = "Đã thêm mới link youtube ";
                    TempData["messageType"] = "inf";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["message"] = "Dữ liệu bạn nhập vào không hợp lệ";
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
        // GET: /Admin/AdminVideo/Edit/5

        public ActionResult Edit(int id)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "AddFile"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang cập nhật link youtube";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }
            Videos item = repository.Videos.FirstOrDefault(a => a.id == id);

            if (item != null)
            {
                return View(item);
            }
            else
            {
                TempData["message"] = "Không có link youtube này trong hệ thống";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }
        }

        //
        // POST: /Admin/AdminVideo/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, Videos collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "AddFile"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang cập nhật link youtube";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                if (ModelState.IsValid)
                {
                    repository.saveVideo(collection);
                    TempData["message"] = "Đã cập nhật mới link youtube ";
                    TempData["messageType"] = "inf";
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["message"] = "Dữ liệu bạn nhập vào không hợp lệ";
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
        // GET: /Admin/AdminVideo/Delete/5

        public ActionResult Delete(int id)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "AddFile"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang xóa link youtube";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }
            Videos item = repository.Videos.FirstOrDefault(a => a.id == id);

            if (item != null)
            {
                return View(item);
            }
            else
            {
                TempData["message"] = "Không có link youtube này trong hệ thống";
                TempData["messageType"] = "error";
                return RedirectToAction("Index");
            }
        }

        //
        // POST: /Admin/AdminVideo/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            if (!Request.IsAuthenticated || !userRepository.canAccessData(User.Identity.Name, "AddFile"))
            {
                TempData["message"] = "Bạn không có quyền truy cập vào trang xóa link youtube";
                TempData["messageType"] = "error";
                return RedirectToAction("Index", "AdminHome");
            }

            try
            {
                repository.deleteVideo(id);
                TempData["message"] = "Đã xóa link youtube";
                TempData["messageType"] = "inf";
                return RedirectToAction("Index");
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
