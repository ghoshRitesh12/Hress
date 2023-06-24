import { toTypedSchema } from '@vee-validate/yup';
import { object, string, ref } from 'yup';


export const signupSchema = toTypedSchema(object({
  fullname: string().trim().required('Name is required').min(2),
  email: string().trim().required('Email id is required').email('invalid email id'),
  refererId: string().trim().notRequired(),
  sponsorerId: string().trim().required().length(10).notOneOf([ref('refererId'), null], 'sponsorer & referer id must be different'),
  password: string().trim().required().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()])(?=.{8,20}$)/,
    'Use 8 to 20 characters with a mix of letters(lower & upper case), numbers & symbols among !@#$%^&*()'
  ),
  confirmPassword: string().required('re-enter same password').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()])(?=.{8,20}$)/,
    'Use 8 to 20 characters with a mix of letters(lower & upper case), numbers & symbols among !@#$%^&*()'
  ).oneOf([ref('password'), null], 'Passwords must match')
}))


