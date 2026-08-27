CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    author_id INTEGER NOT NULL,
    
    CONSTRAINT fk_blog_author
        FOREIGN KEY (author)
        REFERENCES users(id)
        ON DELETE CASCADE
    
);



ALTER TABLE blog
    ADD COLUMN
    updated_at TIMESTAMP NOT NULL DEFAULT NOW();


ALTER TABLE blog
    ADD COLUMN
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE;