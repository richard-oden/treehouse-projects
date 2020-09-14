using System;
using System.Collections;

namespace Treehouse.MediaLibrary
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var myLibrary = new MediaLibrary(new MediaType[]
                {
                    new Album("White Album", "The Beatles"),
                    new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling"),
                    new Movie("Evil Dead: Army of Darkness", "Sam Raimi"),
                    new Movie("Up", "Pixar"),
                    new Album("Hold Your Colour", "Pendulum")
                });

                myLibrary.DisplayItem(myLibrary.FindItem("colour"));
                myLibrary.DisplayItem(myLibrary.FindItem("dog"));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        static void DetectMediaType(MediaType item)
        {
            if (item != null)
            {
                string type;
                if (item is Album) type = "album";
                else if (item is Book) type = "book";
                else if (item is Movie) type = "movie";
                else throw new Exception("Unexpected media subtype encountered.");

                string output = $"{item.Title} is ";
                // Does type start with a vowel?
                output += "aeiou".IndexOf(type[0]) >= 0 ? "an" : "a";
                output += $" {type}!";
                Console.WriteLine(output);
            }
            else
            {
                Console.WriteLine("Media library does not contain item.");
            }
        }
    }
}
