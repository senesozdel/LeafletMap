using SammApi.Model;

namespace SammApi.Data
{
    public class DataList
    {


        public static List<Location> locations;
        private static int id = 1;
        static DataList()
        {
            locations = new List<Location>()
            {
                new Location(){
                Id = 0,
                Lat = "37.05612",
                Lng = "29.10999",
                DateTime = "2021-08-14T06:35:13Z"
                },
                {
                new Location(){
                Id = 1,
                Lat = "37.05612",
                Lng = "29.10999",
                DateTime = "2021-08-14T06:35:13Z"
                }

            }


        };


        }
        public static List<Location> LocationList
        {

            get{ return locations; }

        }
        public List<Location> Give()
        {
            return LocationList;
        }
        public bool AddLocationList(Location request)
        {
            if(request !=null)
            {
                ++id;
                request.Id = id;
                locations.Add(request);
                return true;
            }
            
            return false;
           

        }






    }


}
