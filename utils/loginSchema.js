import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';


export const serverLoginSchema = object({
  email: string().trim().required('Email id is required').email('Invalid email address'),
  password: string().trim().required('Password required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()])(?=.{8,16}$)/,
    'Use 8 to 16 characters with a mix of letters(lower & upper case), numbers & symbols among !@#$%^&*()'
  ),
})

export const clientLoginSchema = toTypedSchema(serverLoginSchema)

