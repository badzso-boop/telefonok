const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const toTxt = require("array-to-txt-file");
const { gzip } = require("zlib");
const mysql = require('mysql');
const arrayToTxtFile = require("array-to-txt-file");
const { Console } = require("console");
let arak = [];
let cimek = [];
var values = [];

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "telefonok_araik"
});


const movies = ["https://www.arukereso.hu/mobiltelefon-c3277/",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=25",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=50",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=75",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=100",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=125",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=150",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=175",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=200",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=225",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=250",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=275",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=300",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=325",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=350",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=375",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=400",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=425",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=450",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=475",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=500",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=525",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=550",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=575",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=600",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=625",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=650",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=675",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=700",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=725",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=750",
        "https://www.arukereso.hu/mobiltelefon-c3277/?start=775"
];


(async () => {
    let seged = "";
    let seged2 = "";
    
    var arr2d = new Array(32).fill(new Array(2));
    
    for(let movie of movies) {
        const response = await request({
            uri: movie,
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "hu-HU,hu;q=0.9,en-US;q=0.8,en;q=0.7"
            },
            gzip: true,
        });
    
        let $ = cheerio.load(response);
        let price = $('div[class="col-lg-3 col-md-3 col-sm-3 top-right hidden-xs"] > a[class="price"]').text().trim("-");
        seged = price.replace(/-/g, '');
        seged = seged.replace(/l/g, '');
        seged = seged.replace(/ó/g, '');
        seged = seged.replace(/t/g, '');
        arak += seged.split('F');
        let nev = $('div[class="name ulined-link"] > h2').text();
        seged2 = nev.replace(/\n/g, ',');
        cimek += seged2.split(','); 
    }

    arak = arak.split(',');
    cimek = cimek.split(',');

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO telefonok (telefonNev, telefonAr) VALUES ?";
        let j = 1;
        for(let i = 0; i < arak.length; i++)
        {
            values[i] = [`${cimek[j]}`, `${arak[i]}`]
            j+=2;
        }
        con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
      });

    //console.log(arak);
    //console.log(cimek);

    //arrayToTxtFile([values], "./test.txt");
}

)();