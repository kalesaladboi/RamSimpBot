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

    console.log(eventMsg.user.screen_name)

    if (replyto === 'ram_simp') {
      tweetIt(eventMsg); 
    }
  }

function tweetIt(eventMsg) {
    
  console.log( "Randomizing Packs" );

  var rarity1 = Math.ceil( Math.random() * 100 )
  if ( rarity1 > 1) {
    var rarity1 = "epic"  
  } else if ( rarity1 >= 1 && rarity1 <= 5){    
    var rarity1 = "rare"
  } else if ( rarity1 >= 5 && rarity1 <= 25) {   
    var rarity1 = "uncommon" 
  } else  {   
    var rarity1 = "common"
  }

  var rarity2 = Math.ceil( Math.random() * 100 )
  if ( rarity2 > 1) {
    var rarity2 = "epic"  
  } else if ( rarity2 >= 1 && rarity2 <= 5){    
    var rarity2 = "rare"
  } else  ( rarity2 >= 5 )
    var rarity2 ="uncommon"

    /////////////////////////////////////
    console.log(rarity1 + rarity2)
    console.log("common")
    ////////////////////////////////////////


    filenamescommon = fs.readdirSync(path.join(__dirname, "Cards" , "common")) 
    var outcome1 = Math.ceil( Math.random() * Object.keys(filenamescommon).length)-1
    console.log(outcome1)
    var answer1 = filenamescommon[outcome1]
    console.log(answer1)
    const imagePath1 = path.join(__dirname, "Cards" , "common" , answer1 );
    b64content1 = fs.readFileSync( imagePath1, { encoding: "base64" } );

    //////////////////////////////

    console.log('common')  
    filenames2 = fs.readdirSync(path.join(__dirname, "Cards" , "common")) 
    var outcome2 = Math.ceil( Math.random() * Object.keys(filenames2).length)-1
    var answer2 = filenames2[outcome2]
    console.log(filenames2[outcome2])
    const imagePath2 = path.join(__dirname, "Cards" , "common" , answer2 );
    b64content2 = fs.readFileSync( imagePath2, { encoding: 'base64' } );

    ////////////////////////////////

    console.log(rarity1)  
    filenames3 = fs.readdirSync(path.join(__dirname, "Cards" , rarity1))  
    var outcome3 = Math.ceil( Math.random() * Object.keys(filenames3).length)-1  
    var answer3 = filenames3[outcome3]
    console.log(filenames3[outcome3])
    const imagePath3 = path.join(__dirname, "Cards" , rarity1 , answer3 );
    b64content3 = fs.readFileSync( imagePath3, { encoding: 'base64' } );

    //////////////////////////////////

    console.log(rarity2)  
    filenames4 = fs.readdirSync(path.join(__dirname, "Cards" , rarity2))  
    var outcome4 = Math.ceil( Math.random() * Object.keys(filenames4).length)-1  
    var answer4 = filenames4[outcome4]
    console.log(filenames4[outcome4])
    const imagePath4 = path.join(__dirname, "Cards" , rarity2 , answer4 );
    b64content4 = fs.readFileSync( imagePath4, { encoding: 'base64' } );

    var mediaArray = [];
    var mediaString = mediaArray.join();
    

  const posts = new Promise((res,rej) => {
    T.post("media/upload",{media_data: b64content1}, function (err, data, response) {
        console.log(mediaString)
        console.log(data.media_id_string)
        //console.log(response)
        mediaArray.push(data.media_id_string)

      res();

     })

  }).then(() => {

  return new Promise((res,rej) => {

   T.post("media/upload",{media_data: b64content2}, function (err, data, response) {
      console.log(mediaString)
      console.log(data.media_id_string)
      //console.log(response)
      mediaArray.push(data.media_id_string)

    res();
    })

  }).then( (res,rej) => {

  return new Promise((res,rej) => {

   T.post("media/upload",{media_data: b64content3}, function (err, data, response) {
      console.log(mediaString)
      console.log(data.media_id_string)        
      //console.log(response)
      mediaArray.push(data.media_id_string)

    res();

  })

  }).then(() => {

  return new Promise((res,rej) => {

    T.post("media/upload",{media_data: b64content4}, function (err, data, response) {
      console.log(mediaString)
      console.log(data.media_id_string)
      //console.log(response)
      mediaArray.push(data.media_id_string)

  res();

  })

}).then(result => {console.log(result).catch( err => console.log(err))

  var mediaIdStr = mediaString
  var altText = "Ram Me Harder"
  var meta_params = { media_id: mediaIdStr , alt_text: { text: altText } }

        return new Promise((res,rej) => {

T.post('media/metadata/create', meta_params, function (err, data, response) {

  //console.log(data)

   if (!err) {
     var params = { status: `@${eventMsg.user.screen_name} Get Rammed` , media_id: mediaIdStr , in_reply_to_status_id: eventMsg.id_str }

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