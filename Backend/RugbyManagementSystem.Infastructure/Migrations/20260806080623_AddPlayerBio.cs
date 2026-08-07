using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RugbyManagementSystem.Infastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPlayerBio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "Players",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bio",
                table: "Players");
        }
    }
}
