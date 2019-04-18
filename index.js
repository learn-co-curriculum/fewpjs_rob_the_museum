/* fs provides readfilSync which you need to read the file */
const fs = require('fs')
/* Your code after the following line */
/* ================================================================================  */

class Gallery {
  constructor(name) {
    this.name = name
    this.works = []
  }

  associateWork(w) {
    w.gallery = this;
    this.works.push(w)
  }

  get numberOfWorks() {
    return this.works.length
  }

  get aggregateValue() {
    return this.works.reduce((memo, w) => w.workValue + memo, 0)
  }
}

class Artist {
  constructor(name) {
    this.name = name
    this.works = []
  }

  associateWork(w) {
    w.artist = this;
    this.works.push(w)
  }

  workCount() {
    return this.works.length
  }

  valueOfWorks() {
    return this.works.reduce( (memo, work) => memo + work.workValue, 0)
  }
}

class Work {
  constructor(id, workName, workValue){
    this.id = parseInt(id, 10)
    this.workName = workName
    this.workValue = parseInt(workValue, 10)
  }
}

class Museum {
  constructor(name, path, lookupKeys = { artistName: 3, galleryName: 1 }) {
    // Store arguments
    this.name = name
    this.path = path
    this.lookupKeys = lookupKeys

    // Storage for items in the data file
    this._artists = []
    this._galleries = []
    this._works = []

    // Read the file
    const fs = require('fs')
    this.raw_file = fs.readFileSync(this.path, 'utf-8')
    this.lines = this.raw_file.split("\n")

    // Cache the "table" implied by the CSV, throw away `undefined` values
    this.dataTable = this.lines.map( line => line.split(',') )

    this.dataTable.forEach( row => {
      // Create the instance in the collection
      const [id, galleryName, workName, artistName, workValue] = row
      const w = new Work(id, workName, workValue)

      this._works.push(w)

      // And associate it with the *other* instances collected in this class
      // This is basically a mini database.
      if (!!galleryName) this.galleryByName(galleryName).associateWork(w)
      if (!!artistName)  this.artistByName(artistName).associateWork(w)
    })
  }

  artistNames() {
    // Use an object to tell us which column a "type" is in. This allows
    // flexibility in case the CSV output changes.
    return this.dataTable.map( row => row[this.lookupKeys['artistName']] )
  }

  galleryNames() {
    // Ensure names are truthy and not duplicated
    const filterFn = (name, pos) => !!name && galleryNames.indexOf(name) == pos
    const galleryNames = this.dataTable.map( row => row[this.lookupKeys['galleryName']] )
    const uniqAndNonEmptyNames = galleryNames.filter(filterFn)
    return uniqAndNonEmptyNames
  }

  get artists() {
    // If we haven't created artists from the CSV, do so, else return the
    // cached value, this._artists
    const reducer = (memo, name) => {
      memo.push(( new Artist(name) ))
      return memo
    }
    if (this._artists.length == 0) {
      this.artistNames().reduce(reducer, this._artists)
    }
    return this._artists;
  }

  get galleries() {
    // If we haven't created galleries from the CSV, do so, else return the
    // cached value, this._galleries
    const reducer = (memo, name) => {
      memo.push(( new Gallery(name) ))
      return memo
    }
    if (this._galleries.length == 0) {
      this.galleryNames().reduce(reducer, this._galleries)
    }
    return this._galleries;
  }

  galleryByName(name) {
    return this.galleries.find( g => g.name === name )
  }

  artistByName(name) {
    return this.artists.find( a => a.name === name )
  }

  get sortedGalleries() {
    return this._galleries.sort((a,b) => a.numberOfWorks - b.numberOfWorks );
  }

  biggestGallery() {
    return this.sortedGalleries[this.sortedGalleries.length - 1]
  }

  smallestGallery() {
    return this.sortedGalleries[0]
  }

  artistMostOccurring() {
    return this._artists.sort((a,b) => b.workCount() - a.workCount())[0]
  }

  valueOfArtist(name) {
    return this.artistByName(name).valueOfWorks()
  }

  biggestPayday() {
    const valuedGalleries = this.galleries.sort((a, b) => b.aggregateValue - a.aggregateValue )
    const bestGallery = valuedGalleries[0]
    return bestGallery
  }
}

const met = new Museum("The Metropolitan Museum of Art", "art_heist.csv")

/* ================================================================================  */
/* Don't edit past here */
/* You will need to define Artist, Museum, Work, Gallery above the line */

module.exports = { Artist, Museum, Work, Gallery }
