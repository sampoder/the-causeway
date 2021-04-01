var fs = require("fs");
var fetch = require("node-fetch");
const filter = require("lodash").filter;
const imageToBase64 = require("image-to-base64");

var getDaysArray = function (s, e) {
  for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

var daylist = getDaysArray(new Date("2019-03-18"), new Date());

var hours = Array.from({ length: 24 }, (_, i) => i);

let final = {};

daylist.map((v) => v.toISOString().slice(0, 10)).join("");

daylist.slice(0,1).map((v) => {
  hours.map((selectedHour) => {
    try {
    async function fetchData() {
      try {
      let cameras = (
        await fetch(
          `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${v
            .toISOString()
            .replace(
              "T00",
              `T${String(selectedHour)[1] ? selectedHour : `0${selectedHour}`}`
            )
            .substring(0, 19)}`
        ).then((r) => r.json())
      ).items[0].cameras;
      let targetCamera = filter(
        cameras,
        (camera) => camera["camera_id"] === "2701"
      );
      imageToBase64(targetCamera[0].image) // Image URL
        .then((response) => {
          let key = v
            .toISOString()
            .replace(
              "T00",
              `T${selectedHour[2] ? selectedHour : `0${selectedHour}`}`
            );
          final[key] = response;
          fs.writeFile("finals.json", JSON.stringify(final), function (err) {
            if (err) throw err;
            console.log("Replaced!");
          });
          // console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
        })
        .catch((error) => {
          console.log(error); // Logs an error if there was one
        });
      }
    catch(e){
      console.log(e)
    }
    }
    fetchData();
    }
    catch(e){
      console.log(e)
    }
  });
});
