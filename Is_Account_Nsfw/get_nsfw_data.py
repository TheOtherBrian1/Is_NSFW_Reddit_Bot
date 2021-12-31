def get_nsfw_data(username, reddit):
		"""
			Filters NSFW engagements from a user's first 100 engagements.
			Returns an array with the following:
				[0]: an object that holds arrays of subreddit links {"first_nsfw_subreddit_name": ['links'...], ...}
				[1]: the total nsfw engagements searched
				[2]: the total engagements searched
				[3]: the user's name
		"""
		print(username)
		user_object = reddit.redditor(username)
		user_engagements = user_object.new(limit=100)
		nsfw_subreddits = {}
		total_loops = 0
		total_nsfw = 0
		is_post = False
		for engagement in user_engagements:
			#help(engagement)
			if engagement.over_18:
				if hasattr(engagement, 'title'):
					is_post = True
				else: 
					is_post = False
				total_nsfw += 1
				if not nsfw_subreddits.get(engagement.subreddit):
					nsfw_subreddits[engagement.subreddit] = [[is_post, engagement.permalink]]
				else:
					nsfw_subreddits[engagement.subreddit].append([is_post, engagement.permalink])
				
			total_loops +=1
		return [nsfw_subreddits, total_nsfw, total_loops, engagement.author]
