/*
 * This script was generated in SQL Server Management Studio, see the technical design for
 * more information.
 */
 
/****** Object:  Table [dbo].[EventType]    Script Date: 2016-04-11 16:12:44 ******/
DROP TABLE [dbo].[EventType]
GO
/****** Object:  Table [dbo].[EventSubReason]    Script Date: 2016-04-11 16:12:44 ******/
DROP TABLE [dbo].[EventSubReason]
GO
/****** Object:  Table [dbo].[EventReason]    Script Date: 2016-04-11 16:12:44 ******/
DROP TABLE [dbo].[EventReason]
GO
/****** Object:  Table [dbo].[EventLocalReason]    Script Date: 2016-04-11 16:12:44 ******/
DROP TABLE [dbo].[EventLocalReason]
GO
/****** Object:  Table [dbo].[EventDef]    Script Date: 2016-04-11 16:12:44 ******/
DROP TABLE [dbo].[EventDef]
GO
/****** Object:  Table [dbo].[EventDef]    Script Date: 2016-04-11 16:12:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventDef](
	[idEventDef] [nchar](10) NOT NULL,
	[idEventType] [nchar](4) NOT NULL,
	[idFactory] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[Ip21DefName] [nchar](50) NOT NULL,
	[Ip21Tag] [nchar](50) NOT NULL,
	[idDataServer] [nchar](10) NOT NULL,
	[description] [nvarchar](255) NULL,
	[Enabled] [bit] NULL,
	[maxAllowedTimeNotReported] [int] NULL,
	[maxAllowedAmountNotReported] [real] NULL,
 CONSTRAINT [PK_EventDef] PRIMARY KEY CLUSTERED 
(
	[idEventDef] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventLocalReason]    Script Date: 2016-04-11 16:12:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventLocalReason](
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
/****** Object:  Table [dbo].[EventReason]    Script Date: 2016-04-11 16:12:45 ******/
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
/****** Object:  Table [dbo].[EventSubReason]    Script Date: 2016-04-11 16:12:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EventSubReason](
	[idEventSubReason] [nchar](7) NOT NULL,
	[idEventReason] [nchar](4) NOT NULL,
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
/****** Object:  Table [dbo].[EventType]    Script Date: 2016-04-11 16:12:45 ******/
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
