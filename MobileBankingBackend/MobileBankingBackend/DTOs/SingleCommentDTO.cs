using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class SingleCommentDTO : ResultDTO
    {
        public CommentDTO Comment { get; set; }
    }
}
