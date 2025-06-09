export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'secretKey',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/todos_db',
});
