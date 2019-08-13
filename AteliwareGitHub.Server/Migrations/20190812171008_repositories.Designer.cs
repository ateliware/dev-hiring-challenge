﻿// <auto-generated />
using System;
using AteliwareGitHub.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AteliwareGitHub.Server.Migrations
{
    [DbContext(typeof(AteliwareContext))]
    [Migration("20190812171008_repositories")]
    partial class repositories
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AteliwareGitHub.Server.GitRepos", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("SearchDate");

                    b.Property<string>("description");

                    b.Property<string>("name");

                    b.Property<int>("stars");

                    b.Property<string>("url");

                    b.HasKey("id");

                    b.ToTable("GitRepositories");
                });
#pragma warning restore 612, 618
        }
    }
}
