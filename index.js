var request = require('request');
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const r = new Snoowrap({
    userAgent: 'web:5cc-boardgame-reddit-bot:v0.1 (by /u/boardgame_bot)',
    clientId: process.env.REDDIT_CLIENT,
    clientSecret: process.env.REDDIT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS,
});
const client = new Snoostorm(r);

const streamOpts = {
    subreddit: 'boardgames',
    results: 1000
};

const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    postReply(comment);
});

function postReply(comment) {
    if (comment.body.indexOf('\\\[\\\[') != -1 && comment.body.indexOf('\\\]\\\]') != -1) {
        var names = comment.body.match(/\\\[\\\[(?:.|)*?\\\]\\\]/g).map(e => e.replace('\\\[\\\[', '').replace('\\\]\\\]', ''));
        
        var replyText = "";

        var gamesLeft = names.length;
        var addGameText = function(text) {
            gamesLeft--;
            replyText += text;
            if (gamesLeft == 0 && replyText != "") {
                replyText += '\n\n^(syntax: \[\[exact gamename\]\])'
                try {
                    console.log(replyText.trim())
                    comment.reply(replyText.trim());
                }
                catch (e) {
                    console.log(e);
                }
            }
        };

        for (var i = 0; i < names.length; i++) {
            request({url: "https://www.5colorcombo.com/api/search?exact=true&name=" + encodeURIComponent(names[i]) + "&utm_source=reddit_bot&utm_medium=api&utm_campaign=api_exposure" } , function(err, res, jsonString) {
                var json = JSON.parse(jsonString);
                if (json.games.length >= 1) {
                    var game = json.games[0];
                    addGameText("\n\n* [" + game.name + "](" + game.image_url + ") \- [(5CC)](" + game.url + ")")
                }
                else {
                    addGameText("");
                }
            });
        }
    }
}
