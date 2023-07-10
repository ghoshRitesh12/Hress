import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';

export const serverOneTimeInfoSchema = object({
  pancardNo: string().trim().required('Pancard no required').matches(
    /^[A-Z]{5}[0-9]{4}[A-Z]$/,
    'Invalid pancard number'
  ),
  bankAccountNo: string().trim().required('Bank a/c no required').matches(
    /^[0-9]{6,}$/,
    'Invalid bank a/c number'
  ),
  ifsc: string().trim().required('IFSC required').matches(
    /^[A-Z]{4}[0][A-Z0-9]{6}$/,
    'Invalid IFSC code'
  )
})

export const clientOneTimeInfoSchema = toTypedSchema(serverOneTimeInfoSchema)
