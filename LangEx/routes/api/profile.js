const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

const validateProfileInput = require('../../validation/profile')

// Load Profile model
const Profile = require('../../models/Profile');
//Load User model
const User = require('../../models/User');

//Get current user profile -Private

router.get('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  const errors = {}

  Profile.findOne({ user: req.user.id})
    .populate('user', ['name', 'country', 'imageUrl', 'language'])
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch( err => {
      res.status(404).json(err)
    })
})

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
  .populate('user', ['name', 'country', 'imageUrl', 'language'])
  .then(profiles => {
    if(!profiles){
      errors.noprofile = 'No Profile';
      res.status(404).json(errors);
    }
    res.json(profiles)
  }) 
  .catch(err => res.status(404).json({profile: 'No profile'})) 
})

//get user profile - public

router.get('/user/:user_id', (req, res)=>{
  const errors = {};
  
  Profile.findOne({ user:req.params.user_id })
  .populate('user', ['name', 'country', 'imageUrl', 'language'])  
  .then( profile =>{
      if(!profile){
        errors.noprofile = 'No Profile';
        res.status(404).json(errors);
      }
      res.json(profile)
  })
  .catch(err => res.status(404).json({profile: 'No profile'}))
})


//Post - Create or edit User Profile

router.post('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }
  
  //Retrieve profile fields
  const profileFields = {};
  profileFields.user = req.user.id
  if(req.body.intro) profileFields.intro = req.body.intro
  if(req.body.occupation) profileFields.occupation = req.body.occupation
  if(req.body.interests) profileFields.interests = req.body.interests
  if(req.body.age) profileFields.age = req.body.age

  Profile.findOne({ user: req.user.id})
  .then(profile => { 
    if(profile){
      //update
      Profile.findOneAndUpdate(
        { user: req.user.id }, 
        { $set: profileFields }, 
        { new: true })
        .then(profile => res.json(profile))
    }else{  
      new Profile(profileFields).save().then(profile => res.json(profile))
    }
  })
})

module.exports = router;