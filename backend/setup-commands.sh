cd server

# Remove the database file (if run multiple times - not in README)

rm src/db/dev.db 2> /dev/null || true

# Getting started

npm install

cp .env.example .env

# Migrations and seeders

npx dotenv sequelize db:migrate

npx dotenv sequelize db:seed:all

echo "----- Tables Exist? -----"
sqlite3 src/db/dev.db ".schema"

echo "----- Tables Have Data? -----"
sqlite3 src/db/dev.db "SELECT * FROM Users;"
