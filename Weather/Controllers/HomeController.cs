using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Weather.Models;
using Weather.Services;
using Weather.ViewModels;

namespace Weather.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public async Task<ActionResult> Index()
        {
            HomeViewModel viewModel = new HomeViewModel();

            WeatherData.Current_Condition condition = ApplicationCache.Get<WeatherData.Current_Condition>("currentConditions");

            if (condition == null)
            {
                try
                {
                    var weatherService = new WeatherService();
                    condition = await weatherService.GetWeatherForConfiguredPostcode();
                    ApplicationCache.Set("currentConditions", condition);
                }
                catch (Exception)
                { 
                    //catch and ideally log...
                }
            }

            if (condition != null)
            {
                viewModel.Conditions = condition.weatherDesc[0].value;
                viewModel.CurrentTemperature = condition.temp_C;
                viewModel.WeatherImage = condition.weatherIconUrl[0].value;
            }
            else
            {
                viewModel.Error = "Error getting current weather conditions. Please try again later";
            }

            return View(viewModel);
        }
	}
}