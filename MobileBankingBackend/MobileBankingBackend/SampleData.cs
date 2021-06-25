using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.Models;
using System.Security.Cryptography;
using System.Text;

namespace MobileBankingBackend
{
    public class SampleData
    {
        public static void Initialize(DatabaseContext context)
        {
            try
            {
                if (!context.UserApplicationRoles.Any())
                {
                    context.UserApplicationRoles.AddRange(
                        new UserApplicationRole()
                        {
                            ID = (int)Constants.UserApplicationRoles.Admin,
                            Role = "Адміністартор"
                        },
                        new UserApplicationRole()
                        {
                            ID = (int)Constants.UserApplicationRoles.Worker,
                            Role = "Працівник"
                        },
                        new UserApplicationRole()
                        {
                            ID = (int)Constants.UserApplicationRoles.Customer,
                            Role = "Клієнт"
                        });

                    context.SaveChanges();
                }
                if (!context.Users.Any())
                {
                    byte[] adminPassword = ASCIIEncoding.ASCII.GetBytes("admin");
                    var admin = new User()
                    {
                        DateCreated = DateTime.Now,
                        Login = "admin1",
                        Password = new MD5CryptoServiceProvider().ComputeHash(adminPassword),
                        UserApplicationRole = context.UserApplicationRoles.Where(role => role.ID == (int) Constants.UserApplicationRoles.Admin).FirstOrDefault()
                    };
                    var adminInfo = new UserInformation()
                    {
                        Age = 22,
                        PhoneNumber = "+380999999999",
                        Name = "Admin",
                        SecondName = "Admin",
                        User = admin,
                        Country = "Україна",
                        City = "Львів",
                        StreetName = "генерала Чупринки",
                        HouseNumber = "7",
                        IsPrivateHouse = false,
                        AppartmentsNumber = 87
                    };

                    admin.UserInformation = adminInfo;

                    context.Users.Add(admin);
                    context.UserInformations.Add(adminInfo);

                    var worker = new User()
                    {
                        DateCreated = DateTime.Now,
                        Login = "worker1",
                        Password = new MD5CryptoServiceProvider().ComputeHash(adminPassword),
                        UserApplicationRole = context.UserApplicationRoles.Where(role => role.ID == (int)Constants.UserApplicationRoles.Worker).FirstOrDefault()
                    };
                    var workerInfo = new UserInformation()
                    {
                        Age = 27,
                        PhoneNumber = "+380999999999",
                        Name = "Андрій",
                        SecondName = "Голубіцький",
                        User = worker,
                        Country = "Україна",
                        City = "Київ",
                        StreetName = "Гірська",
                        HouseNumber = "27",
                        IsPrivateHouse = true
                    };

                    worker.UserInformation = workerInfo;

                    context.Users.Add(worker);
                    context.UserInformations.Add(workerInfo);

                    var customer = new User()
                    {
                        DateCreated = DateTime.Now,
                        Login = "customer1",
                        Password = new MD5CryptoServiceProvider().ComputeHash(adminPassword),
                        UserApplicationRole = context.UserApplicationRoles.Where(role => role.ID == (int)Constants.UserApplicationRoles.Customer).FirstOrDefault()
                    };
                    var customerInfo = new UserInformation()
                    {
                        Age = 27,
                        PhoneNumber = "+380999999999",
                        Name = "Мар'яна",
                        SecondName = "Підгорецька",
                        User = customer,
                        Country = "Україна",
                        City = "Харків",
                        StreetName = "Ломоносова",
                        HouseNumber = "39",
                        IsPrivateHouse = false,
                        AppartmentsNumber = 41
                    };
                    var customerCustomer = new Customer()
                    {
                        AccountNumber = new Guid(),
                        PassportCode = "CE",
                        PassportNumber = "777777",
                        TaxCode = "3333333333",
                        User = customer
                    };

                    customer.UserInformation = customerInfo;
                    customer.Customer = customerCustomer;

                    context.Users.Add(customer);
                    context.UserInformations.Add(customerInfo);
                    context.Customers.Add(customerCustomer);

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                context.SaveChanges();
            }
        }
    }
}
