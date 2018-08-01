const randomWord = require("random-word");
const uniqueRandomArray = require("unique-random-array");
const moment = require("moment");
const { ulid } = require("ulid");

const today = moment();
const status = ["NEW", "PROCESS", "DONE"];

const generateSentence = n =>
  Array.from(new Array(n), (item, i) => `${randomWord()} `)
    .join("")
    .replace(/\s*$/, "");

const generateData = n => {
  return Array.from(new Array(n), (item, i) => ({
    id: ulid(),
    rank: i,
    perihal: generateSentence(3),
    dari: generateSentence(2),
    tanggalTerima: moment(today)
      .add(i, "days")
      .format("x"),
    status: uniqueRandomArray(status)(),
    noAgenda: ulid(),
    noSurat: ulid(),
    sifat: uniqueRandomArray(status)(),
    tanggalSurat: moment(today)
      .add(i, "days")
      .format("x"),
    keterangan: generateSentence(100),
    linkLihatSurat:
      "https://abc.xyz/investor/pdf/2018_Q1_Earnings_Transcript.pdf"
  }));
};

exports.generateData = generateData;
