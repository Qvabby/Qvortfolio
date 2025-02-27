using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Razor;

namespace Qvortfolio.Helpers
{
    public static class NavigationHelper
    {
        public static string IsActive(ViewContext viewContext, string controller, string action)
        {
            var routeData = viewContext.RouteData.Values;
            var currentController = routeData["controller"]?.ToString();
            var currentAction = routeData["action"]?.ToString();

            return controller == currentController && action == currentAction ? "active" : "";
        }
    }
}
