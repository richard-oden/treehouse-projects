using System;

namespace Treehouse.MediaLibrary
{
    public class MediaType
    {
        public string Title {get; private set;}
        public string Loanee {get; set;} = "";
        public bool OnLoan {get; set;} = false;
        public string OnLoanDisplayText
        {
            get
            {
                if (OnLoan)
                {
                    return " (Currently on loan" + (!string.IsNullOrEmpty(Loanee) ? $" to {Loanee})" : ")");
                }
                else
                {
                    return "";
                }
            }
        }

        public MediaType(string title)
        {
            if (!string.IsNullOrEmpty(title))
            {
                Title = title;
            }
            else
            {
                throw new Exception("A media type must have a title.");
            }
        }

        public void Loan()
        {
            OnLoan = true;
        }

        public void Loan(string loanee)
        {
            Loanee = loanee;
            Loan();
        }

        public void Return()
        {
            Loanee = null;
            OnLoan = false;
        }
    }
}