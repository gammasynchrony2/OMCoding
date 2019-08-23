const fs = require('fs');
const wStream = fs.createWriteStream("./file.txt")
const rStream = fs.createReadStream("./file.txt")

const fileTest = "./file.txt";
const readIt = () => {
    rStream.on("readable", () => {
        console.log(rStream.read().toString());
    });
    rStream.on("end", () => {
        console.log("finished reading file");
    });
};

wStream.on('open', fd => {
    wStream.write("first line\n");
    wStream.write("second line\n");
    wStream.write('third line\n');
    wStream.write('fourth line\n');

    wStream.end();
})

wStream.on("close", readIt);

console.log("writing data\n")

fs.watch(fileTest, (eventType, file) =>
    console.log(`This is the watch report ${eventType} to ${file}`),
)


