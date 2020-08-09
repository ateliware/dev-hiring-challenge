using System;
using System.Configuration;
using System.Data;
using System.Data.Odbc;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using Octokit;

namespace AteliwareChallenge
{
    public partial class frmMain : Form
    {
        string connectionString;
        string name;
        string login;
        string url;

        public frmMain()
        {
            InitializeComponent();
            connectionString = ConfigurationManager.ConnectionStrings["AteliwareChallenge.Properties.Settings.AzureSQLGitRepoConnectionString"].ConnectionString;
        }

        private void getRepoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            getResults();
            LoadRecords();
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            LoadRecords();
        }

        private void getResults()
        {
            var searchClient = new SearchClient(new ApiConnection(new Connection(new ProductHeaderValue("SearchRepo"))));
            var searchRepositoriesRequest = new SearchRepositoriesRequest
            {
                Language = Language.CSharp,
                Forks = Range.GreaterThan(400),
                SortField = RepoSearchSort.Stars,
                Order = SortDirection.Descending
            };

            var searchRepositoryResult = searchClient.SearchRepo(searchRepositoriesRequest).Result.Items.ToList();

            foreach (var result in searchRepositoryResult.Take(5))
            {
                InsertResult(result.Name, result.HtmlUrl, result.Owner.Login);
            }
        }

        private void InsertResult(string _name, string _url, string _login)
        {
            using (OdbcConnection connection = new OdbcConnection(connectionString))
            {
                string query = " IF NOT EXISTS (SELECT * FROM SearchResults WHERE url = ?) \n\r" +
                " BEGIN \n\r" +
                "     INSERT INTO SearchResults(name, url, login) VALUES (?, ?, ?) \n\r" +
                " SELECT SCOPE_IDENTITY() \n\r " +
                " END \n\r " +
                " ELSE SELECT 0";

                using (
                    OdbcCommand command = new OdbcCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@url", OdbcType.NVarChar).Value = _url;
                    command.Parameters.AddWithValue("@name", OdbcType.VarChar).Value = _name;
                    command.Parameters.AddWithValue("@url", OdbcType.NVarChar).Value = _url;
                    command.Parameters.AddWithValue("@login", OdbcType.VarChar).Value = _login;
                    command.CommandTimeout = 300;
                    connection.Open();
                    int result = command.ExecuteNonQuery();
                    connection.Close();

                    if (result < 0)
                    {
                        Console.WriteLine("Error inserting data into Database!");
                    }

                }
            }
        }

        private void DownloadProjectsFromGitHub(string _name, string _url)
        {
            Regex illegalInFileName = new Regex(@"[\\/:*?""<>|]");
            string name = illegalInFileName.Replace(_name, "");

            var archivePath = Path.Combine(GetBuildFolder(), name + ".zip");
            var destinationDirectoryName = Path.Combine(GetBuildFolder(), name);
            if (!File.Exists(archivePath))
            {
                var downloadUrl = _url + "/archive/master.zip";
                using (var client = new WebClient())
                {
                    client.DownloadFile(downloadUrl, archivePath);
                }
            }

            MessageBox.Show("Repository saved at " + destinationDirectoryName);
        }

        private void LoadRecords()
        {
            using (OdbcConnection connection = new OdbcConnection(connectionString))
            using (OdbcDataAdapter adapter = new OdbcDataAdapter("SELECT * FROM SearchResults", connection))
            {
                connection.Open();

                DataTable searchResultsTable = new DataTable();
                adapter.Fill(searchResultsTable);
                gridSearchResult.DataSource = searchResultsTable;
            }
        }

        private static string GetBuildFolder()
        {
            string folder = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);
            return folder;
        }

        private void viewRepoDetailsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(name) )
            {
                MessageBox.Show("Please select a row.");
            }
            else
            {
                frmDetails form = new frmDetails(login, name);
                form.Show();
            }
        }
        private void gridSearchResult_SelectionChanged_1(object sender, EventArgs e)
        {
            foreach (DataGridViewRow row in gridSearchResult.SelectedRows)
            {
                name = row.Cells[0].Value.ToString();
                url = row.Cells[1].Value.ToString();
                login = row.Cells[2].Value.ToString();
            }
        }

        private void downloadRepoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(name))
            {
                MessageBox.Show("Please select a row.");
            }
            else
            {
                DownloadProjectsFromGitHub(name, url);
            }
        }

        private void clearResultsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            using (OdbcConnection connection = new OdbcConnection(connectionString))
            {
                string query = "TRUNCATE TABLE SearchResults";

                using (
                    OdbcCommand command = new OdbcCommand(query, connection))
                {
                    command.CommandTimeout = 300;
                    connection.Open();
                    int result = command.ExecuteNonQuery();
                    connection.Close();
                }
            }

            LoadRecords();
        }
    }
}
