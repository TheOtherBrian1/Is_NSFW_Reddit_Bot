WITH Users AS(
    SELECT 
        submissions.author, 
        submissions.subreddit
    FROM `redditcuddledata.Reddit6MonthsScrapedData.user_submission_to_other_subs` AS submissions

    UNION ALL

    SELECT 
        comments.author, 
        comments.subreddit
    FROM `redditcuddledata.Reddit6MonthsScrapedData.user_comments` AS comments
)
SELECT DISTINCT 
    #UPPER(Cuddle.linkFlairCSS) AS Flair,
    COUNT(Users.subreddit) AS sub_count,
    Users.subreddit
    #Users.author
FROM `redditcuddledata.Reddit6MonthsScrapedData.redditcuddledata6` AS Cuddle
INNER JOIN Users 
    ON Cuddle.Author = Users.author
INNER JOIN `redditcuddledata.Reddit6MonthsScrapedData.nsfw` AS Nsfw
    ON Users.subreddit = Nsfw.nsfw
WHERE Cuddle.linkFlairCSS IS NOT NULL
GROUP BY Users.subreddit
ORDER BY sub_count ASC