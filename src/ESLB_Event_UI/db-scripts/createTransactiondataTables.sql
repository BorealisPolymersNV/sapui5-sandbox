/*
 * This script was generated in SQL Server Management Studio, see the technical design for
 * more information.
 */

EXEC sys.sp_dropextendedproperty @name=N'MS_Description' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'EventPerShift', @level2type=N'COLUMN',@level2name=N'idEventPerShift'

GO
/****** Object:  Table [dbo].[EventUserClassification]    Script Date: 2016-04-11 16:15:45 ******/
DROP TABLE [dbo].[EventUserClassification]
GO
/****** Object:  Table [dbo].[EventPerShift]    Script Date: 2016-04-11 16:15:45 ******/
DROP TABLE [dbo].[EventPerShift]
GO
/****** Object:  Table [dbo].[EventIp21Copy]    Script Date: 2016-04-11 16:15:45 ******/
DROP TABLE [dbo].[EventIp21Copy]
GO
/****** Object:  Table [dbo].[EventDetail]    Script Date: 2016-04-11 16:15:45 ******/
DROP TABLE [dbo].[EventDetail]
GO
/****** Object:  Table [dbo].[EventDetail]    Script Date: 2016-04-11 16:15:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventDetail](
	[idEventDetail] [bigint] IDENTITY(1,1) NOT NULL,
	[idEventPerShift] [bigint] NOT NULL,
	[timeStart] [datetime] NOT NULL,
	[timeEnd] [datetime] NULL,
	[classified] [real] NULL,
	[idEventSubReason] [nchar](10) NOT NULL,
	[idEventLocalReason] [nchar](10) NOT NULL,
	[idEquipment] [float] NULL,
 CONSTRAINT [PK_EventDetail] PRIMARY KEY CLUSTERED 
(
	[idEventDetail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventIp21Copy]    Script Date: 2016-04-11 16:15:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventIp21Copy](
	[idEventDef] [nchar](10) NOT NULL,
	[idIP21Event] [nchar](27) NOT NULL,
	[idEvent] [bigint] IDENTITY(1,1) NOT NULL,
	[timeStart] [datetime] NOT NULL,
	[timeEnd] [datetime] NULL,
	[totMeasured] [real] NULL,
	[limitUsedToTrig] [real] NULL,
 CONSTRAINT [PK_EventIp21Copy] PRIMARY KEY CLUSTERED 
(
	[idEvent] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventPerShift]    Script Date: 2016-04-11 16:15:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventPerShift](
	[idEventPerShift] [bigint] IDENTITY(1,1) NOT NULL,
	[idEvent] [bigint] NOT NULL,
	[idShiftData] [bigint] NOT NULL,
	[responsibilityTimeStart] [datetime] NOT NULL,
	[responsibilityTimeEnd] [datetime] NULL,
	[totMeasured] [real] NULL,
 CONSTRAINT [PK_EventPerShift_1] PRIMARY KEY CLUSTERED 
(
	[idEventPerShift] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EventUserClassification]    Script Date: 2016-04-11 16:15:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventUserClassification](
	[idEvent] [int] NOT NULL,
	[Comment] [nchar](10) NULL,
	[idEventReason] [nchar](7) NULL,
	[idEventSubReason] [nchar](10) NULL,
	[idEventLocalReason] [nchar](10) NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[idEvent] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'idEvent and idShiftData are unique together.

idEventPerShift is a auto generated sequence that is used when referring to this table from EventDetails.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'EventPerShift', @level2type=N'COLUMN',@level2name=N'idEventPerShift'
GO
