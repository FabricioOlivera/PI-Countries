const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Activities, Country } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      flag: e.flags[1],
      continent: e.region,
      capital: e.capital ? e.capital[0] : "Not found",
      subregion: e.subregion ? e.subregion : "Not found",
      area: e.area ? e.area : 8,
      population: e.population ? e.population : 10,
    };
  });
  const create = await apiInfo.forEach((e) => {
    if (e) {
      Country.findOrCreate({
        where: {
          id: e.id,
          name: e.name,
          flag: e.flag,
          continent: e.continent,
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        },
      });
    }
  });
  return apiInfo;
};

const getInfoDB = async () => {
  return await Country.findAll({
    include: {
      model: Activities,
      atributes: ["name", "difficult", "duration", "season"],
      through: {
        atributes: [],
      },
    },
  });
};

//- Routes---------------------------------------------------------------------//

router.get("/countries", async (req, res) => {
  const name = req.query.name;
  const countries = await getInfoDB();
  if (name) {
    let country = await countries.filter(
      (c) => c.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    country.length
      ? res.status(200).json(country)
      : res.status(404).json("Country not found");
  } else {
    res.status(200).json(countries);
  }
});
router.get("/countries/:id", async (req, res) => {
  const id = req.params.id;
  const countries = await getInfoDB();
  if (id) {
    let country = await countries.filter(
      (c) => c.id.toLocaleLowerCase() === id.toLocaleLowerCase()
    );
    country.length
      ? res.status(200).json(country)
      : res.status(404).json("Country not found by id");
  }
});

router.post("/activities", async (req, res) => {
  const { name, difficult, duration, season, countries } = req.body;
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa",name, difficult, duration, season, countries)

  try {
    const newActivity = await Activities.create({
      name,
      duration,
      difficult,
      season,
    });

    countries.forEach(async (c) => {
      const countrySearch = await Country.findOne({
        where: {
          name: c,
        },
      });
      await newActivity.addCountry(countrySearch);
    });

    res.status(200).json("Activity create successfully");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = {
  router,
  getApiInfo,
};
