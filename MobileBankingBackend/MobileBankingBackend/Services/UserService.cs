using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Interfaces;
using MobileBankingBackend.DTOs;
using MobileBankingBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;

namespace MobileBankingBackend.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _context;
        public UserService(DatabaseContext context)
        {
            _context = context;
        }
        public UserDTO GetUser(int userID)
        {
            var result = new UserDTO()
            {
                Success = false
            };

            try
            {
                var userDB = _context.Users.Where(item => item.ID == userID).Include(item => item.UserApplicationRole).Include(item => item.UserInformation).FirstOrDefault();

                if (userDB == null)
                {
                    result.Success = false;
                    result.Message = "";
                    return result;
                }

                result.Name = userDB.UserInformation?.Name ?? "";
                result.SecondName = userDB.UserInformation?.SecondName ?? "";
                result.PhoneNumber = userDB.UserInformation?.PhoneNumber ?? "";
                result.Email = userDB.Login ?? "";
                result.IsActive = userDB.IsActive;
                result.Country = userDB.UserInformation?.Country ?? "";
                result.City = userDB.UserInformation?.City ?? "";
                result.Street = userDB.UserInformation?.StreetName ?? "";
                result.ID = userDB.ID;
                result.IsPrivateHouse = userDB.UserInformation?.IsPrivateHouse ?? false;
                result.HouseNumber = userDB.UserInformation?.HouseNumber ?? "";
                result.AppartmentsNumber = userDB.UserInformation?.AppartmentsNumber ?? 0;
                result.Age = userDB.UserInformation?.Age ?? 0;
                result.Image = userDB.UserInformation?.Image ?? "";
                result.RoleID = userDB.UserApplicationRole?.ID ?? 0;
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public ResultDTO SaveUser(UserDTO user)
        {
            var result = new ResultDTO();


            try
            {
                var userDB = _context.Users.Where(item => (item.Login == user.Email) || (item.UserInformation.PhoneNumber == user.PhoneNumber)).FirstOrDefault();

                if (userDB != null)
                {
                    result.Success = false;
                    result.Message = "Користувач з таким емейлом чи номером телефону вже існує!";
                    return result;
                }

                userDB = new User();

                byte[] password = ASCIIEncoding.ASCII.GetBytes(user.Password);

                userDB.Login = user.Email;
                userDB.Password = new MD5CryptoServiceProvider().ComputeHash(password);
                userDB.IsActive = true;
                userDB.UserApplicationRole = _context.UserApplicationRoles.Where(role => role.ID == user.RoleID).FirstOrDefault();

                var userInfo = new UserInformation();

                userInfo.User = userDB;
                userInfo.Age = user.Age;
                userInfo.Name = user.Name;
                userInfo.SecondName = user.SecondName;
                userInfo.PhoneNumber = user.PhoneNumber;
                userInfo.Country = user.Country;
                userInfo.City = user.City;
                userInfo.StreetName = user.Street;
                userInfo.HouseNumber = user.HouseNumber;
                userInfo.IsPrivateHouse = user.IsPrivateHouse;
                userInfo.AppartmentsNumber = user.AppartmentsNumber;

                userDB.UserInformation = userInfo;

                _context.Users.Add(userDB);
                _context.UserInformations.Add(userInfo);
                _context.SaveChanges();

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public ListUsersDTO GetAllUsers()
        {
            var result = new ListUsersDTO();

            try
            {
                var users = _context.Users.Include(item => item.UserApplicationRole).Include(item => item.UserInformation).ToList();

                result.Users = new List<UserDTO>();

                foreach (var user in users)
                {
                    result.Users.Add(new UserDTO()
                    {
                        Name = user.UserInformation?.Name,
                        SecondName = user.UserInformation?.SecondName,
                        PhoneNumber = user.UserInformation?.PhoneNumber,
                        Email = user.Login,
                        IsActive = user.IsActive,
                        Country = user.UserInformation?.Country,
                        City = user.UserInformation?.City,
                        Street = user.UserInformation?.StreetName,
                        ID = user.ID,
                        IsPrivateHouse = user.UserInformation?.IsPrivateHouse ?? false,
                        HouseNumber = user.UserInformation?.HouseNumber,
                        AppartmentsNumber = user.UserInformation?.AppartmentsNumber ?? 0,
                        Age = user.UserInformation?.Age ?? 0,
                        Image = user.UserInformation?.Image,
                        RoleID = user.UserApplicationRole?.ID ?? 0,
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }

        public ListUsersDTO BlockUser(int userID)
        {
            var result = new ListUsersDTO();

            try
            {
                var userDB = _context.Users.Where(item => item.ID == userID).FirstOrDefault();

                if (userDB == null)
                {
                    result.Success = false;
                    result.Message = "Такого користувача не існує!";
                    return result;
                }

                userDB.IsActive = !userDB.IsActive;

                _context.Users.Update(userDB);
                _context.SaveChanges();

                var users = _context.Users.Include(item => item.UserApplicationRole).Include(item => item.UserInformation).ToList();

                result.Users = new List<UserDTO>();

                foreach (var user in users)
                {
                    result.Users.Add(new UserDTO()
                    {
                        Name = user.UserInformation?.Name ,
                        SecondName = user.UserInformation?.SecondName,
                        PhoneNumber = user.UserInformation?.PhoneNumber,
                        Email = user.Login,
                        IsActive = user.IsActive,
                        Country = user.UserInformation?.Country,
                        City = user.UserInformation?.City,
                        Street = user.UserInformation?.StreetName,
                        ID = user.ID,
                        IsPrivateHouse = user.UserInformation?.IsPrivateHouse ?? false,
                        HouseNumber = user.UserInformation?.HouseNumber,
                        AppartmentsNumber = user.UserInformation?.AppartmentsNumber ?? 0,
                        Age = user.UserInformation?.Age ?? 0,
                        Image = user.UserInformation?.Image,
                        RoleID = user.UserApplicationRole?.ID ?? 0,
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }

        public ListUsersDTO EditUserData(UserDTO user)
        {
            var result = new ListUsersDTO();

            try
            {
                var userDB = _context.Users.Where(item => item.ID == user.ID).Include(item => item.UserApplicationRole).Include(item => item.UserInformation).FirstOrDefault();

                if (userDB == null)
                {
                    result.Success = false;
                    result.Message = "Такого користувача немає!";
                    return result;
                }

                userDB.Login = user.Email;
                userDB.UserApplicationRole = _context.UserApplicationRoles.Where(item => item.ID == user.RoleID).FirstOrDefault();

                var userInfo = userDB.UserInformation;

                userInfo.Name = user.Name;
                userInfo.SecondName = user.SecondName;
                userInfo.Age = user.Age;
                userInfo.PhoneNumber = user.PhoneNumber;
                userInfo.Country = user.Country;
                userInfo.City = user.City;
                userInfo.StreetName = user.Street;
                userInfo.HouseNumber = user.HouseNumber;
                userInfo.IsPrivateHouse = user.IsPrivateHouse;
                userInfo.AppartmentsNumber = user.AppartmentsNumber;

                _context.Users.Update(userDB);
                _context.UserInformations.Update(userInfo);
                _context.SaveChanges();

                var users = _context.Users.Include(item => item.UserApplicationRole).Include(item => item.UserInformation).ToList();

                result.Users = new List<UserDTO>();

                foreach (var userItem in users)
                {
                    result.Users.Add(new UserDTO()
                    {
                        Name = userItem.UserInformation?.Name,
                        SecondName = userItem.UserInformation?.SecondName,
                        PhoneNumber = userItem.UserInformation?.PhoneNumber,
                        Email = userItem.Login,
                        IsActive = userItem.IsActive,
                        Country = userItem.UserInformation?.Country,
                        City = userItem.UserInformation?.City,
                        Street = userItem.UserInformation?.StreetName,
                        ID = userItem.ID,
                        IsPrivateHouse = userItem.UserInformation?.IsPrivateHouse ?? false,
                        HouseNumber = userItem.UserInformation?.HouseNumber,
                        AppartmentsNumber = userItem.UserInformation?.AppartmentsNumber ?? 0,
                        Age = userItem.UserInformation?.Age ?? 0,
                        Image = userItem.UserInformation?.Image,
                        RoleID = userItem.UserApplicationRole?.ID ?? 0,
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public UserDTO EditMyUserData(UserDTO user)
        {
            var result = new UserDTO();

            try
            {
                var userDB = _context.Users.Where(item => item.ID == user.ID).Include(item => item.UserApplicationRole).Include(item => item.UserInformation).FirstOrDefault();

                if (userDB == null)
                {
                    result.Success = false;
                    result.Message = "Такого користувача немає!";
                    return result;
                }

                userDB.Login = user.Email;

                var userInfo = userDB.UserInformation;

                userInfo.Name = user.Name;
                userInfo.SecondName = user.SecondName;
                userInfo.Age = user.Age;
                userInfo.PhoneNumber = user.PhoneNumber;
                userInfo.Country = user.Country;
                userInfo.City = user.City;
                userInfo.StreetName = user.Street;
                userInfo.HouseNumber = user.HouseNumber;
                userInfo.IsPrivateHouse = user.IsPrivateHouse;
                userInfo.AppartmentsNumber = user.AppartmentsNumber;

                _context.Users.Update(userDB);
                _context.UserInformations.Update(userInfo);
                _context.SaveChanges();

                result = new UserDTO()
                {
                    Name = userDB.UserInformation?.Name ?? "",
                    SecondName = userDB.UserInformation?.SecondName ?? "",
                    PhoneNumber = userDB.UserInformation?.PhoneNumber ?? "",
                    Email = userDB.Login ?? "",
                    IsActive = userDB.IsActive,
                    Country = userDB.UserInformation?.Country ?? "",
                    City = userDB.UserInformation?.City ?? "",
                    Street = userDB.UserInformation?.StreetName ?? "",
                    ID = userDB.ID,
                    IsPrivateHouse = userDB.UserInformation?.IsPrivateHouse ?? false,
                    HouseNumber = userDB.UserInformation?.HouseNumber ?? "",
                    AppartmentsNumber = userDB.UserInformation?.AppartmentsNumber ?? 0,
                    Age = userDB.UserInformation?.Age ?? 0,
                    Image = userDB.UserInformation?.Image ?? "",
                    RoleID = userDB.UserApplicationRole?.ID ?? 0,
                };

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }

        public ListUsersDTO GetUsersForWorker()
        {
            var result = new ListUsersDTO();

            try
            {
                var users = _context.Users.Where(item => item.Customer != null).Include(item => item.UserApplicationRole).Include(item => item.UserInformation)
                            .Include(item => item.Customer).ToList();

                result.Users = new List<UserDTO>();

                foreach (var userItem in users)
                {
                    result.Users.Add(new UserDTO()
                    {
                        Name = userItem.UserInformation?.Name,
                        SecondName = userItem.UserInformation?.SecondName,
                        PhoneNumber = userItem.UserInformation?.PhoneNumber,
                        Email = userItem.Login,
                        IsActive = userItem.IsActive,
                        Country = userItem.UserInformation?.Country,
                        City = userItem.UserInformation?.City,
                        Street = userItem.UserInformation?.StreetName,
                        ID = userItem.ID,
                        IsPrivateHouse = userItem.UserInformation?.IsPrivateHouse ?? false,
                        HouseNumber = userItem.UserInformation?.HouseNumber,
                        AppartmentsNumber = userItem.UserInformation?.AppartmentsNumber ?? 0,
                        Age = userItem.UserInformation?.Age ?? 0,
                        Image = userItem.UserInformation?.Image
                    });
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }

        public CustomerDTO GetCustomerData(int userID)
        {
            var result = new CustomerDTO();

            try
            {
                var userDB = _context.Users.Where(item => item.ID == userID).Include(item => item.UserApplicationRole).Include(item => item.UserInformation)
                            .Include(item => item.Customer).FirstOrDefault();

                if (userDB == null)
                {
                    result.Success = false;
                    result.Message = "Такого користувача не знайдено!";
                    return result;
                }

                result = new CustomerDTO()
                {
                    ID = userDB.ID,
                    Email = userDB.Login,
                    IsActive = userDB.IsActive,

                    Name = userDB.UserInformation?.Name,
                    SecondName = userDB.UserInformation?.SecondName,
                    PhoneNumber = userDB.UserInformation?.PhoneNumber,
                    Country = userDB.UserInformation?.Country,
                    City = userDB.UserInformation?.City,
                    Street = userDB.UserInformation?.StreetName,
                    IsPrivateHouse = userDB.UserInformation?.IsPrivateHouse ?? false,
                    HouseNumber = userDB.UserInformation?.HouseNumber,
                    AppartmentsNumber = userDB.UserInformation?.AppartmentsNumber ?? 0,
                    Age = userDB.UserInformation?.Age ?? 0,
                    Image = userDB.UserInformation?.Image,

                    PassportCode = userDB.Customer?.PassportCode,
                    PassportNumber = userDB.Customer?.PassportNumber,
                    TaxCode = userDB.Customer?.TaxCode,

                    PassportImageAddressPage1 = userDB.Customer?.PassportImageAddressPage1,
                    PassportImageAddressPage2 = userDB.Customer?.PassportImageAddressPage2,
                    PassportImageFirstPage = userDB.Customer?.PassportImageFirstPage,
                    PassportImageSecondPage = userDB.Customer?.PassportImageSecondPage,
                    TaxCodeImage = userDB.Customer?.TaxCodeImage,
                    
                    IsPassportImageAddressPage1Right = userDB.Customer?.IsPassportImageAddressPage1Right ?? false,
                    IsPassportImageFirstPageRight = userDB.Customer?.IsPassportImageFirstPageRight ?? false,
                    IsPassportImageSecondPageRight = userDB.Customer?.IsPassportImageSecondPageRight ?? false,
                    IsPPassportImageAddressPage2Right = userDB.Customer?.IsPPassportImageAddressPage2Right ?? false,
                    IsTaxCodeImageRight = userDB.Customer?.IsTaxCodeImageRight ?? false
                };

                result.Success = true;
            }
            catch(Exception ex)
            {
                result.Message = ex.Message;
                result.Success = false;
            }

            return result;
        }
        public CustomerDTO SaveUserPassportData(CustomerDTO userDTO)
        {
            var result = new CustomerDTO();

            try
            {
                var customerDB = _context.Customers.Where(item => item.UserID == userDTO.ID).FirstOrDefault();

                if (customerDB == null)
                {
                    result.Success = false;
                    result.Message = "Такого користувача не існує!";
                    return result;
                }

                customerDB.PassportCode = userDTO.PassportCode;
                customerDB.PassportNumber = userDTO.PassportNumber;
                customerDB.TaxCode = userDTO.TaxCode;

                customerDB.PassportImageFirstPage = userDTO.PassportImageFirstPage;
                customerDB.PassportImageSecondPage = userDTO.PassportImageSecondPage;
                customerDB.PassportImageAddressPage1 = userDTO.PassportImageAddressPage1;
                customerDB.PassportImageAddressPage2 = userDTO.PassportImageAddressPage2;
                customerDB.TaxCodeImage = userDTO.TaxCodeImage;

                _context.Customers.Update(customerDB);
                _context.SaveChanges();

                result = userDTO;

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
            }

            return result;
        }

    }
}
