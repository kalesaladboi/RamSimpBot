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

    console.log(eventMsg.user)

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

  var mediaArray = [];

  const posts = new Promise((res,rej) => {
    T.post("media/upload",{media_data: b64content}, function (err, data, response) {
      
      mediaArray.push(data.media_id_string)

      console.log(mediaArray)

      console.log(data.media_id_string)
      
      res();

     })

  }).then(() => {

  return new Promise((res,rej) => {

   T.post("media/upload",{media_data: b64content}, function (err, data, response) {
     
    mediaArray.push(data.media_id_string)
      
    console.log(mediaArray)
     
    console.log(data.media_id_string)
    
    res();
    })

  }).then( (res,rej) => {

  return new Promise((res,rej) => {

   T.post("media/upload",{media_data: b64content}, function (err, data, response) {

    mediaArray.push(data.media_id_string)

    console.log(mediaArray)

    console.log(data.media_id_string)

    res();

  })

  }).then(() => {

  return new Promise((res,rej) => {

    T.post("media/upload",{media_data: b64content}, function (err, data, response) {

      mediaArray.push(data.media_id_string)

      console.log(mediaArray)

      console.log(data.media_id_string)

  res();

  })

}).then(result => {console.log(result).catch( err => console.log(err)) 

  var mediaIdStr = mediaArray
  var altText = "Ram Me Harder"
  var meta_params = { media_ids: mediaIdStr , alt_text: { text: altText } }

        return new Promise((res,rej) => {

T.post('media/metadata/create', meta_params, function (err, data, response) {

  console.log(data)

   if (!err) {

     var params = { status: `@${eventMsg.user.screen_name} Get Rammed` , media_ids: mediaIdStr , in_reply_to_status_id: eventMsg.id_str }

T.post( 'statuses/update', params , function( err, data, response) {

          if (err){

          console.log( 'error:', err );

          }

       else{

           console.log( 'posted an image!' );

           res(response);

         }
        }
      );
    };
  })
          }).then(result => console.log(result)).catch(err => console.log(err));
        })
      })
    })
  })
}