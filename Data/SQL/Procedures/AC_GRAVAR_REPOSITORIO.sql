USE [DBAC0001]
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AC_GRAVAR_REPOSITORIO]') AND type in (N'P', N'PC'))
BEGIN
	DROP PROCEDURE [dbo].[AC_GRAVAR_REPOSITORIO]
END
GO  

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/****** Object:  	StoredProcedure [dbo].[AC_GRAVAR_REPOSITORIO]
		
	Release: 	0
	Author:		<Adriano Fonseca da Costa>
	Date:		<14-07-2019/Criação>
	Remarks:	<Procedure para Registrar os Repositórios>
	
*/

/******************************* [INICIO] *********************************/

CREATE PROCEDURE [dbo].[AC_GRAVAR_REPOSITORIO] ( @JSON_REPO NVARCHAR(MAX), @JSON_REPO_ORI NVARCHAR(MAX), @JSON_OWNER_ORI NVARCHAR(MAX) )
AS
BEGIN	

	---------> Carregar as Tabelas Temporárias de 'Repository' e 'Owner'
	SELECT		
		id AS id_repository, [name] AS [name], full_name AS full_name, html_url AS html_url, 
		[description] AS [description], stargazers_count AS stargazers_count,
		created_at AS created_at, updated_at AS updated_at, pushed_at AS pushed_at, 
		forks AS forks, open_issues AS open_issues, [owner] AS id_owner
	INTO #TMP_INFO_REPO
	FROM OPENJSON(@JSON_REPO)
	WITH (
		id					INT				'$.id',
		[name]				VARCHAR(100)	'$.name',
		full_name			VARCHAR(200)	'$.full_name',
		html_url			NVARCHAR(500)	'$.html_url',
		[description]		NVARCHAR(1000)	'$.description',
		stargazers_count	INT				'$.stargazers_count',
		created_at			CHAR(20)		'$.created_at',
		updated_at			CHAR(20)		'$.updated_at',
		pushed_at			CHAR(20)		'$.pushed_at',
		forks				INT				'$.forks',
		open_issues			INT				'$.open_issues',
		[owner]				INT				'$.owner.id'
	)

	SELECT		
		id AS id_owner, [login] AS [login], avatar_url AS avatar_url, 
		html_url AS html_url, [type] AS [type]
	INTO #TMP_INFO_OWNER
	FROM OPENJSON(@JSON_REPO, '$.owner')
	WITH (
		id					INT				'$.id',
		[login]				VARCHAR(100)	'$.login',
		avatar_url			NVARCHAR(500)	'$.avatar_url',
		html_url			NVARCHAR(500)	'$.html_url',
		[type]				VARCHAR(50)		'$.type'
	)

	DECLARE @ERRO AS INT
	SET @ERRO = 0

	BEGIN TRANSACTION		

		-------> Verifica Existência e Insere Novo 'Owner'
		INSERT INTO dbo.[Owner] (id_owner, [login], avatar_url, html_url, [type], original)
		SELECT id_owner, [login], avatar_url, html_url, [type], @JSON_REPO_ORI FROM #TMP_INFO_OWNER
		WHERE id_owner NOT IN (SELECT id_owner FROM dbo.[Owner])
		SET @ERRO = @ERRO + @@ERROR

		-------> Verifica Existência e Insere Novo 'Repository'
		INSERT INTO dbo.Repository (id_repository, id_owner, [name], full_name, html_url, [description], stargazers_count, created_at, updated_at, pushed_at, forks, open_issues, original)
		SELECT id_repository, id_owner, [name], full_name, html_url, [description], stargazers_count, created_at, updated_at, pushed_at, forks, open_issues, @JSON_OWNER_ORI FROM #TMP_INFO_REPO
		WHERE id_repository NOT IN (SELECT id_repository FROM dbo.Repository)
		SET @ERRO = @ERRO + @@ERROR

	IF (@ERRO = 0) BEGIN		
		COMMIT TRANSACTION
	END ELSE BEGIN		
		ROLLBACK TRANSACTION
	END

	DROP TABLE #TMP_INFO_REPO, #TMP_INFO_OWNER
	
END
GO

/********************************* [FIM] **********************************/

GRANT EXECUTE ON [dbo].[AC_GRAVAR_REPOSITORIO] TO [ac]
GO