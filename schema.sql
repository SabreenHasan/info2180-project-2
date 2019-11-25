CREATE TABLE Users(id INTEGER PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    password PASSWORD_ARGON2_DEFAULT_MEMORY_COST,
    email VARCHAR NOT NULL,
    date_joined DATETIME);

CREATE TABLE Issues(id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR NOT NULL,
    priority TEXT,
    status VARCHAR,
    assigned_to INTEGER,
    created_by TEXT NOT NULL,
    created TEXT,
    updated TEXT);


INSERT INTO Users (id, firsname,lastname,password, email, date_joined)
    VALUES (1, A, SMALL, password123,admin@bugme.com,
            CONVERT(VARCHAR(10), GETDATE(), 111));

DESC Issues;