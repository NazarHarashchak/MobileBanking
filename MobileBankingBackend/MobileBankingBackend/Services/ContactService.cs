using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBankingBackend.DTOs;
using MobileBankingBackend.Models;
using MobileBankingBackend.Interfaces;

namespace MobileBankingBackend.Services
{
    public class ContactService : IContactService
    {
        private readonly DatabaseContext _context;
        public ContactService(DatabaseContext context)
        {
            _context = context;
        }
        public bool SendComment(CommentDTO comment)
        {
            bool result = false;
            try
            {
                var commentDB = new Contact()
                {
                    DateCreated = DateTime.Now,
                    Email = comment.Email,
                    Message = comment.Message,
                    Name = $"{comment.Name} {comment.SecondName}",
                    PhoneNumber = comment.PhoneNumber
                };

                _context.Contacts.Add(commentDB);
                _context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            return result;
        }
        public CommentListDTO GetComments()
        {
            var result = new CommentListDTO();

            try
            {
                var commentsDB = _context.Contacts.ToList();
                result.Comments = new List<CommentDTO>();

                foreach (var comment in commentsDB)
                {
                    result.Comments.Add(new CommentDTO() { 
                        ID = comment.ID,
                        Name = comment.Name,
                        Email = comment.Email,
                        PhoneNumber = comment.PhoneNumber,
                        Message = comment.Message,
                        DateCreated = comment.DateCreated.ToShortDateString()
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
        public CommentListDTO MarkAsRead(int id)
        {
            var result = new CommentListDTO();

            try
            {
                var commentDB = _context.Contacts.Where(item => item.ID == id).FirstOrDefault();

                if (commentDB == null)
                {
                    result.Success = false;
                    result.Message = "Такого відгуку не існує!";
                    return result;
                }

                var commentsDB = _context.Contacts.ToList();
                result.Comments = new List<CommentDTO>();

                foreach (var comment in commentsDB)
                {
                    result.Comments.Add(new CommentDTO()
                    {
                        ID = comment.ID,
                        Name = comment.Name,
                        Email = comment.Email,
                        PhoneNumber = comment.PhoneNumber,
                        Message = comment.Message
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
    }
}
