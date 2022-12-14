const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Alexmpc:${password}@cluster0.esmqnvs.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
    if (process.argv.length === 3) {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name + ' ' + person.number)
        })
      })
    } else {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: Math.floor(Math.random() * 100)
      })
      return person.save()
    }
  })
  .then(() => {
    if (process.argv.length === 3) {
      console.log('phonebook:')
    } else {
      console.log(
        'added ' +
          process.argv[3] +
          ' number ' +
          process.argv[4] +
          ' to phonebook!'
      )
    }
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
