using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dotnet_Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Readings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ECG = table.Column<string>(type: "TEXT", nullable: true),
                    Spo2 = table.Column<string>(type: "TEXT", nullable: true),
                    BPM = table.Column<string>(type: "TEXT", nullable: true),
                    RoomTemperature = table.Column<string>(type: "TEXT", nullable: true),
                    Humidity = table.Column<string>(type: "TEXT", nullable: true),
                    BodyTemperature = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Readings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Readings");
        }
    }
}
