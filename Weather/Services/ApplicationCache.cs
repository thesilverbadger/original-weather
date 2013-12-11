using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;

namespace Weather.Services
{
    public static class ApplicationCache
    {
        public static T Get<T>(string key) where T : class
        {
            return HttpContext.Current.Cache.Get(key) as T;
        }

        public static void Set(string key, object value)
        {
            HttpContext.Current.Cache.Add(key, value, null, DateTime.Now.AddMinutes(30), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
        }
    }
}