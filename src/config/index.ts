const env = process.env.NODE_ENV || "development";

export default {
  BASE_URL: env == "production" ? process.env.BASE_URL : "http://localhost",
  PORT_HTTPS: process.env.PORT_HTTPS || 3000,
  PORT_HTTP: process.env.PORT_HTTP || 5000,
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },
  SALT_ROUNDS: process.env.SALT_ROUNDS || 12,
  DB_MIGRAGE_OPTION : process.env.DB_MIGRATE || "none",
  JWT_AUTH_USER: process.env.JWT_AUTH_USER || "test_user_jwt",
  JWT_AUTH_FARMER: process.env.JWT_AUTH_FARMER || "test_farmer_jwt",
  JWT_AUTH_EXPERT: process.env.JWT_AUTH_EXPERT || "test_expert_jwt",
  JWT_AUTH_BUSINESS: process.env.JWT_AUTH_BUSINESS || "test_business_jwt",
  JWT_AUTH_ADMIN: process.env.JWT_AUTH_ADMIN || "test-admin_jwt",
  MLAB_USER: process.env.MLAB_USER,
  MLAB_PASSWORD: process.env.MLAB_PASSWORD,
  CONFIRM_EMAIL_KEY: process.env.CONFIRM_EMAIL_KEY
};
