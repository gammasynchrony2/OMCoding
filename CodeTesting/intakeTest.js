var readline = require('readline');
var greatestDesire;

var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What information do you want to get out of this code? ", function(answer) 
{
    console.log(answer);
    if(answer)
    {
        greatestDesire = answer;
        rl.close();
    }
});

rl.on('close', function()
{
    console.log(greatestDesire);
    process.exit();
});

//console.log(greatestDesire);