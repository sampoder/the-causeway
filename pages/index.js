import Head from "next/head";
import { Grid, Box, Image, Button, Card, Select } from "theme-ui";
import Slider from "rc-slider";
import { useState } from "react";
var dateFormat = require("dateformat");

var getDaysArray = function (s, e) {
  for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export default function Home() {
  var daylist = getDaysArray(new Date("2020-03-18"), new Date());
  daylist.map((v) => v.toISOString().slice(0, 10)).join("");
  let marks = {};
  daylist.map((v, index) => (marks[(index / (daylist.length - 1)) * 100] = v));
  marks[0] = {
    label: (
      <strong style={{ marginLeft: "18px" }}>
        {new Date("2020-03-18").toLocaleString().substring(0, 5)}
      </strong>
    ),
  };
  marks[100] = {
    label: (
      <strong style={{ marginRight: "18px" }}>
        {new Date().toLocaleString().substring(0, 5)}
      </strong>
    ),
  };

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(100);

  const [selectedHour, setSelectedHour] = useState("22:00");

  function handleSelectHourChange(event) {
    setSelectedHour(event.target.value);
  }

  let formattedDate = (date != 100 && date != 0
    ? marks[date]
    : date != 0
    ? new Date(
        new Date().toLocaleDateString("en-US", {
          timeZone: "Asia/Singapore",
        })
      ).addHours(8)
    : new Date(
        new Date("2020-03-18T00:00:00.000Z").toLocaleDateString("en-US", {
          timeZone: "Asia/Singapore",
        })
      ).addHours(8)
  )
    .toISOString()
    .replace(
      "T00:00",
      `T${selectedHour[4] ? selectedHour : `0${selectedHour}`}`
    );

  let formattedPastDate = formattedDate
    .replace("2020", "2019")
    .replace(
      "2021",
      parseFloat(formattedDate.substring(5, 10).replace("-", ".")) > 3.17
        ? "2019"
        : "2020"
    );

  console.log(formattedPastDate);

  return (
    <>
      <Grid
        gap={0}
        columns={[2, "2fr 2fr"]}
        sx={{ position: "absolute", width: "100vw", height: "100vh" }}
      >
        <Image
          bg="primary"
          sx={{
            height: "100vh",
            width: "100%",
            objectFit: "cover",
            objectPosition: "90% 100%",
          }}
          src={`/api/image?time=${formattedPastDate}`}
        />
        <Image
          bg="primary"
          sx={{
            height: "100vh",
            width: "100%",
            objectFit: "cover",
            objectPosition: "90% 100%",
          }}
          src={`/api/image?time=${formattedDate}`}
        />
      </Grid>
      <Grid
        gap={0}
        columns={[2, "2fr 2fr"]}
        sx={{
          width: "100vw",
          height: "20vh",
          paddingTop: "8px",
          zIndex: "999",
        }}
      >
        <Box sx={{ zIndex: "999", textAlign: "center" }}>
          <Button
            as="div"
            disabled
            sx={{
              color: "white",
              ":hover,:focus": {
                color: "white",
                bg: "background",
                borderColor: "gray.2",
              },
            }}
          >
            {dateFormat(formattedPastDate.substring(0, 10), "longDate")}
          </Button>
        </Box>
        <Box sx={{ zIndex: "999", textAlign: "center" }}>
          <Button
            as="div"
            disabled
            sx={{
              color: "white",
              ":hover,:focus": {
                color: "white",
                bg: "background",
                borderColor: "gray.2",
              },
            }}
          >
            {dateFormat(formattedDate.substring(0, 10), "longDate")}
          </Button>
        </Box>
      </Grid>
      <Grid
        gap={0}
        columns={[1, "4fr 0fr"]}
        sx={{
          width: "100vw",
          height: "80vh",
          paddingTop: open
            ? ["calc(50vh - 122px)", "calc(50vh - 72px)", "calc(50vh - 72px)"]
            : ["calc(80vh - 122px)", "calc(80vh - 72px)", "calc(80vh - 72px)"],
          userSelect: "none",
          px: ["0vw", "15vw", "22vw"],
          zIndex: "999",
        }}
      >
        <Card
          as="div"
          disabled
          sx={{
            color: "white",
            ":hover,:focus": {
              color: "white",
              bg: "background",
              borderColor: "gray.2",
            },
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomWidth: "0px",
            zIndex: "999",
            px: "32px",
          }}
        >
          <Box
            sx={{
              display: open ? "block" : "none",
              height: ["30vh", "30vh", "30vh"],
              userSelect: "text",
            }}
          >
            Hello!!! {formattedDate}
          </Box>
          <Grid
            gap={4}
            columns={[
              [3, "2fr 1fr 1fr"],
              [3, "4fr 1fr 0.1fr"],
              [3, "4fr 1fr 0.1fr"],
            ]}
            sx={{
              zIndex: "999",
            }}
          >
            <Slider
              marks={marks}
              step={null}
              included={false}
              defaultValue={100}
              onChange={(e) => {
                setDate(e);
              }}
            />
            <Select
              defaultValue="22:00"
              value={selectedHour}
              onChange={handleSelectHourChange}
              sx={{
                width: ["70%!important", "100%!important", "100%!important"],
                transform: "translateY(-10px) ",
                textAlign: 'center'
              }}
            >
              {Array.from({ length: 24 }, (_, i) => i).map((sweetItem) => {
                return <option key={sweetItem}>{sweetItem}:00</option>;
              })}
            </Select>
            <Box
              onClick={() => (open ? setOpen(false) : setOpen(true))}
              sx={{
                textAlign: "right",
                fontSize: "5em",
                transform:[
                      "translateY(-125px)",
                      "translateY(-55px) translateX(-10px)",
                      "translateY(-55px) translateX(-10px)",
                    ],
                cursor: "pointer",
                ":hover,:focus": { color: "success" },
              }}
            >
              {open ?"▾":"▴"}
            </Box>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
