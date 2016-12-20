var Twitter = require('twitter');
var googleTranslate = require('google-translate')("");


var number = 0;


var client = new Twitter({
  consumer_key: '',
  consumer_secret: ,
  access_token_key: '',
  access_token_secret: ''
});
 

var detectLanguage = function(tweet){
	googleTranslate.detectLanguage(tweet, function(err, detection) {
	  return detection.language;
	});
}
var translateTweet = function(tweet){
	googleTranslate.translate(tweet, "en", function(err, translation) {
	  return translation.translatedText;
	});
}



var  printTweet = function(tweet){
	var twi = {};
	twi.No = number++;
	if (detectLanguage(tweet.text) != "en"){
		twi.text = translateTweet(tweet.text);
	}
	else {
		twi.text = tweet.text;
	}

	if (tweet.user){ 
		twi.location = tweet.user.location;
	}
	else {twi.location = "";}
	twi.coordinates = tweet.coordinates;

    return twi;
}

var params = {screen_name: 'dlegrin'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
		printTweet(tweets[0]);
  }
});



 
// You can also get the stream in a callback if you prefer. 
client.stream('statuses/sample', function(stream) {
  stream.on('data', function(event) {
    if (number < 5){if (event.coordinates || (event.user && event.user.location)) {
    	console.log(printTweet(event));
    }}
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
