using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using System.Net;

namespace SoccerStats
{
    class Program
    {
        static void Main(string[] args)
        {
            string currentDirectory = Directory.GetCurrentDirectory(); // gets string containing path to current directory
            DirectoryInfo directory = new DirectoryInfo(currentDirectory); // exposes methods for interacting with directory
            var fileName = Path.Combine(directory.FullName, "SoccerGameResults.csv"); // gets string containing path to current directory
            var fileContents = ReadSoccerResults(fileName);
            fileName = Path.Combine(directory.FullName, "players.json");
            var players = DeserializePlayers(fileName);

            var topTenPlayers = GetTopTenPlayers(players);

            foreach (var player in topTenPlayers)
            {
               List<NewsResult> newsResults = GetNewsForPlayer(string.Format("{0} {1}", player.FirstName, player.SecondName));
               SentimentResponse sentimentResponse = GetSentimentResponse(newsResults);
               foreach(var sentiment in sentimentResponse.Sentiments)
               {
                   foreach (var newsResult in newsResults)
                   {
                       if (newsResult.Id == sentiment.Id)
                       {
                           double score;
                           if (double.TryParse(sentiment.Score, out score))
                           {
                               newsResult.SentimentScore = score;
                           }
                           break;
                       }
                   }
               }
               foreach(var result in newsResults)
               {
                   Console.WriteLine($"Headline: {result.Headline} Sentiment Score: {result.SentimentScore}\n");
                   Console.ReadKey();
               }
            }
            fileName = Path.Combine(directory.FullName, "topten.json");
            SerializePlayersToFile(fileName, topTenPlayers);

        }

        public static string ReadFile(string fileName)
        {
            using (var reader = new StreamReader(fileName))
            {
                return reader.ReadToEnd();
            }
        }

        public static List<GameResult> ReadSoccerResults(string fileName)
        {
            var soccerResults = new List<GameResult>();
            using (var reader = new StreamReader(fileName)) // using directive closes streamreader after finished
            {
                string line = "";
                reader.ReadLine(); // consumes first line, which only contains headings
                while((line = reader.ReadLine()) != null) // while the line is not null
                {
                    var gameResult = new GameResult();
                    string[] values = line.Split(',');
                    DateTime gameDate;
                    if (DateTime.TryParse(values[0], out gameDate))
                    {
                        gameResult.GameDate = gameDate;
                    }
                    gameResult.TeamName = values[1];
                    HomeOrAway homeOrAway;
                    if (Enum.TryParse(values[2], out homeOrAway))
                    {
                        gameResult.HomeOrAway = homeOrAway;
                    }
                    int parseInt;
                    if (int.TryParse(values[3], out parseInt))
                    {
                        gameResult.Goals = parseInt;
                    }
                    if (int.TryParse(values[4], out parseInt))
                    {
                        gameResult.GoalAttempts = parseInt;
                    }
                    if (int.TryParse(values[5], out parseInt))
                    {
                        gameResult.ShotsOnGoal = parseInt;
                    }
                    if (int.TryParse(values[6], out parseInt))
                    {
                        gameResult.ShotsOffGoal = parseInt;
                    }
                    double possessionPercent;
                    if (double.TryParse(values[7], out possessionPercent))
                    {
                        gameResult.PossessionPercent = possessionPercent;
                    }
                    soccerResults.Add(gameResult);
                }
            }
            return soccerResults;
        }

        public static List<Player> DeserializePlayers(string fileName)
        {
            var players = new List<Player>();
            var serializer = new JsonSerializer();
            using (var reader = new StreamReader(fileName))
            using (var jsonReader = new JsonTextReader(reader))
            {
                players = serializer.Deserialize<List<Player>>(jsonReader);
            }
            return players;
        }

        public static void SerializePlayersToFile(string fileName, List<Player> players)
        {
            var serializer = new JsonSerializer();
            using (var writer = new StreamWriter(fileName))
            using (var jsonWriter = new JsonTextWriter(writer))
            {
                serializer.Serialize(jsonWriter, players);
            }
        }

        public static List<Player> GetTopTenPlayers(List<Player> players)
        {
            var topTenPlayers = new List<Player>();
            players.Sort(new PlayerComparer());
            for (int i = 0; i < 10; i++)
            {
                topTenPlayers.Add(players[i]);
            }
            return topTenPlayers;
        }

        public static string GetGoogleHomePage()
        {
            var webClient = new WebClient();
            byte[] googleHome = webClient.DownloadData("https://www.google.com");

            using (var stream = new MemoryStream(googleHome))
            using (var reader = new StreamReader(stream))
            {
                return reader.ReadToEnd();
            }
        }
        public static List<NewsResult> GetNewsForPlayer(string playerName)
        {
            var key = "cbc0df2d79664e95ac771540f546c057";
            var newsSearchUrl = "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q={0}&mkt=en-us";

            var results = new List<NewsResult>();
            var webClient = new WebClient();
            webClient.Headers.Add("Ocp-Apim-Subscription-Key", key);
            byte[] searchResults = webClient.DownloadData(string.Format(newsSearchUrl, playerName));
            var serializier = new JsonSerializer();
            using (var stream = new MemoryStream(searchResults))
            using (var reader = new StreamReader(stream))
            using (var jsonReader = new JsonTextReader(reader))
            {
                results = serializier.Deserialize<NewsSearch>(jsonReader).NewsResults;
            }
            return results;
        }

        public static SentimentResponse GetSentimentResponse(List<NewsResult> newsResults)
        {
            var sentimentResponse = new SentimentResponse();
            var sentimentRequest = new SentimentRequest();
            sentimentRequest.Documents = new List<Document>();
            foreach (var result in newsResults)
            {
                sentimentRequest.Documents.Add(new Document {Id = result.Id, Text = result.Headline});
            }

            var key = "33be58a81544494aa193bf2e00d4d46e";
            var textAnalyticsUrl = "https://treehouse.cognitiveservices.azure.com/text/analytics/v3.0/sentiment/";
            var webClient = new WebClient();
            webClient.Headers.Add("Ocp-Apim-Subscription-Key", key);
            webClient.Headers.Add(HttpRequestHeader.ContentType, "application/json");
            webClient.Headers.Add(HttpRequestHeader.Accept, "application/json");
            string requestJson = JsonConvert.SerializeObject(sentimentRequest);
            byte[] requestBytes = Encoding.UTF8.GetBytes(requestJson);
            byte[] response = webClient.UploadData(textAnalyticsUrl, requestBytes);
            string sentiments = Encoding.UTF8.GetString(response);
            sentimentResponse = JsonConvert.DeserializeObject<SentimentResponse>(sentiments);
            return sentimentResponse;
        }
    }
}
