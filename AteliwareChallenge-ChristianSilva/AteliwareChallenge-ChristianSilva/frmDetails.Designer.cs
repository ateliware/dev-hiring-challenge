namespace AteliwareChallenge
{
    partial class frmDetails
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
            this.listContents = new System.Windows.Forms.ListView();
            this.SuspendLayout();
            // 
            // listContents
            // 
            this.listContents.HideSelection = false;
            this.listContents.Location = new System.Drawing.Point(1, 1);
            this.listContents.MultiSelect = false;
            this.listContents.Name = "listContents";
            this.listContents.Size = new System.Drawing.Size(349, 447);
            this.listContents.TabIndex = 0;
            this.listContents.UseCompatibleStateImageBehavior = false;
            this.listContents.View = System.Windows.Forms.View.List;
            // 
            // frmDetails
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(351, 450);
            this.Controls.Add(this.listContents);
            this.Name = "frmDetails";
            this.Text = "Repo details";
            this.Load += new System.EventHandler(this.frmDetails_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListView listContents;
    }
}