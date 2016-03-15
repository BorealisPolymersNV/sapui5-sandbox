LUCKA I SHIFT
==============


SQL FROM MII FUNKTION GetShiftReportFromPlants
----------------------------------------------

/* Returns closed actual shift start and end times for all logbooks in a plant 
   Parameter.1 = Any logbook on that plant    
   By Sonny Andersson  */

DECLARE @Param1 int;
SET @Param1 = 62;

DECLARE @Param2 Datetime;
SET @Param2 = convert(datetime, '2015.08.08', 102);

DECLARE @Param3 varchar;
SET @Param3 = 'ShiftDataPrev.shiftClosedAt DESC';

DECLARE @Param4 int;
SET @Param4 = 0;
   
SELECT TOP 3000 ShiftData.[idFactory]

      , ShiftData.[idShiftData] as ID
      , ShiftData.[plannedShiftStart] as PlanShiftStart
      , ShiftData.[plannedShiftEnd] as PlanShiftEnd
      , ShiftDataPrev.shiftClosedAt as ShiftStart
      , ShiftData.shiftClosedAt as ShiftEnd
      , ShiftData.shiftClosedBy as ClosedBy
      ,ShiftData.tagReportID
      ,ShiftData.tagReportDataKey
      ,ShiftData.tagComment
      ,ShiftData.idFactory

, Case when SUBSTRING(ShiftData.HandOverReportData,1,1) = '<' Then 'OLD' Else 'VER2' end as ReportTechnology

      ,ShiftConfig.ShiftName

      , team.teamName AS TeamName

      ,LogBook.name AS Logbook
      ,LogBook.[isMainLogBook]
  FROM 
	[ShiftData]
	
   LEFT JOIN 
	[ShiftData] ShiftDataPrev
       		ON ShiftData.[plannedShiftStart]= ShiftDataPrev.[plannedShiftEnd]  
		and ShiftData.idFactory = ShiftDataPrev.idFactory

    	LEFT JOIN Factory Logbook
		ON Logbook.idFactory = ShiftData.idFactory   

	LEFT JOIN ShiftConfig 
		ON ShiftConfig.idShiftConfig  = ShiftData.idShiftDefinition 

	LEFT JOIN Team team ON
		team.idFactory = ShiftData.idFactory
		AND
		team.idTeam = ShiftData.idTeam

  Where 
	ShiftData.shiftClosed = 1 and 
	ShiftData.idFactory IN (
	
	
	/****** Takes any logBook id (idFactory) and returns all loogboos at that plant  ******/
/*  By Sonny Andersson */
Select Y.LogbookAtPlant from (

SELECT [idFactory] as MainLogbook
      ,[idSubFactory] as LogbookAtPlant
  FROM [AssignedSubFactory] 
  
  Union
  
SELECT distinct [idFactory]
      ,[idFactory]
  FROM [AssignedSubFactory] 
  ) as Y 
  Where Y.MainLogbook = (
  

Select X.MainLogbook from (

SELECT [idFactory] as MainLogbook
      ,[idSubFactory] as LogbookAtPlant
  FROM [AssignedSubFactory] 
  
  Union
  
SELECT distinct [idFactory]
      ,[idFactory]
  FROM [AssignedSubFactory] 
  ) as X 
  Where X.LogbookAtPlant = @Param1
  
  )
)	
	
/* -------------------------------------------------------------------------- */	
	
	
	
--	   AND 	ShiftData.HandOverReportData is not null    -- Taken out 20150911 to support old and new reports
	AND (ShiftData.shiftClosedAt >= @Param2)  
	and ([isMainLogBook] = @Param4 or (@Param4 = 0))
ORDER BY
ShiftDataPrev.shiftClosedAt DESC

View
-----


SELECT        TOP (20000) dbo.ShiftData.idFactory AS shiftIdFactory, dbo.ShiftData.idShiftData AS ID, dbo.ShiftData.plannedShiftStart AS PlanShiftStart, 
                         dbo.ShiftData.plannedShiftEnd AS PlanShiftEnd, ShiftDataPrev.shiftClosedAt AS ShiftStart, dbo.ShiftData.shiftClosedAt AS ShiftEnd, 
                         dbo.ShiftData.shiftClosedBy AS ClosedBy, dbo.ShiftConfig.ShiftName, team.teamName, Logbook.name AS Logbook, Logbook.isMainLogBook, 
                         dbo.ShiftData.shiftClosedByFullName, dbo.ShiftData.HandOverToPerson, dbo.ShiftData.tagReportDataKey, dbo.ShiftData.tagReportID, dbo.ShiftData.tagComment, 
                         dbo.ShiftData.shiftClosed, Logbook.site, dbo.ShiftData.idShiftDefinition
FROM            dbo.ShiftData LEFT OUTER JOIN
                         dbo.ShiftData AS ShiftDataPrev ON dbo.ShiftData.plannedShiftStart = ShiftDataPrev.plannedShiftEnd AND 
                         dbo.ShiftData.idFactory = ShiftDataPrev.idFactory LEFT OUTER JOIN
                         dbo.Factory AS Logbook ON Logbook.idFactory = dbo.ShiftData.idFactory LEFT OUTER JOIN
                         dbo.ShiftConfig ON dbo.ShiftConfig.idShiftConfig = dbo.ShiftData.idShiftDefinition LEFT OUTER JOIN
                         dbo.Team AS team ON team.idFactory = dbo.ShiftData.idFactory AND team.idTeam = dbo.ShiftData.idTeam
WHERE        (dbo.ShiftData.plannedShiftStart < GETDATE() + 20) AND (dbo.ShiftData.plannedShiftStart > GETDATE() - 200)


Data from produktion
--------------------


/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP 1000 [idFactory]
      ,[idShiftData]
      ,[idShiftDefinition]
      ,[idTeam]
      ,[plannedShiftStart]
      ,[plannedShiftEnd]
      ,[shiftClosed]
      ,[shiftClosedBy]
      ,[shiftClosedAt]
      ,[idShiftCycle]
 
  FROM [SAPMII_ESLB-T].[dbo].[ShiftData] where idFactory = 63 
  order by plannedShiftEnd
  
  
  
  
My solution
-----------


USE [SAPMII_ESLB-Sandbox2]

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE sp_max_shift_closed_at
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

EXEC sp_max_shift_closed_at;



