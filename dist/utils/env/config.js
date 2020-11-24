"use strict";
process.env.PORT = process.env.PORT || 3000;
process.env.DB_CN =
    process.env.DB_CN ||
        'mongodb+srv://admin-levelmatic:QmdSem4YU5JmLBWh@cluster0.s9u2j.mongodb.net/Cluster0?retryWrites=true&w=majority';
process.env.SECRET_JWT_SEED = process.env.SECRET_JWT_SEED || 'token-desarrollo';
process.env.SALT = process.env.SALT || 10;
