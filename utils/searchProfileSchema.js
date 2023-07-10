import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';

export const serverSearchProfileSchema = object({
  referralId: string().trim().required('Referral id required').matches(
    /^[a-z0-9]{10}$/,
    'Invalid referral id'
  )
})

export const clientSearchProfileSchema = toTypedSchema(serverSearchProfileSchema);
