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
    
    console.log(eventMsg.id)
    console.log(eventMsg.id_str)
    console.log(eventMsg.text)
    console.log(eventMsg.in_reply_to_screen_name)
    console.log(eventMsg.in_reply_to_user_id_str)
    console.log(eventMsg.in_reply_to_user_id)
    console.log(eventMsg.user)

    if (replyto === 'ram_simp') {
      tweetIt(eventMsg); 
    }
  }


  console.log( 'boinking the boobies' )

function tweetIt(eventMsg) {
    filenames = fs.readdirSync(path.join(__dirname, "images"))

    console.log( 'picking a random image...' );

    var file = filenames[Math.ceil( Math.random() * filenames.length)]; 
    console.log( file );

    const imagePath = path.join(__dirname, "images" , `${file}`);

    b64content = fs.readFileSync( imagePath, { encoding: 'base64' } );


  console.log( 'uploading an image...' );
  
 
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
 });
};



//entities.user_mentions.screen_name  'ram_simp'