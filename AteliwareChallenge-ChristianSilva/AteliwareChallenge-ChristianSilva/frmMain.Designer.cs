namespace AteliwareChallenge
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.mStripMain = new System.Windows.Forms.MenuStrip();
            this.getRepoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.viewRepoDetailsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.gridSearchResult = new System.Windows.Forms.DataGridView();
            this.nameDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.uRLDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.loginDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.searchResultsBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.azureSQLGitRepoDataSet = new AteliwareChallenge.AzureSQLGitRepoDataSet();
            this.searchResultsTableAdapter = new AteliwareChallenge.AzureSQLGitRepoDataSetTableAdapters.SearchResultsTableAdapter();
            this.downloadRepoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.clearResultsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mStripMain.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.gridSearchResult)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.searchResultsBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.azureSQLGitRepoDataSet)).BeginInit();
            this.SuspendLayout();
            // 
            // mStripMain
            // 
            this.mStripMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.getRepoToolStripMenuItem,
            this.viewRepoDetailsToolStripMenuItem,
            this.downloadRepoToolStripMenuItem,
            this.clearResultsToolStripMenuItem});
            this.mStripMain.Location = new System.Drawing.Point(0, 0);
            this.mStripMain.Name = "mStripMain";
            this.mStripMain.Size = new System.Drawing.Size(1108, 24);
            this.mStripMain.TabIndex = 0;
            // 
            // getRepoToolStripMenuItem
            // 
            this.getRepoToolStripMenuItem.Name = "getRepoToolStripMenuItem";
            this.getRepoToolStripMenuItem.Size = new System.Drawing.Size(84, 20);
            this.getRepoToolStripMenuItem.Text = "Search Repo";
            this.getRepoToolStripMenuItem.Click += new System.EventHandler(this.getRepoToolStripMenuItem_Click);
            // 
            // viewRepoDetailsToolStripMenuItem
            // 
            this.viewRepoDetailsToolStripMenuItem.Name = "viewRepoDetailsToolStripMenuItem";
            this.viewRepoDetailsToolStripMenuItem.Size = new System.Drawing.Size(112, 20);
            this.viewRepoDetailsToolStripMenuItem.Text = "View Repo Details";
            this.viewRepoDetailsToolStripMenuItem.Click += new System.EventHandler(this.viewRepoDetailsToolStripMenuItem_Click);
            // 
            // gridSearchResult
            // 
            this.gridSearchResult.AllowUserToAddRows = false;
            this.gridSearchResult.AllowUserToDeleteRows = false;
            this.gridSearchResult.AutoGenerateColumns = false;
            this.gridSearchResult.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.gridSearchResult.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.gridSearchResult.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nameDataGridViewTextBoxColumn,
            this.uRLDataGridViewTextBoxColumn,
            this.loginDataGridViewTextBoxColumn});
            this.gridSearchResult.DataSource = this.searchResultsBindingSource;
            this.gridSearchResult.Dock = System.Windows.Forms.DockStyle.Fill;
            this.gridSearchResult.Location = new System.Drawing.Point(0, 24);
            this.gridSearchResult.Name = "gridSearchResult";
            this.gridSearchResult.ReadOnly = true;
            this.gridSearchResult.Size = new System.Drawing.Size(1108, 504);
            this.gridSearchResult.TabIndex = 2;
            this.gridSearchResult.SelectionChanged += new System.EventHandler(this.gridSearchResult_SelectionChanged_1);
            // 
            // nameDataGridViewTextBoxColumn
            // 
            this.nameDataGridViewTextBoxColumn.DataPropertyName = "Name";
            this.nameDataGridViewTextBoxColumn.HeaderText = "Name";
            this.nameDataGridViewTextBoxColumn.Name = "nameDataGridViewTextBoxColumn";
            this.nameDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // uRLDataGridViewTextBoxColumn
            // 
            this.uRLDataGridViewTextBoxColumn.DataPropertyName = "URL";
            this.uRLDataGridViewTextBoxColumn.HeaderText = "URL";
            this.uRLDataGridViewTextBoxColumn.Name = "uRLDataGridViewTextBoxColumn";
            this.uRLDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // loginDataGridViewTextBoxColumn
            // 
            this.loginDataGridViewTextBoxColumn.DataPropertyName = "Login";
            this.loginDataGridViewTextBoxColumn.HeaderText = "Login";
            this.loginDataGridViewTextBoxColumn.Name = "loginDataGridViewTextBoxColumn";
            this.loginDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // searchResultsBindingSource
            // 
            this.searchResultsBindingSource.DataMember = "SearchResults";
            this.searchResultsBindingSource.DataSource = this.azureSQLGitRepoDataSet;
            // 
            // azureSQLGitRepoDataSet
            // 
            this.azureSQLGitRepoDataSet.DataSetName = "AzureSQLGitRepoDataSet";
            this.azureSQLGitRepoDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // searchResultsTableAdapter
            // 
            this.searchResultsTableAdapter.ClearBeforeFill = true;
            // 
            // downloadRepoToolStripMenuItem
            // 
            this.downloadRepoToolStripMenuItem.Name = "downloadRepoToolStripMenuItem";
            this.downloadRepoToolStripMenuItem.Size = new System.Drawing.Size(103, 20);
            this.downloadRepoToolStripMenuItem.Text = "Download Repo";
            this.downloadRepoToolStripMenuItem.Click += new System.EventHandler(this.downloadRepoToolStripMenuItem_Click);
            // 
            // clearResultsToolStripMenuItem
            // 
            this.clearResultsToolStripMenuItem.Name = "clearResultsToolStripMenuItem";
            this.clearResultsToolStripMenuItem.Size = new System.Drawing.Size(83, 20);
            this.clearResultsToolStripMenuItem.Text = "Clear results";
            this.clearResultsToolStripMenuItem.Click += new System.EventHandler(this.clearResultsToolStripMenuItem_Click);
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSize = true;
            this.ClientSize = new System.Drawing.Size(1108, 528);
            this.Controls.Add(this.gridSearchResult);
            this.Controls.Add(this.mStripMain);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MainMenuStrip = this.mStripMain;
            this.Name = "frmMain";
            this.Text = "Ateliware Challenge";
            this.Load += new System.EventHandler(this.frmMain_Load);
            this.mStripMain.ResumeLayout(false);
            this.mStripMain.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.gridSearchResult)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.searchResultsBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.azureSQLGitRepoDataSet)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip mStripMain;
        private System.Windows.Forms.ToolStripMenuItem getRepoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem viewRepoDetailsToolStripMenuItem;
        private System.Windows.Forms.DataGridView gridSearchResult;
        private AzureSQLGitRepoDataSet azureSQLGitRepoDataSet;
        private System.Windows.Forms.BindingSource searchResultsBindingSource;
        private AzureSQLGitRepoDataSetTableAdapters.SearchResultsTableAdapter searchResultsTableAdapter;
        private System.Windows.Forms.DataGridViewTextBoxColumn nameDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn uRLDataGridViewTextBoxColumn;
        private System.Windows.Forms.DataGridViewTextBoxColumn loginDataGridViewTextBoxColumn;
        private System.Windows.Forms.ToolStripMenuItem downloadRepoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem clearResultsToolStripMenuItem;
    }
}

