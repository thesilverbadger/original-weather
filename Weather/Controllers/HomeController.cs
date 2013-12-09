using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Weather.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            //http://api.worldweatheronline.com/free/v1/weather.ashx?q=RG248AG&format=json&num_of_days=5&key=t77bzy6gfxxzyxvq4pu6qqea
            return View();
        }
	}
}