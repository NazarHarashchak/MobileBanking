using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;

namespace MobileBankingBackend.Interfaces
{
    public interface IAuthentificationService
    {
        public AuthentificationDTO Authentificate(AuthentificationDTO user);
        public AuthentificationDTO Registrate(AuthentificationDTO user);
    }
}
