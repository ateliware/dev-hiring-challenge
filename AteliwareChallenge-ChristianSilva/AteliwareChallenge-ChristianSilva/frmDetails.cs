using Octokit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AteliwareChallenge
{
    public partial class frmDetails : Form
    {
        string login;
        string name;

        public frmDetails(string _login, string _name)
        {
            InitializeComponent();
            login = _login;
            name = _name;
        }

        private void frmDetails_Load(object sender, EventArgs e)
        {
            var octokitResults = ListContentsOctokit(login, name);
            foreach (var item in octokitResults)
            {
                listContents.Items.Add(item.Name);
            }
        }

        static List<RepositoryContent> ListContentsOctokit(string repoOwner, string repoName)
        {
            var client = new GitHubClient(new ProductHeaderValue("Github-API-Test"));
            var contents = client.Repository.Content.GetAllContents(repoOwner, repoName).Result;
            return contents.ToList();
        }
    }
}
