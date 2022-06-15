const { gql } = require("apollo-server-express");
const Author = require("./models/Author.model");
const Book = require("./models/Book.model");

const books = async bookIds => {
    try {
      const books = await Book.find({_id: { $in: bookIds }})
      return books.map(book => ({
        ...book._doc,
        author: author.bind(this, book._doc.author)
      }))
    } catch {
      throw err
    }
  }
  
  const author = async authorId => {
    try {
      const author = await Author.findById(authorId)
      return {
        ...author._doc,
        books: books.bind(this, author._doc.books)
      }
    } catch (err) {
      throw err
    }
  }
  
  const resolvers = {
    Query: {
      authors: async () => {
        try {
          const authors = await Author.find()
          return authors.map(author => ({
            ...author._doc,
            books: books.bind(this, author._doc.books)
          }))
        } catch (err) {
          throw err
        }
      },
      books: async () => {
        try {
          const books = await Book.find()
          return books.map(book => ({
            ...book._doc,
            author: author.bind(this, book._doc.author)
          }))
        } catch (err) {
          throw err
        }
      }
    },
    Mutation: {
      createAuthor: async (_, { name }) => {
        try {
          const author = new Author({ name })
          await author.save()
          return author;
        } catch (err) {
          throw err
        }
      },
      createBook: async (_, { name, pages, author: authorId }) => {
        const book = new Book({ name, pages, author: authorId })
        try {
          const savedBook = await book.save()
          const authorRecord = await Author.findById(authorId)
          authorRecord.books.push(book)
          await authorRecord.save()
          return {
            ...savedBook._doc,
            author: author.bind(this, authorId)
          }
        } catch (err) {
          throw err
        }
      }
    }
  }

module.exports = resolvers;
