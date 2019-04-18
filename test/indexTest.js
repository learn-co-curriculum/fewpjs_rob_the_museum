const chai = require('chai');
const museumCode = require("../index.js")

describe("index.js", () => {
  describe("Defines critical classes", () => {

    it("has a Gallery class", () => {
      expect(museumCode.Gallery).to.exist
    })

    it("has a Work class", () => {
      expect(museumCode.Work).to.exist
    })

    it("has a Artist class", () => {
      expect(museumCode.Artist).to.exist
    })

    it("has a Museum class", () => {
      expect(museumCode.Museum).to.exist
    })
  })

  describe("The Museum Class", () => {
    let met = new museumCode.Museum("The Metropolitan Museum of Art", "art_heist.csv")

    it("finds the biggest gallery", () => {
      expect(met.biggestGallery().name).to.eq("Red");
    })

    it("finds the smallest gallery", () => {
      expect(met.smallestGallery().name).to.eq("Blue");
    })

    it("finds the most occurring artist", () => {
      expect(met.artistMostOccurring().name).to.eq("Pablo Picasso");
    })

    it("finds the value of the works by Picasso", () => {
      expect(met.valueOfArtist("Pablo Picasso")).to.eq(755300000);
    })

    it("finds the gallery with the biggest payday", () => {
      expect(met.biggestPayday().name).to.eq("Red");
    })
  })
})
