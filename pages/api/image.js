// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const filter = require("lodash").filter;

export default async (req, res) => {
  let cameras;
  let failed = true;

  while (failed == true) {
    console.log("this ran");
    failed = false
    cameras = await fetch(
      `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${req.query.time.substring(
        0,
        19
      )}`
    )
      .then((r) => r.json())
      .catch(function () {
        console.log("error");
        failed = true
      });
  }

  cameras = cameras.items[0].cameras;
  let targetCamera = filter(
    cameras,
    (camera) => camera["camera_id"] === "2701"
  );
  res.redirect(targetCamera[0].image);
};
