using System.Web.Mvc;
using System.Web.Routing;

namespace PresentationUI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{*anything}",
                defaults: new { controller = "Employee", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
