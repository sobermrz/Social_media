const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const {check, validationResult} = require("express-validator/check")

const Profile = require("../../models/Profile")
const User = require("../../models/User")

// @route   GET api/profile/me
// @desc    get current users profile
// @access  Public
router.get("/me",auth , async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

    if(!profile){
      return res.status(400).json({msg: "there is no profile for this user"})
    }

    res.json(profile)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error")
  }
})

// @route   POST api/profile/me
// @desc    create or update user profile
// @access  private
router.post("/", [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {
    company, 
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkendin
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername; 
  if(skills){
    profileFields.skills = skills.split(',').map(skill => skill.trim())
  }

  //Build social object
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkendin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({user: req.user.id})

    //if find it, then update
    if(profile){
      profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      )
      return res.json(profile)
    }

    //if not find it, then create a new one
    profile = new Profile(profileFields)

    await profile.save()

    res.json(profile)

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }

})

module.exports = router
