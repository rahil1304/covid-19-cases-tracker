import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  console.log("INSIDE ADD EXP");
  const [formData, setFormData] = useState({
    symptomatic: false,
    symptoms: "",
    comments: "",
    from: "",
    to: "",
    current: false,
    admitted: false,
    medicines: [],
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    symptomatic,
    symptoms,
    comments,
    from,
    to,
    current,
    admitted,
    medicines,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class='large text-primary'>Add your Covid-19 Experience</h1>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div class='form-group'>
          <h5>Symptomatic or Not?</h5>
          <input
            type='text'
            placeholder='* symptomatic'
            name='symptomatic'
            value={symptomatic}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* symptoms'
            name='symptoms'
            value={symptoms}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <h5>From Date</h5>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='checkbox'
            name='current'
            checked={current}
            value={current}
            onChange={(e) => {
              setFormData({ ...formData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
          />{" "}
          Yet have Covid
        </div>
        <div class='form-group'>
          <h5>To Date</h5>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='admitted'
              checked={admitted}
              value={admitted}
              onChange={(e) => onChange(e)}
            />{" "}
            Admitted to hospital or not?
          </p>
        </div>
        <div class='form-group'>
          <textarea
            name='comments'
            cols='30'
            rows='5'
            placeholder='comments'
            value={comments}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <a class='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
