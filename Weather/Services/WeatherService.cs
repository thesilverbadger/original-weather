using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Weather.Models;

namespace Weather.Services
{
    public class WeatherService
    {
        internal async Task<WeatherData.Current_Condition> GetWeatherForConfiguredPostcode()
        {
            string url = string.Format("http://api.worldweatheronline.com/free/v1/weather.ashx?q={0}&format=json&num_of_days=5&key={1}", 
                Settings.Postcode, Settings.Apikey);

            return await GetWeather(url);
        }

        internal async Task<WeatherData.Current_Condition> GetWeatherForLatLong(string latitude, string longitude)
        {
            string url = string.Format("http://api.worldweatheronline.com/free/v1/weather.ashx?q={0}%2C{1}&format=json&num_of_days=5&key={2}",
                latitude, longitude, Settings.Apikey);

            return await GetWeather(url);
        }

        internal async Task<WeatherData.Current_Condition> GetWeatherForPostcode(string postcode)
        {
            string url = string.Format("http://api.worldweatheronline.com/free/v1/weather.ashx?q={0}&format=json&num_of_days=5&key={1}",
                postcode, Settings.Apikey);

            return await GetWeather(url);
        }

        private static async Task<WeatherData.Current_Condition> GetWeather(string url)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://api.worldweatheronline.com/free/v1/weather.ashx");

                var response = await client.GetAsync(url);

                response.EnsureSuccessStatusCode();

                var data = await response.Content.ReadAsAsync<Weather.Models.WeatherData.Rootobject>();

                if (data != null && data.data != null && data.data.current_condition != null && data.data.current_condition.Count() > 0) //make sure we have some data
                {
                    return data.data.current_condition.FirstOrDefault();
                }

                return null;
            }
        }


    }
}