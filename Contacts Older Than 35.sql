-- Select rows from a Table or View '[Contact]' in schema '[dbo]'
SELECT *
FROM [dbo].[Contact]
WHERE DATEDIFF(year, [BirthDate], GETDATE()) > 35
GO