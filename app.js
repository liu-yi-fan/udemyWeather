import fetch from "node-fetch";
import express from "express";
import ejs from "ejs";
import https from "https";

const app = express();

// api key
const myKey = "a504a236d1477d4ef4e41bbc77279427";

// k to cel
function ktoC(k) {
  return (k - 273.15).toFixed(2);
}

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs" );

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  let d = await fetch(url);
  let djs = await d.json();
  let { temp } = djs.main;
  let newTemp = ktoC(temp);
  res.render("weather.ejs", { djs, newTemp });
});

app.listen(3050, () => {
  console.log("Sever is running on port 3050.");
});
