import User from "../../models/User.model";
import { compare } from 'bcrypt';
import { serverLoginSchema } from "~/utils/loginSchema";

export default eventHandler(async (event) => {
  const queryFields = [
    'info.name', 'info.email', 'pfp',
    'role', 'verified', 'password'
  ];
  try {
    const body = await readBody(event);
    await serverLoginSchema.validate(body);


    const foundUser = await User.findOne({ 'info.email': body.email }, queryFields)
      .readConcern('majority')
    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'Invalid credentials.'
      }))
    }

    if (!foundUser.verified) {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: 'Account not verified, try signing up again'
      }))
    }

    if (!await compare(body.password, foundUser.password)) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      }))
    }

    console.log('success response');
    setResponseStatus(event, 200)
    return {
      user: {
        name: foundUser.info.name,
        email: foundUser.info.email,
        image: foundUser.pfp,
        role: foundUser.role
      }
    }


  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
