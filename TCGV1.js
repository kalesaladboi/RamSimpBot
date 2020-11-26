console.log('Ram Worship Initiate');

var Twit = require( 'twit' ),
      fs = require( 'fs' ),
      path = require( 'path' ),
      config = require( path.join( __dirname, 'config.js' ) );

var config = require('./config.js');

var T = new Twit( config );

var stream = T.stream('statuses/filter', { track: '@ram_simp' });

stream.on( 'tweet', tweetEvent)


function tweetEvent(eventMsg) {
    var json = JSON.stringify(eventMsg,null,2);
    fs.writeFileSync("tweet.json" , json);
    var replyto = eventMsg.in_reply_to_screen_name;
    var tweet_id = eventMsg.id_str;

    if (replyto === 'ram_simp') {
      tweetIt(eventMsg); 
    }
  }

function tweetIt(eventMsg) { 
        console.log( 'picking a random image...' );
        var rarity = Math.ceil( Math.random() * 100 )
        if ( rarity < 1 ) {
          var rarity = 'epic'  
        } else if ( rarity >= 1 && rarity <= 5){    
          var rarity = 'rare'
        } else if ( rarity >= 5 && rarity <= 25) {   
          var rarity = 'uncommon' 
        } else  {   
          var rarity = 'common'
        }
        console.log(rarity)

        filenames = fs.readdirSync(path.join(__dirname, "Cards" , rarity))

        var outcome = Math.ceil( Math.random() * Object.keys(filenames).length)
        var answer = filenames[outcome]

        console.log(filenames[outcome])

        const imagePath = path.join(__dirname, "Cards" , rarity , answer );

        b64content = fs.readFileSync( imagePath, { encoding: 'base64' } );

        console.log( 'uploading an image...' );

       const post = new Promise((res,rej) =>
  T.post( 'media/upload', { media_data: b64content }, function ( err, data, response ) {
     var mediaIdStr = data.media_id_string
     var altText = "Ram Me Harder"
     var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
  
      T.post('media/metadata/create', meta_params, function (err, data, response) {
         if (!err) {
             var params = { status: `@${eventMsg.user.screen_name} Get Rammed` , media_ids: [mediaIdStr] , in_reply_to_status_id: eventMsg.id_str }
                T.post( 'statuses/update', params , function( err, data, response) {
                     if (err){
                            console.log( 'error:', err );
                             }
                             else{
                                console.log( 'posted an image!' );

                             }
                         }
                    );
  
                 };
             });
          })
       )
};