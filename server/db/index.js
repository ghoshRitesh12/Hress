import mongoose from "mongoose";

export default async (_nitroApp) => {
  try {
    const config = useRuntimeConfig();

    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DATABASE_URI);

    console.log('💾 connected to DB');
    
  } catch (err) {
    console.log('Could not connect to the db');
    
    throw createError({
      message:  'Could not connect to the db',
      statusCode: 500
    })
  }

}
