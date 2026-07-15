using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RugbyManagementSystem.Infastructure.Migrations
{
    /// <inheritdoc />
    public partial class Create : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayerWhoScored",
                table: "Matches",
                newName: "Titans");

            migrationBuilder.RenameColumn(
                name: "PlayerWhoConverted",
                table: "Matches",
                newName: "OpponentScore");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Titans",
                table: "Matches",
                newName: "PlayerWhoScored");

            migrationBuilder.RenameColumn(
                name: "OpponentScore",
                table: "Matches",
                newName: "PlayerWhoConverted");
        }
    }
}
