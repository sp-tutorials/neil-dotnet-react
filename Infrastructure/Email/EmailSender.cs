using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        public EmailSender(IConfiguration config)
        {
            _config = config;
            _httpClient = new HttpClient();
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string msgAsHtml)
        {
            HttpRequestMessage request = new(HttpMethod.Post, "https://api.mailersend.com/v1/email");
            var body = new
            {
                from = new { email = "info@trial-7dnvo4d35nrg5r86.mlsender.net" },
                to = new[] { new { email = userEmail } },
                subject = emailSubject,
                html = msgAsHtml
            };

            request.Headers.Add("Authorization", "Bearer " + _config["MailerSendApiKey"]);

            request.Content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, MediaTypeNames.Application.Json);
            request.Content.Headers.ContentType = new MediaTypeHeaderValue(MediaTypeNames.Application.Json);

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
        }
    }
}