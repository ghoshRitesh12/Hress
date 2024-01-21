import { toTypedSchema } from '@vee-validate/yup';
import { object, string, ref as yupRef } from 'yup';

export const clientSignupSchema = [
  toTypedSchema(object().shape({
    fullname: string().trim().required('Full name is required').min(3, 'Invalid name'),
    email: string().trim().required('Email address is required').email('Invalid email id'),
    course: string().required('Select a course').equals(['basic', 'advance']),
  },
  )),

  toTypedSchema(object().shape({
    refererId: string().trim().when(['refererId'], (val, schema) => {
      if (val[0]?.trim()?.length > 0) {
        return string().matches(
          /^(?:[a-z0-9]{10})?$/,
          'Invalid referer id'
        )
      } else {
        return string().notRequired()
      }
    }),
    sponsorerId: string().trim().required('Sponsorer id required').matches(
      /^[a-z0-9]{10}$/,
      'Invalid sponsorer id'
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
    activeToken: string().trim().required('Active token required').matches(
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}$/,
      'Invalid active token'
    ),
    otp: string().trim().required('OTP is required').matches(
      /^[0-9]{6}$/,
      'OTP must be a 6 digit number'
    ),
  },
    [['activeToken', 'activeToken']]
  )),
]


export const serverSignupSchema = object().shape({
  fullname: string().trim().required('Full name is required').min(3, 'Invalid name'),
  email: string().trim().required('Email address is required').email('Invalid email id'),
  course: string().required('Select a course').equals(['basic', 'advance']),
  refererId: string().trim().when(['refererId'], (val, schema) => {
    if (val[0]?.trim()?.length > 0) {
      return string().matches(
        /^(?:[a-z0-9]{10})?$/,
        'Invalid referer id'
      )
    } else {
      return string().notRequired()
    }
  }),
  sponsorerId: string().trim().required('Sponsorer id required').matches(
    /^[a-z0-9]{10}$/,
    'Invalid sponsorer id'
  ).notOneOf([yupRef('refererId'), null], 'Sponsorer & referer id must be different'),
  password: string().trim().required('Password required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()])(?=.{8,16}$)/,
    'Use 8 to 16 characters with a mix of letters(lower & upper case), numbers & symbols among !@#$%^&*()'
  ),
  confirmPassword: string().trim().required('Re enter password').oneOf([yupRef('password')], 'Passwords must match'),
  activeToken: string().trim().required('Active token required').matches(
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}$/,
    'Invalid active token'
  ),
  otp: string().trim().required('OTP is required').matches(
    /^[0-9]{6}$/,
    'OTP must be a 6 digit number'
  ),
},
  [
    ['refererId', 'refererId'],
    ['activeToken', 'activeToken']
  ]
)
