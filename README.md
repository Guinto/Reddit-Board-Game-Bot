# Reddit-Board-Game-Bot
**Current Status:** Not running. See this reddit post for details: [https://www.reddit.com/r/boardgames/comments/9fv39a/i_made_a_boardgame_reddit_bot_that_looks_up_the/](https://www.reddit.com/r/boardgames/comments/9fv39a/i_made_a_boardgame_reddit_bot_that_looks_up_the/)

This fetches board game entries from the [5 Color Combo board game API](https://www.5colorcombo.com/api/docs) whenever a comment is made and replies with the listed boardgame. It's running on a free heroku tier currently. 

## How to use it
The bot only checks comments on the /r/boardgames subreddit right now. If you make a post using the syntax ```[[exact game name]]``` then it will reply with an image of the game and a link to the game's listing on the 5 Color Combo board game search. Here's a link to a real example.

[![Reddit board game bot example](https://s3-us-west-1.amazonaws.com/5cc.images/games/reddit_bot_ex.png)](https://www.reddit.com/r/boardgames/comments/9fkzqo/turns_out_it_is_possible_to_get_a_negative_score/e5xr0xe)
