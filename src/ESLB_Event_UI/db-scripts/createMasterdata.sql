/*
 * This script was generated in SQL Server Management Studio, see the technical design for
 * more information.
 */

INSERT [dbo].[EventDef] ([idEventDef], [idEventType], [idFactory], [name], [Ip21DefName], [Ip21Tag], [idDataServer], [description], [Enabled], [maxAllowedTimeNotReported], [maxAllowedAmountNotReported]) VALUES (N'FLKAPP3   ', N'FLAR', 23, N'Kallo Flaring PP3', N'DehydrationFlaringEvent                           ', N'KADHHC_FLARING_AVG                                ', N'1         ', NULL, 1, NULL, NULL)
GO
INSERT [dbo].[EventDef] ([idEventDef], [idEventType], [idFactory], [name], [Ip21DefName], [Ip21Tag], [idDataServer], [description], [Enabled], [maxAllowedTimeNotReported], [maxAllowedAmountNotReported]) VALUES (N'FLSTCRA   ', N'FLAR', 8, N'Stenungsund Cracker Flaring', N'DUMMY                                             ', N'DUMMY                                             ', N'DUMMY     ', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[EventReason] ([idEventReason], [idEventType], [name], [description]) VALUES (N'CONT', N'FLAR', N'Continious production flaring', N'Continious production flaring')
GO
INSERT [dbo].[EventReason] ([idEventReason], [idEventType], [name], [description]) VALUES (N'INIT', N'FLAR', N'Initial startup flaring', N'Initial startup flaring')
GO
INSERT [dbo].[EventLocalReason] ([idEventLocalReason], [plant], [name], [description]) VALUES (N'0080001', 8, N'ST Local Reason 1', NULL)
GO
INSERT [dbo].[EventLocalReason] ([idEventLocalReason], [plant], [name], [description]) VALUES (N'0080002', 8, N'ST Local Reason 2', NULL)
GO
INSERT [dbo].[EventSubReason] ([idEventSubReason], [idEventReason], [name], [description]) VALUES (N'CONT001', N'CONT', N'Well with low gas-to-oil ratio (GOR)', NULL)
GO
INSERT [dbo].[EventSubReason] ([idEventSubReason], [idEventReason], [name], [description]) VALUES (N'CONT002', N'CONT', N'Gas Utilization Infeasible', NULL)
GO
INSERT [dbo].[EventSubReason] ([idEventSubReason], [idEventReason], [name], [description]) VALUES (N'CONT003', N'CONT', N'Gas release to flare', NULL)
GO
INSERT [dbo].[EventSubReason] ([idEventSubReason], [idEventReason], [name], [description]) VALUES (N'INIT001', N'INIT', N'Initial', NULL)
GO
INSERT [dbo].[EventType] ([idEventType], [UOM], [name], [description]) VALUES (N'EQFL', N'PC ', N'Equipment failure', NULL)
GO
INSERT [dbo].[EventType] ([idEventType], [UOM], [name], [description]) VALUES (N'FLAR', N'TON', N'Flaring', NULL)
GO