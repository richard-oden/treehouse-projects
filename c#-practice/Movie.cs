namespace Treehouse.MediaLibrary
{
    class Movie : MediaType
    {
        public string Director {get; private set;}

        public string DisplayText => $"Movie: {Title} by {Director}{OnLoanDisplayText}";
        
        public Movie(string title, string director) : base(title)
        {
            Director = director;
        }
    }
}