USE [DBAC0001]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Repository]') AND type in (N'U'))
ALTER TABLE [dbo].[Repository] DROP CONSTRAINT IF EXISTS [FK_Repository_Owner]
GO
/****** Object:  Table [dbo].[Repository]    Script Date: 7/14/2019 14:02:23 ******/
DROP TABLE IF EXISTS [dbo].[Repository]
GO
/****** Object:  Table [dbo].[Owner]    Script Date: 7/14/2019 14:02:23 ******/
DROP TABLE IF EXISTS [dbo].[Owner]
GO
/****** Object:  User [ac]    Script Date: 7/14/2019 14:02:23 ******/
DROP USER IF EXISTS [ac]
GO
/****** Object:  User [ac]    Script Date: 7/14/2019 14:02:23 ******/
CREATE USER [ac] FOR LOGIN [ac] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [ac]
GO
/****** Object:  Table [dbo].[Owner]    Script Date: 7/14/2019 14:02:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Owner](
	[id_owner] [int] NOT NULL,
	[login] [varchar](100) COLLATE Latin1_General_CI_AS NOT NULL,
	[avatar_url] [nvarchar](500) COLLATE Latin1_General_CI_AS NOT NULL,
	[html_url] [nvarchar](500) COLLATE Latin1_General_CI_AS NOT NULL,
	[type] [varchar](50) COLLATE Latin1_General_CI_AS NOT NULL,
	[original] [nvarchar](max) COLLATE Latin1_General_CI_AS NOT NULL,
 CONSTRAINT [PK_Owner] PRIMARY KEY CLUSTERED 
(
	[id_owner] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
ALTER AUTHORIZATION ON [dbo].[Owner] TO  SCHEMA OWNER 
GO
/****** Object:  Table [dbo].[Repository]    Script Date: 7/14/2019 14:02:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Repository](
	[id_repository] [int] NOT NULL,
	[id_owner] [int] NOT NULL,
	[name] [varchar](100) COLLATE Latin1_General_CI_AS NOT NULL,
	[full_name] [varchar](200) COLLATE Latin1_General_CI_AS NOT NULL,
	[html_url] [nvarchar](500) COLLATE Latin1_General_CI_AS NOT NULL,
	[description] [nvarchar](1000) COLLATE Latin1_General_CI_AS NOT NULL,
	[stargazers_count] [int] NOT NULL,
	[created_at] [char](20) COLLATE Latin1_General_CI_AS NOT NULL,
	[updated_at] [char](20) COLLATE Latin1_General_CI_AS NOT NULL,
	[pushed_at] [char](20) COLLATE Latin1_General_CI_AS NOT NULL,
	[forks] [int] NOT NULL,
	[open_issues] [int] NOT NULL,
	[original] [nvarchar](max) COLLATE Latin1_General_CI_AS NOT NULL,
 CONSTRAINT [PK_Repository] PRIMARY KEY CLUSTERED 
(
	[id_repository] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
ALTER AUTHORIZATION ON [dbo].[Repository] TO  SCHEMA OWNER 
GO
ALTER TABLE [dbo].[Repository]  WITH CHECK ADD  CONSTRAINT [FK_Repository_Owner] FOREIGN KEY([id_owner])
REFERENCES [dbo].[Owner] ([id_owner])
GO
ALTER TABLE [dbo].[Repository] CHECK CONSTRAINT [FK_Repository_Owner]
GO
