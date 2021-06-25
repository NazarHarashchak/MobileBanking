using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;

namespace MobileBankingBackend.Interfaces
{
    public interface IUserService
    {
        public UserDTO GetUser(int userID);
        public ResultDTO SaveUser(UserDTO user);
        public ListUsersDTO GetAllUsers();
        public ListUsersDTO BlockUser(int userID);
        public ListUsersDTO EditUserData(UserDTO user);
        public UserDTO EditMyUserData(UserDTO user);
        public ListUsersDTO GetUsersForWorker();
        public CustomerDTO GetCustomerData(int userID);
        public CustomerDTO SaveUserPassportData(CustomerDTO userDTO);
    }
}
