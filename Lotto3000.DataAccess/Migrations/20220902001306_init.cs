using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lotto3000.DataAccess.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LottoSession",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WinningNumbers = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DrawDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LottoSession", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LottoTicket",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Combination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LottoSessionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LottoTicket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LottoTicket_LottoSession_LottoSessionId",
                        column: x => x.LottoSessionId,
                        principalTable: "LottoSession",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LottoTicket_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "FirstName", "IsAdmin", "LastName", "Password", "UserName" },
                values: new object[] { 1, "john@admin.com", "John", true, "Doe", "?????%?????vV???", "adminJohn" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "FirstName", "IsAdmin", "LastName", "Password", "UserName" },
                values: new object[] { 2, "bob@admin.com", "Bob", true, "Bobsky", "H,?????mI??I8", "adminBob" });

            migrationBuilder.CreateIndex(
                name: "IX_LottoTicket_LottoSessionId",
                table: "LottoTicket",
                column: "LottoSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_LottoTicket_UserId",
                table: "LottoTicket",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LottoTicket");

            migrationBuilder.DropTable(
                name: "LottoSession");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
