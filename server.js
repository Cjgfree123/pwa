// let fs = require('fs');
// let json = [];
// for(let i = 0; i < 40; i++) {   
//     let Random = require("mockjs").Random;
//     json.push(Random.image());
// }
// fs.writeFileSync('data.json', JSON.stringify(json))


let express = require('express');
let app = express();

app.use(express.static(__dirname));

let json = require("./data.json");
app.get("/api/img", (req, res) => {
    let start = Math.round(Math.random() * (json.length - 20));
    res.json(json.slice(start, start + 20));
})
app.listen(3000);
