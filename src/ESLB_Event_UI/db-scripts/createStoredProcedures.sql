-- ================================================
-- Get Events using the view vwEvent
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


IF OBJECT_ID('dbo.spGetEvents') IS NOT NULL
DROP PROCEDURE dbo.spGetEvents
GO
CREATE PROCEDURE dbo.spGetEvents (@idFactory int, @start Datetime = null,  @end Datetime = null)
AS
BEGIN
	SET NOCOUNT ON;
    
    if (@start is null or @end is null)
	   SELECT * FROM vwEvent e WHERE e.idFactory = @idFactory
    else
      SELECT * FROM vwEvent e 
      WHERE e.idFactory = @idFactory 
        AND e.timeStart >= @start
        AND e.timeEnd <=@end
END
GO
