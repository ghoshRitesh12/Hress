import { getServerSession } from "#auth";

export const nativeAuthenticate = async (event) => {
  const userSession = (await getServerSession(event))?.user || null;

  userSession ?? sendError(event, createError({
    statusCode: 401, statusMessage: 'Unauthenticated'
  }))
  event.user = userSession
}

export const nativeAuthorize = (event) => {
  if(!event?.user) {
    return sendError(event, createError({
      statusCode: 401, statusMessage: 'Unauthenticated'
    }))
  }
  
  if(event?.user?.role !== 'admin') {
    return sendError(event, createError({
      statusCode: 403, 
      statusMessage: 'Unauthorized'
    }))
  }
}
