using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weather.Models
{
    public class WeatherData
    {
        public class Rootobject
        {
            public Data data { get; set; }
        }

        public class Data
        {
            public Current_Condition[] current_condition { get; set; }
            public Request[] request { get; set; }
            public Weather[] weather { get; set; }
        }

        public class Current_Condition
        {
            public string cloudcover { get; set; }
            public string humidity { get; set; }
            public string observation_time { get; set; }
            public string precipMM { get; set; }
            public string pressure { get; set; }
            public string temp_C { get; set; }
            public string temp_F { get; set; }
            public string visibility { get; set; }
            public string weatherCode { get; set; }
            public Weatherdesc[] weatherDesc { get; set; }
            public Weathericonurl[] weatherIconUrl { get; set; }
            public string winddir16Point { get; set; }
            public string winddirDegree { get; set; }
            public string windspeedKmph { get; set; }
            public string windspeedMiles { get; set; }
        }

        public class Weatherdesc
        {
            public string value { get; set; }
        }

        public class Weathericonurl
        {
            public string value { get; set; }
        }

        public class Request
        {
            public string query { get; set; }
            public string type { get; set; }
        }

        public class Weather
        {
            public string date { get; set; }
            public string precipMM { get; set; }
            public string tempMaxC { get; set; }
            public string tempMaxF { get; set; }
            public string tempMinC { get; set; }
            public string tempMinF { get; set; }
            public string weatherCode { get; set; }
            public Weatherdesc1[] weatherDesc { get; set; }
            public Weathericonurl1[] weatherIconUrl { get; set; }
            public string winddir16Point { get; set; }
            public string winddirDegree { get; set; }
            public string winddirection { get; set; }
            public string windspeedKmph { get; set; }
            public string windspeedMiles { get; set; }
        }

        public class Weatherdesc1
        {
            public string value { get; set; }
        }

        public class Weathericonurl1
        {
            public string value { get; set; }
        }

    }
}