-- Følgende SQL-kommandoer viser, hvordan vi har lavet vores tabeller i vores database. 


-- Opret tabel news
CREATE TABLE news (
    news_id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(MAX) NULL,
    author NVARCHAR(MAX) NULL,
    description NVARCHAR(MAX) NULL,
    url NVARCHAR(MAX) NULL,
    publishedAt DATETIME2 NULL,
    content NVARCHAR(MAX) NULL,
    imageUrl NVARCHAR(MAX) NULL
);

-- Opret tabel users
CREATE TABLE users (
    users_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(MAX) NULL,
    favorite VARCHAR(MAX) NULL,
    password VARCHAR(MAX) NULL
);

-- Opret tabel weatherForecast
CREATE TABLE weatherForecast (
    weather_id INT PRIMARY KEY IDENTITY(1,1),
    day DATETIME NULL,
    weathercode INT NULL,
    temperature INT NULL,
    sunrise DATETIME NULL,
    sunset DATETIME NULL
);

-- Opret tabel weatherLastThirty
CREATE TABLE weatherLastThirty (
    weatherThirty_id INT PRIMARY KEY IDENTITY(1,1),
    date VARCHAR(MAX) NOT NULL,
    temp VARCHAR(MAX) NOT NULL,
    icon VARCHAR(MAX) NOT NULL
);

-- Opret tabel favorite_articles
CREATE TABLE favorite_articles (
    favorite_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT,
    news_id INT,
    FOREIGN KEY (user_id) REFERENCES users(users_id),
    FOREIGN KEY (news_id) REFERENCES news(news_id)
);

-- Opret tabel Read_Articles
CREATE TABLE Read_Articles (
    read_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT,
    news_id INT,
    FOREIGN KEY (user_id) REFERENCES users(users_id),
    FOREIGN KEY (news_id) REFERENCES news(news_id)
);