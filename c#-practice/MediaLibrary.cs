using System;

namespace Treehouse.MediaLibrary
{
    public class MediaLibrary
    {
        private MediaType[] _items;

        public int NumberOfItems => _items.Length;

        public MediaLibrary(MediaType[] items)
        {
            _items = items;
        }

        public MediaType GetItemAt(int index)
        {
            return (index >= 0 && index < _items.Length) ? _items[index] : null;
        }

        public MediaType FindItem(string criteria)
        {
            foreach (var item in _items)
            {
                if (item.Title.ToLower().Contains(criteria.ToLower())) 
                {
                    return item;
                }
            }
            // Return null if item not found
            Console.WriteLine($"Item with title containing '{criteria}' was not found!");
            return null;
        }

        public void DisplayItem(MediaType item)
        {
            if (item != null)
            {
                string output;
                if (item is Album) output = ((Album)item).DisplayText;
                else if (item is Book) output = ((Book)item).DisplayText;
                else if (item is Movie) output = ((Movie)item).DisplayText;
                else throw new Exception("Unexpected media subtype encountered.");
                Console.WriteLine(output);
            }
            else
            {
                Console.WriteLine("Media library does not contain item.");
            }
        }

        public void DisplayItems()
        {
            foreach (var item in _items) DisplayItem(item);
        }
    }
}