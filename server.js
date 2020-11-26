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
    
  console.log( 'Randomizing Packs' );

  
  var rarity1 = Math.ceil( Math.random() * 100 )
  if ( rarity > 1) {
    var rarity = 'epic'  
  } else if ( rarity >= 1 && rarity <= 5){    
    var rarity = 'rare'
  } else if ( rarity >= 5 && rarity <= 25) {   
    var rarity = 'uncommon' 
  } else  {   
    var rarity = 'common'
  }

  var rarity2 = Math.ceil( Math.random() * 100 )
  if ( rarity > 1) {
    var rarity2 = 'epic'  
  } else if ( rarity >= 1 && rarity <= 5){    
    var rarity2 = 'rare'
  } else  ( rarity >= 5 )
    var rarity2 ='uncommon'
  
  
    console.log('common')

    filenames1 = fs.readdirSync(path.join(__dirname, "Cards" , "common"))
  
    var outcome1 = Math.ceil( Math.random() * Object.keys(filenames1).length)
  
    var answer1 = filenames1[outcome1]

    console.log(answer1)

    const imagePath1 = path.join(__dirname, "Cards" , "common" , answer1 );

    b64content1 = fs.readFileSync( imagePath1, { encoding: 'base64' } );


    //////////////////////////////
    console.log('common')
  
    filenames2 = fs.readdirSync(path.join(__dirname, "Cards" , "common"))
  
    var outcome2 = Math.ceil( Math.random() * Object.keys(filenames2).length)
  
    var answer2 = filenames2[outcome2]

    console.log(filenames2[outcome2])

    const imagePath2 = path.join(__dirname, "Cards" , "common" , answer2 );

    b64content2 = fs.readFileSync( imagePath2, { encoding: 'base64' } );


    ////////////////////////////////
    console.log(rarity)
  
    filenames3 = fs.readdirSync(path.join(__dirname, "Cards" , rarity1))
  
    var outcome3 = Math.ceil( Math.random() * Object.keys(filenames3).length)
  
    var answer3 = filenames3[outcome3]

    console.log(filenames3[outcome3])

    const imagePath3 = path.join(__dirname, "Cards" , rarity1 , answer3 );

    b64content3 = fs.readFileSync( imagePath3, { encoding: 'base64' } );


    //////////////////////////////////
    console.log(rarity)
  
    filenames4 = fs.readdirSync(path.join(__dirname, "Cards" , rarity2))
  
    var outcome4 = Math.ceil( Math.random() * Object.keys(filenames4).length)
  
    var answer4 = filenames4[outcome4]

    console.log(filenames4[outcome4])

    const imagePath4 = path.join(__dirname, "Cards" , rarity2 , answer4 );

    b64content4 = fs.readFileSync( imagePath4, { encoding: 'base64' } );
  

  const posts = new Promise((res,rej) => {
    T.post("media/upload",{media_data: b64content1}, function (err, data, response) {


      res();

     })

  }).then(() => {

  return new Promise((res,rej) => {

   T.post("media/upload",{media_data: b64content2}, function (err, data, response) {
     
    
    res();
    })

  }).then( (res,rej) => {

  return new Promise((res,rej) => {

   T.post("media/upload",{media_data: b64content3}, function (err, data, response) {

 

    res();

  })

  }).then(() => {

  return new Promise((res,rej) => {

    T.post("media/upload",{media_data: b64content4}, function (err, data, response) {



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