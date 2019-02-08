using Microsoft.EntityFrameworkCore.Migrations;

namespace HotelOn.Service.Migrations
{
    public partial class ModifyPayments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Bookings_BookingID",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_BookingID",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "BookingID",
                table: "Payments");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookingID",
                table: "Payments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_BookingID",
                table: "Payments",
                column: "BookingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Bookings_BookingID",
                table: "Payments",
                column: "BookingID",
                principalTable: "Bookings",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
