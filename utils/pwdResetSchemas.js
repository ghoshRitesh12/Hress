import { object, string, ref as yupRef } from "yup";
import { toTypedSchema } from '@vee-validate/yup';

export const genVerifyCodeSchema = object({
  email: string()?.trim().required()?.email()
});

export const serverPwdResetSchema = object({
  userId: string().trim().required(),
  newPassword: string().trim().required('New password required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*()])(?=.{8,16}$)/,
    'Use 8 to 16 characters with a mix of letters(lower & upper case), numbers & symbols among !@#$%^&*()'
  ),
  confirmNewPassword: string().trim().required('Re enter new password').oneOf([yupRef('newPassword')], 'Passwords must match')
})

export const clientPwdResetSchema = toTypedSchema(serverPwdResetSchema);
