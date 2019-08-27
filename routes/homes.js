const router = require('express').Router();
let Home = require('../models/home.model');

router.route('/').get((req,res) => {
  console.log('retrieving users')
  Home.find()
    .then(homes => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=> {
  const hometype = req.body.hometype;
  const bedrooms = Number(req.body.bedrooms);
  const bathrooms = Number(req.body.bathrooms);

  const newHome = new Home({
    hometype,
    bedrooms,
    bathrooms
  })

  newHome.save()
    .then(()=> res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;