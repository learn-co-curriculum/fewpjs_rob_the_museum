# Rob the Museum

## Learning Goals

- Read information file data using `fs.readFileSync`
- Process CSV data
- Use classes to represent data retrieved from file
- Follow tests to establish criminal conspiracy

## Introduction

In this lab, you are a notorious art thief. Your goal is to "case" the museum
and establish critical information about the crime that you are about to
commit.

![The Great Muppet Caper](https://media.giphy.com/media/4wmnIO4AB9OI8/giphy.gif)

> **IMPORTANT NOTE**: Obviously, we do not support robbing museums and want to
> discourage you from a life of international art theft. The practical
> consequences and risks associated with such are covered by Donna Tartt in her
> book _The Goldfinch_.

### Read Information File Data Using `fs.readFileSync`

JavaScript likes to work asynchronously. We saw this earlier in sending server
calls with AJAX. In JavaScript, things don't always happen in the top-down
reading order of the code. They happen in a mysterious "later," when the
asynchronous action says "Hey, I'm done!" At a technical level, we usually say
"When the asynchronous code _resolves_." While it's a bit strange when starting
to learn programming in JavaScript in the browser, with enough labs and
lessons, most students come to accept and "get it."

But when JavaScript came to the CLI environment in NodeJS, that desire for
asynchronous methods remained. And, as a result, NodeJS wants to use an
asynchronous design...***for reading files***. This is great for if your Node
application needs to read in a huge file (maybe a mouse genome?). The
asynchronous model will help your computer stay efficient (great!). There's
definitely a time and place for needing to use the asynchronous methods for
reading text files in NodeJS.

***However***, for simple text files this is unnecessary complexity and the
designers of NodeJS recognized that. NodeJS has provided us _both_ an
asynchronous and synchronous version of reading a file. For this lesson, we're
going to use the blocking, synchronous version: [`readFileSync`][rfs].

> **CRITICAL THINKING**: Some people consider asynchronous file reading is one
> of the best reasons to _not_ learn JavaScript as your first programming
> language: when your first language _requires_ you to learn about challenging
> concepts such as asynchrony _before_ you can read a file, maybe you're not
> using the most beginner-friendly language.

We can read in a file synchronously like so:

```js
fs.readFileSync(file-name, "utf-8")
```

This code will read in the contents of _file-name_ and return a _loooong_
`String` of the `file-name`'s contents. The second argument, `'utf-8'`, tells
NodeJS to convert the raw bits of data in the file into text format. If you do
not add this argument, you'll get an `Array` of raw bytes versus a `String`.

Try using `fs.readFileSync` to read in a text file and assign it to a variable.
Log that variable out to verify that you can read and print text files. What
happens if you try the same step without the `"utf-8"` argument?

### Rob the Museum

To start gathering information about your upcoming art heist, you will need to
process the data from the `art_heist.csv` spreadsheet. 

The basic strategy is:

1. Read in the _looong_ `String` from the file
2. Use JavaScript methods to split the file's content into lines
3. Process each line to create instances of classes to help you manage complex
   relationships

Each row in the text file has the format:

```text
catalogNumber,gallery name,work name, artist name, value
```

Each line suggests the creation of a `Work` with a `value`, a `Gallery`, an
`Artist`. However, new instances should not be recreated if they already exist.
If we've seen the "Blue" gallery once, we shouldn't create another "Blue"
gallery, we should use the existing one.

Look at the CSV file and formulate a strategy for your program. We'll get you
started in the next section.

### The `Museum` Class

The `Museum` instance should keep track of the collections of works,
galleries, and artists. When it is initialized, it should be given a `name`
(name of the museum!) and a path to a CSV file to read in.

```js
the_met = new Museum("The Metropolitan Museum of Art of New York City", "art_heist.csv")
```

The CSV file will then need to be prepared as you see fit. In the end, however,
the `Museum` class must answer these questions:

- Which gallery has the most paintings (example: `the_met.biggestGallery()`)?
- Which gallery has the fewest (example: `the_met.smallestGallery()`)?
- Which artist has the most paintings in the museum (example: `the_met.artistMostOccurring()`)?
- What is the total value of all the paintings of any given artist in the museum (example: `the_met.valueOfArtist(artistName)`)?
- If we could steal all the paintings in one gallery to sell for money, which
  would immorally enrich us the most (example: `the_met.biggestPayday()`)?

## Conclusion

Now you are all ready to rob the museum!

[rfs]: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
