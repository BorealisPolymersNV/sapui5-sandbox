/*
 * Simple test script, copy and paste into a query window. No asserts yet,
 * results needs to be verfied manually.
 */

declare @idFactory int = 23;
exec spGetEvents @idFactory;
select (@@rowcount), 'should equal 56';

declare @start Datetime = convert(date, '2016-01-01', 102);
declare @end Datetime = convert(date, '2016-01-30', 102);
exec spGetEvents @idFactory, @start, @end;
select (@@rowcount), 'should equal 1';

set @idFactory = 8;
exec spGetEvents @idFactory, null, null;
select (@@rowcount), 'should equal 0';