
def post_or_comment(nsfw_sub_list):
	posts = []
	comments = []
	for engagement in nsfw_sub_list:
		if engagement[0]:
			index = len(posts)
			posts.append(f'[{index}]({engagement[1]})')
		else:
			index = len(comments)
			comments.append(f'[{index}]({engagement[1]})')

	return [", ".join(posts), ", ".join(comments)]


def format_markdown_body(nsfw_subreddits):
	markdown_body = ''
	for sub_title in nsfw_subreddits:
		nsfw_subreddit = nsfw_subreddits[sub_title]
		times_sub_referenced = len(nsfw_subreddits[sub_title])
		posts, comments = post_or_comment(nsfw_subreddit)
		markdown_body += f"|{str(sub_title)}|{times_sub_referenced}|{posts}|{comments}|\n"
	return markdown_body

