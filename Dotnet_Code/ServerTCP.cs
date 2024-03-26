using System.Net;

using System.Net.Sockets;

using System.Text;



public class ServerTCP

{

    private TcpListener server;

    private int port;

    public static string receivedData;

    public static string clientdata;

    public ServerTCP(int port)

    {

        this.port = port;

        this.server = new TcpListener(IPAddress.Any, port);

    }

    public async Task StartAsync()

    {

        try

        {

            server.Start();

            Console.WriteLine($"Server started. Listening on port {port}...");

            while (true)

            {

                Console.Write("Waiting for a connection... ");

                TcpClient client = await server.AcceptTcpClientAsync();

                Console.WriteLine("Connected!");

                _ = HandleClientAsync(client);

            }

        }

        catch (SocketException e)

        {

            Console.WriteLine("SocketException: {0}", e);

        }

        finally

        {

            server.Stop();

        }

    }

    public async Task HandleClientAsync(TcpClient client)

    {

        NetworkStream stream = client.GetStream();

        byte[] buffer = new byte[1024];

        while (true)

        {

            int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);

            if (bytesRead == 0)

            {

                break;

            }

            receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);

            clientdata=receivedData;

            Console.WriteLine("Received from esp32: {0}", receivedData);

            GetClientData();

        }

    }

    public string GetClientData()

    {

        Console.WriteLine("Data from client: {0}",clientdata);

        return clientdata;

    }

   

}