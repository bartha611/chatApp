CREATE TABLE if not exists team (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  open BOOLEAN NOT NULL DEFAULT FALSE,
  shortid VARCHAR(10) NOT NULL,
  administrator INTEGER REFERENCES person
)