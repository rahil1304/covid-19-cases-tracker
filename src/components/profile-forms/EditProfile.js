import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    comments: "",
    symptoms: "",
    symptomatic: false,
    twitter: "",
    facebook: "",
    linkedIn: "",
    instagram: "",
    youtube: "",
    email: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      country: loading || !profile.country ? "" : profile.country,
      city: loading || !profile.city ? "" : profile.city,
      comments: loading || !profile.comments ? "" : profile.comments,
      symptoms: loading || !profile.symptoms ? "" : profile.symptoms.join(","),
      symptomatic: loading || !profile.symptoms ? false : profile.symptomatic,
      twitter: loading || !profile.twitter ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedIn: loading || !profile.social ? "" : profile.social.linkedIn,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      email: loading || !profile.social ? "" : profile.social.email,
    });
  }, [loading]);

  const {
    country,
    city,
    comments,
    symptoms,
    symptomatic,
    twitter,
    facebook,
    linkedIn,
    instagram,
    youtube,
    email,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        {/* <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div> */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Country'
            name='country'
            value={country}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own country or one where you contracted COVID-19
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={city}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own city or one where you contracted COVID-19
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Comments'
            name='comments'
            value={comments}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Any comments?</small>
        </div>
        <div className='form-group'>
          <p>Please select symptomatic or asymptomatic:</p>
          <input
            type='radio'
            name='symptomatic'
            value={symptomatic}
            onChange={(e) => onChange(e)}
          ></input>
          <label for='symptomatic'>symptomatic</label>
          <br></br>
          <input
            type='radio'
            name='symptomatic'
            value={symptomatic}
            onChange={(e) => onChange(e)}
          ></input>
          <label for='asymptomatic'>asymptomatic</label>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Symptoms'
            name='symptoms'
            value={symptoms}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Cough,Fever,Loss of
            smell,breathlessness)
          </small>
        </div>
        <div className='form-group'>
          <textarea placeholder='A short bio of yourself' name='bio'></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedIn}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
