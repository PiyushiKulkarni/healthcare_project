// using Microsoft.AspNetCore.Mvc;
// namespace Server.Controllers

// {

//     [Route("api/[controller]")]

//     [ApiController]

//     public class DataController(ServerTCP tcpServer, ILogger<DataController> logger) : ControllerBase

//     {

//         private readonly ServerTCP _tcpServer = tcpServer;

//         private readonly ILogger<DataController> _logger = logger;

//         [HttpGet]

//         public IActionResult GetClientData()

//         {

//            string clientdata = _tcpServer.GetClientData();

//            Console.WriteLine("  client data from controller - ",clientdata);

//             return Ok(clientdata);

//         }      

//     }  

// }
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly MyDbContext _dbContext;
        private readonly ServerTCP _tcpServer;
        private readonly ILogger<DataController> _logger;

        public DataController(MyDbContext dbContext, ServerTCP tcpServer, ILogger<DataController> logger)
        {
            _dbContext = dbContext;
            _tcpServer = tcpServer;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetClientData()
        {
            string clientdata = _tcpServer.GetClientData();
            _logger.LogInformation("Client data from controller: {clientdata}", clientdata);
            return Ok(clientdata);
        }
        
         [HttpPost("set-server")]
        public IActionResult SetServer([FromBody] ServerInfo serverInfo)
        {
            try
            {
                // Do something with the received server IP address and port
                _logger.LogInformation("Received server IP: {ip}, Port: {port}", serverInfo.IpAddress, serverInfo.Port);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error setting server IP and port: {error}", ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("save-readings")]
        
        
        public async Task<IActionResult> SaveReadings([FromBody] ReadingsModel readings)
        {
            Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _dbContext.Readings.Add(readings);
                await _dbContext.SaveChangesAsync();
                Console.WriteLine("SAVED TO DATABASE: {0}",readings);
                _logger.LogInformation("Readings saved successfully.");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error saving readings: {error}", ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
