import LoadApp from "./app";
import config from "./config";
import logger from "./loaders/winston";

async function startServer() {
  logger.info(` 👽  Starting server in ${process.env.NODE_ENV} mode   👽 `);
  const app = await LoadApp();
  app.listen(process.env.PORT, () => {
    logger.info(` 🔥 Listening on http://localhost:${config.PORT_HTTP} 🔥`);
  });
}

startServer();
