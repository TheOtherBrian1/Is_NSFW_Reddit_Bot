def format_markdown_header(username, engagements_searched, percentile):
	return f"""
		Testing: {username}\n\nEngagements searched: {engagements_searched}\n\nPercentile of deviency(55% of users have no NSFW engagements): {percentile}%\n\n|NSFW Subs|Engagements|posts|comments|\n|:-|:-|:-|:-|\n"""
