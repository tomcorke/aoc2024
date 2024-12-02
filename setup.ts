import fs from "fs";
import open from "open";

(await import("dotenv-safe")).config();

const year = process.env.YEAR;
const sessionCookie = process.env.SESSION_COOKIE;

const inputUrl = (day: number) =>
  `https://adventofcode.com/${year}/day/${day}/input`;
const dayUrl = (day: number) => `https://adventofcode.com/${year}/day/${day}`;

const day = Number(process.argv[2]);
if (isNaN(day)) {
  console.error("Please specify a day");
  process.exit(1);
}

console.log(`Running setup for day ${day}...`);

const dayPath = `./src/${day.toString().padStart(2, "0")}`;

if (fs.existsSync(dayPath)) {
  console.log(`Day ${day} already exists.`);
  process.exit(0);
}

console.log("Making directory...");
fs.mkdirSync(dayPath);

console.log("Copying files...");
const js = fs.readFileSync("./src/template/index.ts", "utf8");
fs.writeFileSync(
  `${dayPath}/index.ts`,
  js.replace("{DAY}", day.toString().padStart(2, "0"))
);
fs.copyFileSync("./src/template/testInput", `${dayPath}/testInput`);

console.log("Fetching input...");
(async () => {
  const res = await fetch(inputUrl(day), {
    headers: {
      Cookie: `session=${sessionCookie}`,
    },
  });
  const text = await res.text();
  fs.writeFileSync(`${dayPath}/input`, text);

  console.log(`Opening ${dayUrl(day)}`);
  open(dayUrl(day));

  console.log("Done!");
})();
