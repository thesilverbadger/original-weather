using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weather.ViewModels
{
    public class HomeViewModel
    {
        public string CurrentTemperature { get; set; }

        public string Conditions { get; set; }

        public string WeatherImage { get; set; }
    }
}