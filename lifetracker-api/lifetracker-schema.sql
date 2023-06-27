CREATE TABLE users(
    id VARCHAR(200) NOT NULL,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    created_at VARCHAR(200) NOT NULL,
    updated_at VARCHAR(200) NOT NULL
);

CREATE TABLE nutrition(
    id VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    calories VARCHAR(200) NOT NULL,
    image_url VARCHAR(200) NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    created_at VARCHAR(200) NOT NULL,
    updated_at VARCHAR(200) NOT NULL
);