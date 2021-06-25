using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileBankingBackend.DTOs
{
    public class CommentListDTO : ResultDTO
    {
        public List<CommentDTO> Comments { get; set; }
    }
}
