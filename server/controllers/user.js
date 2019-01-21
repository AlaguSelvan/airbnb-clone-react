const User = require('../models/user')

exports.auth = async (req, res) => {

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
      return res.status(422).send({'mongoose': 'server error'})
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
        return  res.status(422).send({'mongoose': 'error'})
      } 
      return res.json({'registered': true})
    })
  })

}