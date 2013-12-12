using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Weather.Services
{
    public static class Settings
    {
        public static string Apikey
        {
            get
            {
                string apikey = ConfigurationManager.AppSettings["apikey"];

                if (string.IsNullOrEmpty(apikey) || apikey == "REPLACE_ME")
                    throw new ApplicationException("Missing config value for apikey");

                return apikey;
            }
        }

        public static string Postcode
        {
            get
            {
                return ConfigurationManager.AppSettings["postcode"];
            }
        }
    }
}