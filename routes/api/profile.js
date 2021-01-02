const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update a user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check(
        "symptomatic",
        "Status of covid is required (whether symptomatic or asymptomatic)"
      )
        .not()
        .isEmpty(),
      check("symptoms", "Symptoms is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      dob,
      country,
      city,
      symptomatic,
      symptoms,
      current,
      admitted,
      medicines,
      twitter,
      facebook,
      linkedIn,
      instagram,
      email,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (dob) profileFields.dob = dob;
    if (country) profileFields.country = country;
    if (city) profileFields.city = city;
    if (symptomatic) profileFields.symptomatic = symptomatic;
    if (current) profileFields.current = current;
    if (admitted) profileFields.admitted = admitted;
    if (symptoms) {
      profileFields.symptoms = symptoms
        .split(",")
        .map((symptom) => symptom.trim());
    }
    if (medicines) {
      profileFields.medicines = medicines
        .split(",")
        .map((medicine) => medicine.trim());
    }

    // Build social object
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedIn) profileFields.social.linkedIn = linkedIn;
    if (instagram) profileFields.social.instagram = instagram;
    if (email) profileFields.social.email = email;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
