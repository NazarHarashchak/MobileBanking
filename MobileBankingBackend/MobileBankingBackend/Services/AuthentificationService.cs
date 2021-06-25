using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Interfaces;
using MobileBankingBackend.DTOs;
using MobileBankingBackend.Models;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace MobileBankingBackend.Services
{
    public class AuthentificationService : IAuthentificationService
    {
        private readonly DatabaseContext _context;
        public AuthentificationService(DatabaseContext context)
        {
            _context = context;
        }
        public AuthentificationDTO Authentificate(AuthentificationDTO user)
        {
            byte[] userPassword = ASCIIEncoding.ASCII.GetBytes(user.Password);
            var hashPassword = new MD5CryptoServiceProvider().ComputeHash(userPassword);

            AuthentificationDTO result = new AuthentificationDTO()
            {
                Success = false
            };

            try
            {
                var userDB = _context.Users.Where(item => item.Login.ToLower().Trim() == user.Login.Trim().ToLower())
                                   .Include(item => item.UserApplicationRole).FirstOrDefault();
                if (userDB == null  || !ComparePasswords(userDB.Password, hashPassword))
                {
                    result.Message = "Такого користувача неіснує";
                    return result;
                }
                

                result.Login = user.Login;
                result.ID = userDB.ID;
                result.RoleID = userDB.UserApplicationRole.ID;
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }
        public AuthentificationDTO Registrate(AuthentificationDTO user)
        {
            var result = new AuthentificationDTO()
            {
                Success = false
            };

            try
            {
                byte[] password = ASCIIEncoding.ASCII.GetBytes(user.Password);

                var userDB = new User()
                {
                    Login = user.Login,
                    Password = new MD5CryptoServiceProvider().ComputeHash(password),
                    DateCreated = DateTime.Now,
                    UserApplicationRole = _context.UserApplicationRoles.Where(role => role.ID == (int)Constants.UserApplicationRoles.Customer).FirstOrDefault()
                };

                var userInfoDB = new UserInformation()
                {
                    User = userDB
                };

                var customerDB = new Customer()
                {
                    User = userDB
                };

                userDB.Customer = customerDB;
                userDB.UserInformation = userInfoDB;

                _context.Users.Add(userDB);
                _context.UserInformations.Add(userInfoDB);
                _context.Customers.Add(customerDB);
                _context.SaveChanges();

                result.ID = userDB.ID;
                result.RoleID = userDB.UserApplicationRole.ID;
                result.Login = userDB.Login;
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }
        public static bool ComparePasswords(byte[] password1, byte[] password2)
        {
            bool equal = false;
            if (password1.Length == password2.Length)
            {
                int i = 0;
                while ((i < password1.Length) && (password1[i] == password2[i]))
                {
                    i += 1;
                }
                if (i == password1.Length)
                {
                    equal = true;
                }
            }
            return equal;
        }
    }
}
