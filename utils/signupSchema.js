import { toTypedSchema } from '@vee-validate/yup';
import { object, string, ref as yupRef } from 'yup';

export const clientSignupSchema = [
  toTypedSchema(object().shape({
      fullname: string().trim().required('Full name is required').min(3, 'invalid name'),
      email: string().trim().required('Email address is required').email('invalid email id'),
      course: string().required('Select a course').equals(['basic', 'advance']),
    }, 
  )),

  toTypedSchema(object().shape({
      refererId: string().trim().when('refererId', (val, schema) => {
        if(val[0]?.trim()?.length > 0) {
          return string().length(10, 'Referer id must be exactly 10 characters')
        } else {
          return string().notRequired()
        }
      }),
      sponsorerId: string().trim().required().length(
        10,
        'Sponsorer id must be exactly 10 characters'
      ).notOneOf([yupRef('refererId'), null], 'Sponsorer & referer id must be different'),
    }, 
    [['refererId', 'refererId']]
  )),

  toTypedSchema(object().shape({
      password: string().trim().required('Password required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()])(?=.{8,16}$)/,
        'Use 8 to 16 characters with a mix of letters(lower & upper case), numbers & symbols among !@#$%^&*()'
      ),
      confirmPassword: string().trim().required('Re enter password').oneOf([yupRef('password')], 'Passwords must match')
    }, 
  )),

  toTypedSchema(object().shape({
      otp: string().required('OTP is required').length(6)
    }, 
  )),
]


// export const serverSignupSchema = '';
export const serverSignupSchema = object().shape({
    fullname: string().trim().required('Full name is required').min(3, 'invalid name'),
    email: string().trim().required('Email address is required').email('invalid email id'),
    course: string().required('Select a course').equals(['basic', 'advance']),
    refererId: string().trim().when(['refererId'], (val, schema) => {
      if(val[0]?.trim()?.length > 0) {
        return string().length(
          10, 
          'Referer id must be exactly 10 characters'
        )
      } else {
        return string().notRequired()
      }
    }),
    sponsorerId: string().trim().required().length(
      10,
      'Sponsorer id must be exactly 10 characters'
    ).notOneOf([yupRef('refererId'), null], 'Sponsorer & referer id must be different'),
    password: string().trim().required('Password required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()])(?=.{8,16}$)/,
      'Use 8 to 16 characters with a mix of letters(lower & upper case), numbers & symbols among !@#$%^&*()'
    ),
    confirmPassword: string().trim().required('Re enter password').oneOf([yupRef('password')], 'Passwords must match'),
    otp: string().required('OTP is required').length(6)
  },
  [['refererId', 'refererId']]
)
