import * as mongoose from "mongoose";
import config from "../config";

export default async function() {
  const env = process.env.NODE_ENV;
  let url;
  if (env == "production") {
    //   prod

    url = `mongodb://tenx:10xxpassword@ds141185.mlab.com:41185/agtech-db`;
  } else if (env == "development") {
    //   dev
    url = "mongodb://localhost:27017/node-agtech-dev";
  } else {
    //   local
    url = "mongodb://localhost:27017/node-temp-local";
  }

  const mongo = await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  if (env == "development" && config.DB_MIGRAGE_OPTION == "drop") {
    // drop database
    console.log("Dropping database");
    await mongo.connection.dropDatabase();
    console.log("Database dropped");
  }

  return mongo;
}
