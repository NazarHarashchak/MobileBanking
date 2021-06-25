using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;

namespace MobileBankingBackend.Interfaces
{
    public interface IContactService
    {
        public bool SendComment(CommentDTO comment);
        public CommentListDTO GetComments();
        public CommentListDTO MarkAsRead(int id);
    }
}
