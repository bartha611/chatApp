CREATE TABLE IF NOT EXISTS Channel (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  shortid VARCHAR(10) NOT NULL,
  description text,
  createdAt timestamptz DEFAULT CURRENT_TIMESTAMP,
  teamId INTEGER REFERENCES Team
)