import React, { useState } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import Button from "@material/react-button";
import Spinner from "../../../assets/gfx/spinners/Spinner";
import { useCtrlEnterSubmit } from "../../students/forms/form-hooks";
import {
  isNullOrEmpty,
  isNotNullOrEmpty
} from "../../../components/utils/ramda-extensions";
import "./admin-forms.css";
import {
  translateFields,
  defaultValidation
} from "../../../components/forms/form-validation";

const fields = {
  name: {
    default: "",
    checks: [
      value =>
        isNotNullOrEmpty(value) && /^[a-z0-9][a-z0-9 ,.'\-()]+$/i.test(value)
    ],
    error:
      "Name can not be empty and only contain letters, numbers and certain characters"
  },
  department: {
    default: "",
    checks: [
      value => isNullOrEmpty(value) || /^[a-z0-9 ,.'-()]+$/i.test(value)
    ],
    error: "Department can only contain letters, numbers and certain characters"
  },
  address1: {
    default: "",
    checks: [
      value => isNotNullOrEmpty(value),
      value => /^[a-z0-9 ,.'-]+$/i.test(value)
    ],
    error:
      "First line of address must not be empty and can only contain letters, numbers and certain characters"
  },
  address2: {
    default: "",
    checks: [value => isNullOrEmpty(value) || /^[a-z0-9 ,.'-]+$/i.test(value)],
    error: "Address can only contain letters, numbers and certain characters"
  },
  town: {
    default: "",
    checks: [value => isNullOrEmpty(value) || /^[a-z0-9 ,.'-]+$/i.test(value)],
    error: "Town can only contain letters, numbers and certain characters"
  },
  county: {
    default: "",
    checks: [value => isNullOrEmpty(value) || /^[a-z0-9 ,.'-]+$/i.test(value)],
    error: "County can only contain letters, numbers and certain characters"
  },
  postcode: {
    default: "",
    checks: [
      value => /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z][A-Z]/gi.test(value)
    ],
    error: "Postcode must be a valid UK postcode"
  }
};

function UniversityInfoForm({
  initialValues = translateFields(fields, value => value.default),
  initialValidation = translateFields(fields, defaultValidation),
  loading,
  submitButtonDisplay,
  onSubmit
}) {
  const [values, setValues] = useState(initialValues);
  const [validation, setValidation] = useState(initialValidation);
  useCtrlEnterSubmit(canSubmit(), () => onSubmit(values));

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function canSubmit() {
    return Object.values(validation).every(v => v.isValid);
  }

  function validate(event) {
    const { name, value } = event.target;
    const field = fields[name];
    const hasChecks = Array.isArray(field.checks) && field.checks.length > 0;
    const isValid = !hasChecks || field.checks.every(c => c(value));
    setValidation({
      ...validation,
      [name]: {
        isValid,
        error: isValid ? null : field.error
      }
    });
  }

  return (
    <form id="university-info-form" className="admin-form">
      <header>
        <h3>Add a University</h3>
      </header>

      <TextField
        outlined={true}
        label="University Name"
        helperText={
          <HelperText persistent={true}>{validation.name.error}</HelperText>
        }
        trailingIcon={
          <i className="material-icons f__r-both--cen">
            {validation.name.isValid && "check"}
          </i>
        }
      >
        <Input
          data-cy="uni-name"
          autoFocus
          name="name"
          value={values.name}
          onChange={onChange}
          onBlur={validate}
          disabled={loading}
          id="NewUniversity-input-name"
        />
      </TextField>

      <TextField
        outlined={true}
        label="University Department (optional)"
        helperText={
          <HelperText persistent={true}>
            {validation.department.error}
          </HelperText>
        }
        trailingIcon={
          <i className="material-icons f__r-both--cen">
            {!isNullOrEmpty(values.department) &&
              validation.department.isValid &&
              "check"}
          </i>
        }
      >
        <Input
          data-cy="uni-department"
          name="department"
          value={values.department}
          onChange={onChange}
          onBlur={validate}
          disabled={loading}
          id="NewUniversity-input-department"
        />
      </TextField>

      <TextField
        outlined={true}
        label="Address Line 1"
        helperText={
          <HelperText persistent={true}>{validation.address1.error}</HelperText>
        }
        trailingIcon={
          <i className="material-icons f__r-both--cen">
            {validation.address1.isValid && "check"}
          </i>
        }
      >
        <Input
          data-cy="uni-address1"
          name="address1"
          value={values.address1}
          onChange={onChange}
          onBlur={validate}
          disabled={loading}
          id="NewUniversity-input-address1"
        />
      </TextField>

      <TextField
        outlined={true}
        label="Address Line 2 (optional)"
        helperText={
          <HelperText persistent={true}>
            {validation.address2.isValid}
          </HelperText>
        }
        trailingIcon={
          <i className="material-icons f__r-both--cen">
            {!isNullOrEmpty(values.address2) &&
              validation.address2.isValid &&
              "check"}
          </i>
        }
      >
        <Input
          data-cy="uni-address2"
          name="address2"
          value={values.address2}
          onChange={onChange}
          onBlur={validate}
          disabled={loading}
          id="NewUniversity-input-address2"
        />
      </TextField>

      <TextField
        outlined={true}
        label="Town (optional)"
        helperText={
          <HelperText persistent={true}>{validation.town.isValid}</HelperText>
        }
        trailingIcon={
          <i className="material-icons f__r-both--cen">
            {!isNullOrEmpty(values.town) && validation.town.isValid && "check"}
          </i>
        }
      >
        <Input
          data-cy="uni-town"
          name="town"
          value={values.town}
          onChange={onChange}
          onBlur={validate}
          disabled={loading}
          id="NewUniversity-input-town"
        />
      </TextField>

      <TextField
        outlined={true}
        label="County (optional)"
        helperText={
          <HelperText persistent={true}>{validation.county.isValid}</HelperText>
        }
        trailingIcon={
          <i className="material-icons f__r-both--cen">
            {!isNullOrEmpty(values.county) &&
              validation.county.isValid &&
              "check"}
          </i>
        }
      >
        <Input
          data-cy="uni-county"
          name="county"
          value={values.county}
          onChange={onChange}
          onBlur={validate}
          disabled={loading}
          id="NewUniversity-input-county"
        />
      </TextField>

      <TextField
        outlined={true}
        label="Postcode"
        helperText={
          <HelperText persistent={true}>{validation.postcode.error}</HelperText>
        }
        trailingIcon={
          <i className="material-icons f__r-both--cen">
            {validation.postcode.isValid && "check"}
          </i>
        }
      >
        <Input
          data-cy="uni-postcode"
          name="postcode"
          value={values.postcode}
          onChange={onChange}
          onBlur={validate}
          disabled={loading}
          id="NewUniversity-input-postcode"
        />
      </TextField>

      <span className="admin-form-btns">
        <b />
        {loading ? (
          <Spinner />
        ) : (
          <Button
            data-cy="addUniversity-btn"
            type="button"
            onClick={() => canSubmit() && onSubmit(values)}
            disabled={!canSubmit()}
            className="form-student-btn-submit txt-truncated"
            unelevated={true}
          >
            {submitButtonDisplay}
          </Button>
        )}
      </span>
    </form>
  );
}

export default UniversityInfoForm;
