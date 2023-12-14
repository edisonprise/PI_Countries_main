//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js"); // conn representa los modelos de la db
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity  } = require("./src/db");
const respaldo = require("./src/respaldo/allCountries.json");
const { defaults } = require("pg");

const loadCountries = async () => {
  try {
    let resp = {};
    const { v4: uuidv4 } = require('uuid');

// Convierte el string a UUID
    const { data } = await axios.get("https://restcountries.com/v3/all");
    //  const countries = response.data;

    if (!data.length) {
      resp.data = respaldo;
    } else {
      resp.data = data;
    }
    for (let country of resp.data) {
      let { cca3, name, flags, capital, population, area, region, subregion } =
        country;
      let [countryResp, created] = await Country.findOrCreate({
        where: {
          idCountry: cca3 ,
        },
        defaults: {
          name: name.common,
          flag: flags ? flags[1] : null,
          capital: capital ? capital[0] : null,
          population,
          subregion:subregion || "Unknow",
          region:region || "Unknow",
          area: area || "Unknow",
        },
      });

    }

    //        const countriesApi  = resp.data.map(c => {

    //            return {
    //                id: c.cca3,
    //                name: c.name.official,
    //                flag: c.flags[1],
    //                capital:c.capital? c.apital[0]  : 'Not capital',
    //                population:c.population,
    //                area:c.area,

    //             }
    //         })

    //         return countriesApi;
  } catch (error) {
    console.log(error);
  }
};

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  loadCountries()
  server.listen(3001, () => {
    
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
