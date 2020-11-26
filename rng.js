var rarity = Math.ceil( Math.random() * 100 )
console.log(rarity)

if ( rarity <= 1 ) {
  var rarity = 'epic'  
} else if ( rarity >= 1 && rarity <= 5){    
  var rarity = 'rare'
} else if ( rarity >= 5 && rarity <= 25) {   
  var rarity = 'uncommon' 
} else  {   
  var rarity = 'common'
}

console.log(rarity)