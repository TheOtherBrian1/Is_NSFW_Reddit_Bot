# Is_NSFW_Reddit_Bot

Detects if an account is NSFW. Intended to be used by platonic friend forums on Reddit to prevent malicious actors from infiltrating. Designed initially for the platonic sub, /r/cuddle_buddies, 
<img src = "Readme-assets/demo.png" />

<hr />
<h4>Concept</h4>
<p>
	With the on going pandemic, the loneliness crisis has been severely exacerbated. First formalized in 2017 by former US Surgeon General Vivek Murthy, the loneliness crisis outlines a growing phenomenon where rouhgly 22%, 60 million Americans, felt intense isolation and lack of connection throughout the year. Although researchers have identified multiple forms of loneliness (the two dominant forms are emotional loneliness and social loneliness. My pursuit prioritized emotional loneliness over social loneliness. Emotional loneliness is defined as the subjective sense that there is a troubling deficit between your desired level of intimate connection and your actual level. 
</p>
<p>
	There are a series of online forums and communities built around relieving this form loneliness. In fact, there is a small, but fascinating industry focused on platonic intimacy and touch starvation relief. The main industry leaders are Cuddle Comfort and Rent a Friend. The main question is do these services actually provide relief. Can self-coordinated intimacy with strangers be effective against loneliness? Considering chronic loneliness is the equivalent of smoking 15 cigarettes a day when it comes to mortality, it's important to review all avenues for relieving it. As absurd as it it may feel, even digitally relevant methods for relieving loneliness must be considered. It is unfortunate, but most major studies surrounding loneliness relief prioritize the elderly, leaving behind a large population of confused and desperate young people. 
</p>
<p>
	The bot stemmed from a need to collect more data about the nature of people using certain subs, although it can be used and modified for any purpose. 
</p>

<p>
	This is an ongoing research project, that I am leaving public, despite it's lack of resolution. GitHub offers the necessary transparency required to reassure invested parties that their data and information is being handled properly.
</p>

<hr />
<h4>Description of Bot:</h4>
<p>When the bot is deployed to a Reddit forum, it will scan all new comments. When a user responds to a comment or post with <em>is_nsfw?</em>, the bot will scan the last 100 engagements the parent comment/submission for activity labeled NSFW. The bot will return a table of all the flagged submissions, as well as deviancy score. The deviancy score is determined from data that was scraped from 692 randomly selected users. Data analysis and cleaning was done with Pandas, Seaborn, and Google Big Query</p>

<hr />
<h3>Technologies used</h3>
<ul>
    <li>
        Python
    </li>
    <li>
        SQL
    </li>
    <li>
        Google Big Query
    </li>
    <li>
        Jupyter Notebook
    </li>
    <li>
        Puppeteer
    </li>
    <li>
        JavaScript
    </li>
    <li>
        Reddit API
    </li>
    <li>
        Heroku
    </li>
</ul>
<hr />
<h4><a href = "https://medium.com/@bbrenng1/create-your-first-reddit-bot-with-python-and-heroku-e75d7af3026f">Directions to deploy the bot.</a></h4>
<ol>
	<li>
		Create a Heroku account
	</li>
	<li>
		Install the Heroku command line tool
	</li>
	<li>
		Login to Heroku via the command line
	</li>
	<li>
		clone the git hub repository
	</li>
	<li>
		In main.py, change the trigger word to your preferred keyword. Change the default subreddit to your targetted sub-reddit.
	</li>
	<li>
		Deploy with the Heroku command line tool
	</li>
</ol>
