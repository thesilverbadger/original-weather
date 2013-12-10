using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Weather.Models;
using Weather.Services;

namespace Weather.Api
{
    public class LatLongController : ApiController
    {
        // GET api/<controller>
        public async Task<WeatherData.Current_Condition> Get(string latitude, string longitude)
        {
            WeatherService weatherService = new WeatherService();
            var data = await weatherService.GetWeatherForLatLong(latitude, longitude);

            return data;
        }
       
    }
}