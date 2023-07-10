import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';


export const serverAdminInfoSchema = object({
  name: string().trim().min(3, 'Invalid name'),
  email: string().trim().email('Invalid email address'),
  pancardNo: string().trim().matches(
    /^(?:[A-Z]{5}[0-9]{4}[A-Z])?$/,
    'Invalid pancard number'
  ),
  bankAccountNo: string().trim().matches(
    /^(?:[0-9]{6,})?$/,
    'Invalid bank a/c number'
  ),
  ifsc: string().trim().matches(
    /^(?:[A-Z]{4}[0][A-Z0-9]{6})?$/,
    'Invalid IFSC code'
  ),
  phoneNumber: string().trim().matches(
    /^(?:\d{10})?$/,
    'Invalid phone number'
  ),
  xlmWalletAddress: string().trim().matches(
    /^(?:[a-zA-Z0-9]{55})?$/, 
    'Invalid wallet address'
  ),
  country: string().trim().matches(
    /^(?:[A-Za-z\s.'-]{2,})?$/, 
    'Invalid country name'
  ),
  cityState: string().trim().matches(
    /^$|^[A-Za-z\s.'-]+,[A-Za-z\s.'-]+$/, 
    'Invalid city, state format'
  ),
  postalCode: string().trim().matches(
    /^(?:\d{6})?$/, 
    'Invalid postal code'
  ),
  streetAddress: string().trim()
})


export const clientAdminInfoSchema = toTypedSchema(serverAdminInfoSchema);


export const serverCourseSchema = object({
  course: string().trim().required('Course name required').matches(
    /^[A-Za-z-]{4,}$/,
    'Invalid course name'
  )
})

export const clientCourseSchema = toTypedSchema(serverCourseSchema);
