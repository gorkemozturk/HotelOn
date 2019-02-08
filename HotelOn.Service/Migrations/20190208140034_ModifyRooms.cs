using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelOn.Service.Migrations
{
    public partial class ModifyRooms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsAvailable",
                table: "Rooms",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsAvailable",
                table: "Rooms",
                nullable: true,
                oldClrType: typeof(bool));
        }
    }
}
