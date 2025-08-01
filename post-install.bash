yarn prisma db pull --schema src/prisma/schema-postgres.prisma
yarn prisma db pull --schema src/prisma/schema-mysql.prisma
yarn prisma generate --schema src/prisma/schema-postgres.prisma