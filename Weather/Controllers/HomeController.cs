using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
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

            var weatherService = new WeatherService();
            var currentConditions = await weatherService.GetWeather();

            if(currentConditions!=null)
            {
                viewModel.Conditions = currentConditions.weatherDesc[0].value;
                viewModel.CurrentTemperature = currentConditions.temp_C;
                viewModel.WeatherImage = currentConditions.weatherIconUrl[0].value;
            }

            return View(viewModel);
        }
	}
}