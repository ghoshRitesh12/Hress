import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';


export const serverAnyTimeInfoSchema = object({
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
    /^$|^[A-Za-z0-9\s.'-]+,[A-Za-z0-9\s.'-]+$/,
    'Invalid city, state format'
  ),
  postalCode: string().trim().matches(
    /^(?:\d{6})?$/, 
    'Invalid postal code'
  ),
  streetAddress: string().trim()
})


export const clientAnyTimeInfoSchema = toTypedSchema(serverAnyTimeInfoSchema);
