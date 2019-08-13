using Microsoft.EntityFrameworkCore.Migrations;

namespace AteliwareGitHub.Server.Migrations
{
    public partial class gitid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "gitID",
                table: "GitRepositories",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "gitID",
                table: "GitRepositories");
        }
    }
}
