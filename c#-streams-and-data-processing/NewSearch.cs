﻿using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace SoccerStats
{

    public class NewSearch
    {
        public string _type { get; set; }
        public Querycontext queryContext { get; set; }
        [JsonProperty(PropertyName = "WebPages")]
        public NewsSearch newsSearch { get; set; }
        public Relatedsearches relatedSearches { get; set; }
        public Rankingresponse rankingResponse { get; set; }
    }

    public class Querycontext
    {
        public string originalQuery { get; set; }
    }

    public class NewsSearch
    {
        public string webSearchUrl { get; set; }
        public int totalEstimatedMatches { get; set; }
        [JsonProperty(PropertyName = "value")]
        public List<NewsResult> NewsResults { get; set; }
    }

    public class NewsResult
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Headline { get; set; }
        public string url { get; set; }
        public string displayUrl { get; set; }
        [JsonProperty(PropertyName = "snippet")]
        public string Summary { get; set; }
        public Deeplink[] deepLinks { get; set; }
        public double SentimentScore {get; set;}
    }

    public class Deeplink
    {
        public string name { get; set; }
        public string url { get; set; }
        public string snippet { get; set; }
    }

    public class Relatedsearches
    {
        public string id { get; set; }
        public Value1[] value { get; set; }
    }

    public class Value1
    {
        public string text { get; set; }
        public string displayText { get; set; }
        public string webSearchUrl { get; set; }
    }

    public class Rankingresponse
    {
        public Mainline mainline { get; set; }
        public Sidebar sidebar { get; set; }
    }

    public class Mainline
    {
        public Item[] items { get; set; }
    }

    public class Item
    {
        public string answerType { get; set; }
        public int resultIndex { get; set; }
        public Value2 value { get; set; }
    }

    public class Value2
    {
        public string id { get; set; }
    }

    public class Sidebar
    {
        public Item1[] items { get; set; }
    }

    public class Item1
    {
        public string answerType { get; set; }
        public Value3 value { get; set; }
    }

    public class Value3
    {
        public string id { get; set; }
    }

}
