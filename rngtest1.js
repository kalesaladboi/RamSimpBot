var rarity1 = Math.ceil( Math.random() * 125 )
if ( rarity1 < 25) {
  var folder = "Yuka"  
} else if ( rarity1 > 25 && rarity1 <= 50){    
  var folder = "Ram"
} else if ( rarity1 > 50 && rarity1 <= 75) {   
  var folder = "Maki" 
} else if( rarity1 > 75 && rarity1 <= 100){   
  var folder = "Tam"
} else {
  var folder = "Mina"
}

console.log(folder)