/*
 * List Events with reason codes etc.
 */

IF OBJECT_ID('dbo.vwEvent') IS NOT NULL
DROP VIEW dbo.vwEvent
GO
CREATE VIEW dbo.vwEvent
AS
SELECT 
 ed.idFactory, cp.idEvent, cp.idEventDef, cp.timeStart, cp.timeEnd, cp.totMeasured, ed.idEventType, 
  uc.idEventReason, er.name eventReasonName, 
  uc.idEventSubReason, es.name eventSubReasonName,
  uc.idEventLocalReason, el.name eventLocalReasonName,
  uc.Comment,
  ps.idShiftData
FROM 
  EventUserClassification uc 
  LEFT OUTER JOIN EventReason er ON uc.idEventReason = er.idEventReason
  LEFT OUTER JOIN EventSubReason es ON uc.idEventSubReason = es.idEventSubReason
  LEFT OUTER JOIN EventLocalReason el ON uc.idEventLocalReason = el.idEventLocalReason,
  EventIP21Copy cp, EventDef ed, EventType et, EventPerShift ps
WHERE cp.idEvent = uc.idEvent
  AND cp.idEventDef = ed.idEventDef 
  AND ed.idEventType = et.idEventType
  AND uc.idEvent = ps.idEvent