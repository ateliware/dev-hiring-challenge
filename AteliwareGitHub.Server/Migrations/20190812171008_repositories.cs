using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AteliwareGitHub.Server.Migrations
{
    public partial class repositories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SearchDate",
                table: "GitRepositories",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SearchDate",
                table: "GitRepositories");
        }
    }
}
