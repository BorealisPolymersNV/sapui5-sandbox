USE [master]
GO
/****** Object:  Database [SAPMII_ESLB-Sandbox2]    Script Date: 2016-03-22 09:21:02 ******/
CREATE DATABASE [SAPMII_ESLB-Sandbox2] ON  PRIMARY 
( NAME = N'SAPMII_ESLB-Sandbox2', FILENAME = N'J:\SQLData\SAPMII_ESLB-Sandbox2.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'SAPMII_ESLB-Sandbox2_log', FILENAME = N'K:\SQLLogs\SAPMII_ESLB-Sandbox2_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SAPMII_ESLB-Sandbox2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET ARITHABORT OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET  MULTI_USER 
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET DB_CHAINING OFF 
GO
USE [SAPMII_ESLB-Sandbox2]
GO
/****** Object:  User [SAPMII_ESLB-Sandbox2_RW]    Script Date: 2016-03-22 09:21:03 ******/
CREATE USER [SAPMII_ESLB-Sandbox2_RW] FOR LOGIN [SAPMII_ESLB-Sandbox2_RW] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [MIGNETWORK\U-SEC-eSLBReporting-Administrators]    Script Date: 2016-03-22 09:21:03 ******/
CREATE USER [MIGNETWORK\U-SEC-eSLBReporting-Administrators] FOR LOGIN [MIGNETWORK\U-SEC-eSLBReporting-Administrators]
GO
/****** Object:  User [MIGNETWORK\SVCORION]    Script Date: 2016-03-22 09:21:03 ******/
CREATE USER [MIGNETWORK\SVCORION] FOR LOGIN [MIGNETWORK\SVCORION] WITH DEFAULT_SCHEMA=[MIGNETWORK\SVCORION]
GO
/****** Object:  User [MIGNETWORK\STCOLMJO]    Script Date: 2016-03-22 09:21:03 ******/
CREATE USER [MIGNETWORK\STCOLMJO] FOR LOGIN [MIGNETWORK\STCOLMJO] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [MIGNETWORK\STANDESO]    Script Date: 2016-03-22 09:21:03 ******/
CREATE USER [MIGNETWORK\STANDESO] FOR LOGIN [MIGNETWORK\STANDESO] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [SAPMII_ESLB-Sandbox2_RW]
GO
ALTER ROLE [db_owner] ADD MEMBER [MIGNETWORK\U-SEC-eSLBReporting-Administrators]
GO
ALTER ROLE [db_owner] ADD MEMBER [MIGNETWORK\STCOLMJO]
GO
ALTER ROLE [db_owner] ADD MEMBER [MIGNETWORK\STANDESO]
GO
/****** Object:  Schema [MIGNETWORK\SVCORION]    Script Date: 2016-03-22 09:21:04 ******/
CREATE SCHEMA [MIGNETWORK\SVCORION]
GO
/****** Object:  Table [dbo].[Event]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event](
	[idEvent] [int] IDENTITY(1,1) NOT NULL,
	[eventDef] [nchar](7) NOT NULL,
	[ip21Event] [int] NOT NULL,
	[eventReason] [nchar](7) NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[idEvent] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventDef]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventDef](
	[idEventDef] [nchar](10) NOT NULL,
	[eventType] [nchar](4) NOT NULL,
	[factory] [int] NOT NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [PK_EventDef] PRIMARY KEY CLUSTERED 
(
	[idEventDef] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventReason]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventReason](
	[idEventReason] [nchar](4) NOT NULL,
	[idEventType] [nchar](4) NOT NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [PK_EventReason_1] PRIMARY KEY CLUSTERED 
(
	[idEventReason] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventSubReason]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EventSubReason](
	[idEventSubReason] [nchar](7) NOT NULL,
	[eventReason] [nchar](4) NOT NULL,
	[name] [varchar](255) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [PK_EventReason] PRIMARY KEY CLUSTERED 
(
	[idEventSubReason] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EventType]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventType](
	[idEventType] [nchar](4) NOT NULL,
	[UOM] [nchar](3) NOT NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [PK_EventType] PRIMARY KEY CLUSTERED 
(
	[idEventType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LocalEventReason]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LocalEventReason](
	[idEventLocalReason] [nchar](7) NOT NULL,
	[plant] [int] NOT NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [PK_LocalEventReason] PRIMARY KEY CLUSTERED 
(
	[idEventLocalReason] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TESTDATA_shiftData]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TESTDATA_shiftData](
	[idShiftData] [int] NOT NULL,
	[idShiftDefinition] [int] NOT NULL,
	[shiftClosedAt] [datetime] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UOM]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UOM](
	[idUOM] [nchar](3) NOT NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
 CONSTRAINT [PK_UOM] PRIMARY KEY CLUSTERED 
(
	[idUOM] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  StoredProcedure [dbo].[sp_max_shift_closed_at]    Script Date: 2016-03-22 09:21:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_max_shift_closed_at]
AS
BEGIN
	SET NOCOUNT ON;

	declare @tmpTable Table (idShiftData int, idShiftDefinition int, shiftClosedAt Datetime, shiftstartedAt Datetime);

	 insert into @tmpTable (idShiftData, idShiftDefinition, shiftClosedAt, shiftstartedAt)
		select shiftData.idShiftData, shiftData.idShiftDefinition, shiftData.shiftClosedAt, shiftDataPrev.shiftClosedAt as shiftstartedAt
		from TESTDATA_shiftData shiftData, TESTDATA_shiftData shiftDataPrev
		where shiftData.shiftClosedAt > shiftDataPrev.shiftClosedAt
		order by idShiftData

	select idShiftData, shiftClosedAt, max(shiftStartedAt) as shiftStartedAt from @tmpTable group by idShiftData, shiftClosedAt;
	END;

GO
USE [master]
GO
ALTER DATABASE [SAPMII_ESLB-Sandbox2] SET  READ_WRITE 
GO
