// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const filter = require("lodash").filter;

export default async (req, res) => {
  let cameras = (
    await fetch(
      `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${req.query.time.substring(0, 19)}`
    ).then((r) => r.json())
  ).items[0].cameras;
  console.log(cameras)
  let targetCamera = filter(
    cameras,
    (camera) => camera["camera_id"] === "2701"
  );
  res.redirect(targetCamera[0].image)
}
