const User = require('../models/user')
const {normalizeErrors} = require('../helpers/mongoose')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/dev')

exports.auth = async (req, res) => {
  const { email, password } = await req.body
  if (!password || !email) {
    return res.status(422).send({ errors: [{ title: 'Data missing', detail: 'Provide email and password' }] })
  }

  User.findOne({email}, function(err, user) {
    if(err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)})
    }
    if(!user){
      return res.status(422).send({ errors: [{tittle: 'Invalid User!', detail: 'User does not exist'}]})
    }
    if (user.hasSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id,
        username: user.username,
      }, SECRET, { expiresIn: '1h' })
      return res.json(token)
    } else {
      return res.status(422).send({ errors: [{ tittle: 'Wrong Data!', detail: 'Wrong email or password' }] })
    }

  })
}

exports.register = async (req, res) => {

  const {username, email, password, passwordConfirmation} = await req.body

  if(!username || !email) {
    return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password'}]})
  }
  if(password !== passwordConfirmation){
    return res.status(422).send({ errors: [{ title: 'Invalid Password', detail: 'Password not same as confirmation'}]})
  }
  User.findOne({email}, function(err, existingUser){
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors)})
    }
    if (existingUser) {
     return res.status(422).send({ errors: [{ title: 'Invalid Email', detail: 'User name already exists' }] })
    }
    const user = new User({
      username,
      email,
      password
    })

    user.save((err)=>{
      if(err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors)})
      } 
      return res.json({'registered': true})
    })
  })
}

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  if(token){
    const user = parseToken(token)
    User.findById(user.userId, (err, user) => {
      if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)})
      }
      if(user){
        res.locals.user = user
        next();
      } else {
        return res.status(422).send({errors: [{tittle: 'Not authorized', detail: 'You need to login to get access'}]})
      }
    })
  } else {
    return notAuthorized(res)
  }
}

const parseToken = (token) =>{
  let splitToken = token.split(' ')[1]
  return jwt.verify(splitToken, SECRET)
}

const notAuthorized = (res) => {
  return res.status(401).send({errors: [{tittle: 'Not authorized', detail: 'You need to login to get access'}]})
}