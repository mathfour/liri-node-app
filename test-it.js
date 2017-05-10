/**
 * Created by SilverDash on 5/8/17.
 */
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'OiNxc1KgoWsfJ3UfMxhWRAkyv',
    consumer_secret: 'QQPI9WOUrRHIRzRA3Wy0Y5DOU3IEPe2D8VVGZ8qlmwuRveYvRk',
    access_token_key: '247458967-RI5iUUYEbLtQJ6VpLGzRre4XbK8MnxnrJwzlRawW',
    access_token_secret: 'dmZqG0ySL5hfU9mxkIrFvhnGNQz729WhSu8KlVcj3whLd'
});

var params = {screen_name: 'mathfour'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    var i=0;
    if (!error) {
        console.log("The last 10 tweets for @MathFour are: ");
        do{
            console.log(i+1 + ". " + tweets[i].text);
            i++;
        } while (i<10);
    }
});