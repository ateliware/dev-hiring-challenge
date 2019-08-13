using Microsoft.EntityFrameworkCore.Migrations;

namespace AteliwareGitHub.Server.Migrations
{
    public partial class language : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "language",
                table: "GitRepositories",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "language",
                table: "GitRepositories");
        }
    }
}
