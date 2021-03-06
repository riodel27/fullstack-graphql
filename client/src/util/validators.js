export const loginValidation = values => {
  const errors = {}

  if (values.email.trim() === "") {
    errors.email = "Email must not be empty"
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!values.email.match(regEx)) {
      errors.email = "Email must be a valid email address"
    }
  }

  if (values.password.trim() === "") {
    errors.password = "Password must not be empty"
  } else {
    const regEx = /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*\W.*\W)[a-zA-Z0-9\S]{20,}$/
    if (!values.password.match(regEx)) {
      errors.password =
        "Please improve password for security. Must have atleast 2 characters,numbers and symbols."
    }
  }

  return errors
}
