using System;
using System.Runtime.Serialization;

namespace githubproj.Exceptions
{
    public class RepoNotFoundException : Exception
    {
        public RepoNotFoundException()
        {
        }

        public RepoNotFoundException(string message) : base(message)
        {
        }

        public RepoNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected RepoNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
