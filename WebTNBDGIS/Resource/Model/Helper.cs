using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Hosting;

namespace WebTNBDGIS.Models
{
    public class Helper
    {
        public string mahoa(string chuoi, string username)
        {

            string chuoi1, chuoi2, kq;

            chuoi1 = this.enCript(chuoi);
            chuoi2 = this.enCript(username + chuoi1 + "DITAGIS*#");
            kq = chuoi1 + ":" + chuoi2;
            return kq;
        }

        public string mahoa(string chuoi)
        {

            string chuoi1, chuoi2, kq;

            chuoi1 = this.enCript(chuoi);
            chuoi2 = this.enCript(chuoi1 + "DITAGIS*#");
            kq = chuoi1 + ":" + chuoi2;
            return kq;
        }

        public string mahoaSession(string chuoi)
        {

            string chuoi1, chuoi2, kq;

            chuoi1 = this.enCript(chuoi);
            chuoi2 = this.enCript(chuoi1 + "DITAGIS*#");
            kq = chuoi1 + ":" + chuoi2;
            return kq;
        }

        private string enCript(string chuoi)
        {
            //Hash the password
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            byte[] hashedDataBytes;
            UTF8Encoding encoder = new UTF8Encoding();
            hashedDataBytes = md5Hasher.ComputeHash(encoder.GetBytes(chuoi));
            string str;
            str = BitConverter.ToString(hashedDataBytes).Replace("-", "").ToLower();
            return str;
        }
               
        // Function to convert passed XML data to dataset
        public DataTable ConvertXMLToDataSet(string xmlData)
        {
            try
            {
                DataTable newTable = new DataTable();

                DataSet dt = new DataSet();
                dt.ReadXml(xmlData);

                newTable = dt.Tables[0];
                return newTable;
            }
            catch
            {
                return null;
            }
            finally
            {
            }
        }// Use this function to get XML string from a dataset

        //public Boolean sendMail(UserRegister contact)
        //{

        //    MailMessage mail;
        //    NetworkCredential credentials;
        //    SmtpClient client;

        //    string emailSend = "", passSend = "";
        //    string DomainName = "";

        //    mail = new MailMessage();

        //    DataSet ds = new DataSet();
        //    string path = HostingEnvironment.ApplicationPhysicalPath + @"Content\config.xml";

        //    DataTable newTable = new DataTable();
        //    newTable = ConvertXMLToDataSet(path);
        //    int i = 0;
        //    for (i = 0; i <= newTable.Rows.Count - 1; i++)
        //    {
        //        emailSend = newTable.Rows[i][0].ToString();
        //        passSend = newTable.Rows[i][1].ToString();
        //        DomainName = newTable.Rows[i][2].ToString();
        //    }

        //    if (emailSend.Trim().Length > 0 && passSend.Trim().Length > 0)
        //    {

        //        mail.From = new MailAddress(emailSend);
        //        mail.To.Add(contact.email);
        //        mail.Subject = "Thông báo từ hệ thống tra cứu thông tin quy hoạch tỉnh Bình Dương";

        //        mail.IsBodyHtml = true;

        //        string str = "";

        //        str += @"<h2>Sở xây dựng - Tỉnh Bình Dương</h2>";
        //        str += @"<h4>Hệ thống tra cứu thông tin quy hoạch tỉnh Bình Dương</h4>";
        //        str += @"<div>Xin chào bạn! <br/>Gần đây, bạn đã sử dụng địa chỉ email này để đăng ký tài khoản trong hệ thống tra cứu thông tin quy hoạch tỉnh Bình Dương. <br/>";
        //        str += @"Xin vui lòng xác nhận tài khoản của bạn với hệ thống bằng cách truy cập vào liên kết phía dưới đây : <br/><br/>";

        //        //str += @"<a href='" + DomainName + @"/bdgis/chung-thuc/" + contact.active_code + ".html'> Chứng thực tài khoản </a>  <br/> <br/>";
        //        str += @"<a href='" + DomainName + @"/chung-thuc/" + contact.active_code + ".html'> Chứng thực tài khoản </a>  <br/> <br/>";

        //        str += @"Nếu như không phải bạn đã đăng ký, xin vui lòng nhấn liên kết phía dưới để hủy bỏ tài khoản này trên hệ thống của chúng tôi .<br/><br/>";

        //        //str += @"<a href='" + DomainName + @"/bdgis/huy-tai-khoan/" + contact.active_code + ".html'> Hủy tài khoản </a>   <br/><br/>";
        //        str += @"<a href='" + DomainName + @"/huy-tai-khoan/" + contact.active_code + ".html'> Hủy tài khoản </a>   <br/><br/>";

        //        str += @"Trân trọng,<br/>Sở xây dựng Bình Dương<br/><br/></div>";
        //        str += @"<i> Chú ý : Thư này được gửi tự động từ hệ thống tra cứu thông tin quy hoạch tỉnh Bình Dương . Vui lòng không trả lời lại.<br/>Chân trọng cám ơn và chúc một ngày tốt lành !</i>";
        //        mail.Body = str;
        //        mail.IsBodyHtml = true;

        //        try
        //        {
        //            client = new SmtpClient();
        //            client.DeliveryMethod = SmtpDeliveryMethod.Network;
        //            client.EnableSsl = true;
        //            client.Host = "smtp.gmail.com";
        //            client.Port = 587;

        //            // setup Smtp authentication
        //            credentials = new NetworkCredential(emailSend, passSend);
        //            client.UseDefaultCredentials = false;
        //            client.Credentials = credentials;

        //            client.Send(mail);
        //            return true;

        //        }
        //        catch (Exception ex) { return false; }
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //}

    }
}