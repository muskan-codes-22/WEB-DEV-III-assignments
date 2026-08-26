const crypto = require("crypto");
for (let i=1;i<=5;i++){
    const dice = crypto.randomInt(1,7);
    console.log(`Dice Roll ${i}: ${dice}`)
}

