from Is_Account_Nsfw.format_markdown_body import format_markdown_body
from Is_Account_Nsfw.format_markdown_header import format_markdown_header
from Is_Account_Nsfw.data_figures import nsfw_distribution
from Is_Account_Nsfw.get_nsfw_data import get_nsfw_data

import praw
import os

from dotenv import load_dotenv
load_dotenv()


all_nsfw_from_dist = sum(nsfw_distribution)


def main():
    reddit = praw.Reddit(
        client_id=os.environ['CLIENT_ID'],
        client_secret=os.environ['CLIENT_SECRET'],
        user_agent=os.environ['USER_AGENT'],
        username=os.environ['USER_NAME'],
        password=os.environ['PASSWORD']
    )
    for comment in reddit.subreddit("casualiama").stream.comments():
        try:
            print(comment.author)
            if "isNSFW?" in comment.body:
                username = str(comment.parent().author)
                if not username:
                    continue
                nsfw_subreddits, total_nsfw, total_engagements, author = get_nsfw_data(
                    username, reddit)
                nsfw_percentile = 100 * \
                    sum(nsfw_distribution[:total_nsfw])//all_nsfw_from_dist
                markdown_header = format_markdown_header(
                    author, total_engagements, nsfw_percentile)
                markdown_body = format_markdown_body(nsfw_subreddits)
                comment.reply(markdown_header + markdown_body)
        except:
            pass


if __name__ == "__main__":
    main()
