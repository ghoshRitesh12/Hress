import mongoose from "mongoose";

export default async (_nitroApp) => {
  try {
    const config = useRuntimeConfig();

    mongoose.set('strictQuery', false);
    await mongoose.connect(
      process.env.NODE_ENV === 'development' ?
        config.DATABASE_URI_DEV : config.DATABASE_URI_PROD
    );

    console.log('💾 connected to DB');
    
  } catch (err) {
    console.log('Could not connect to the db');
    
    throw createError({
      message:  'Could not connect to the db',
      statusCode: 500
    })
  }

}
