using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SammApi.Data;
using SammApi.Model;

namespace SammApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly DataList data_;

        public LocationController(DataList data)
        {
            data_ = data;
        }
        [HttpGet]
        public List<Location> GetLocations()
        {
            return data_.Give();
        }
        [HttpPost]
        public bool PostLocation([FromBody] Location request)
        {
            if (data_.AddLocationList(request))
            {

                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
