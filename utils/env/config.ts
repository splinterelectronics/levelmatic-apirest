process.env.PORT = process.env.PORT || 8080;
process.env.DB_CN = process.env.DB_CN || 'mongodb://localhost:27017/levelmatic';
process.env.SECRET_JWT_SEED =
  process.env.SECRET_JWT_SEED || 'token-desarrollo';