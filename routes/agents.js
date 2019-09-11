const router = require('express').Router();
let Agent = require('../models/agent.model');

router.route('/').get((req,res) => {
  const featured = req.query.featured;
  if(featured){
    Agent.find({featured:true})
      .then(agents => res.json(agents))
      .catch(err => res.status(400).json('Error: ' + err));
  }else{
    Agent.find()
      .then(agents => res.json(agents))
      .catch(err => res.status(400).json('Error: ' + err));
  }

});

router.route('/:agentId').get((req,res) => {
  const id = req.params.agentId
  Agent.findById(id)
    .then(agent => res.json(agent))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=> {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const qualifications = req.body.qualifications;
  const email = req.body.email;
  const phone = req.body.phone;
  const fax = req.body.fax;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const image = req.body.image;
  const zipcode = req.body.zipcode;
  const featured = req.body.featured;

  const newAgent = new Agent({
    firstName,
    lastName,
    qualifications,
    email,
    phone,
    fax,
    street,
    city,
    state,
    image,
    zipcode,
    featured
  })

  newAgent.save()
    .then(()=> res.json('agent added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
