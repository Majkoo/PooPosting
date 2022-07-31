﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PicturesAPI.Entities;

#nullable disable

namespace PicturesAPI.Migrations
{
    [DbContext(typeof(PictureDbContext))]
    [Migration("20220702131126_changed keys")]
    partial class changedkeys
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("PicturesAPI.Entities.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("AccountCreated")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValue(new DateTime(2022, 7, 2, 15, 11, 26, 378, DateTimeKind.Local).AddTicks(8997));

                    b.Property<string>("AccountDescription")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("BackgroundPicUrl")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("IsDeleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<string>("Nickname")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("varchar(25)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProfilePicUrl")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValue(1);

                    b.Property<bool>("Verified")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.HasKey("Id");

                    b.HasIndex("Nickname");

                    b.HasIndex("RoleId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CommentAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValue(new DateTime(2022, 7, 2, 15, 11, 26, 378, DateTimeKind.Local).AddTicks(9767));

                    b.Property<bool>("IsDeleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<int>("PictureId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("PictureId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Joins.AccountLikedTags", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("TagId");

                    b.ToTable("AccountsLikedTags");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Joins.PictureSeenByAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<int>("PictureId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("PictureId");

                    b.ToTable("PicturesSeenByAccounts");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Joins.PictureTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("PictureId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PictureId");

                    b.HasIndex("TagId");

                    b.ToTable("PictureTags");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Like", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<bool>("IsLike")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("PictureId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("PictureId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Picture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<bool>("IsDeleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)");

                    b.Property<DateTime>("PictureAdded")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValue(new DateTime(2022, 7, 2, 15, 11, 26, 379, DateTimeKind.Local).AddTicks(788));

                    b.Property<long>("PopularityScore")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasDefaultValue(36500L);

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("varchar(250)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("Name");

                    b.ToTable("Pictures");
                });

            modelBuilder.Entity("PicturesAPI.Entities.RestrictedIp", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("CantGet")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("CantPost")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("IpAddress")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.ToTable("RestrictedIps");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("varchar(16)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Value")
                        .HasMaxLength(25)
                        .HasColumnType("varchar(25)");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Account", b =>
                {
                    b.HasOne("PicturesAPI.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Comment", b =>
                {
                    b.HasOne("PicturesAPI.Entities.Account", "Account")
                        .WithMany("Comments")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PicturesAPI.Entities.Picture", "Picture")
                        .WithMany("Comments")
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Picture");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Joins.AccountLikedTags", b =>
                {
                    b.HasOne("PicturesAPI.Entities.Account", "Account")
                        .WithMany("LikedTags")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PicturesAPI.Entities.Tag", "Tag")
                        .WithMany("AccountLikedTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Joins.PictureSeenByAccount", b =>
                {
                    b.HasOne("PicturesAPI.Entities.Account", "Account")
                        .WithMany("PicturesSeen")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PicturesAPI.Entities.Picture", "Picture")
                        .WithMany("SeenByAccount")
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Picture");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Joins.PictureTag", b =>
                {
                    b.HasOne("PicturesAPI.Entities.Picture", "Picture")
                        .WithMany("PictureTags")
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PicturesAPI.Entities.Tag", "Tag")
                        .WithMany("PictureTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Picture");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Like", b =>
                {
                    b.HasOne("PicturesAPI.Entities.Account", "Account")
                        .WithMany("Likes")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PicturesAPI.Entities.Picture", "Picture")
                        .WithMany("Likes")
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Picture");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Picture", b =>
                {
                    b.HasOne("PicturesAPI.Entities.Account", "Account")
                        .WithMany("Pictures")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Account", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("LikedTags");

                    b.Navigation("Likes");

                    b.Navigation("Pictures");

                    b.Navigation("PicturesSeen");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Picture", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Likes");

                    b.Navigation("PictureTags");

                    b.Navigation("SeenByAccount");
                });

            modelBuilder.Entity("PicturesAPI.Entities.Tag", b =>
                {
                    b.Navigation("AccountLikedTags");

                    b.Navigation("PictureTags");
                });
#pragma warning restore 612, 618
        }
    }
}
