CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);



insert into blogs (author, url, title ) values ('Dan Abramov', 'www.', 'Writing Resilient Components');
insert into blogs (author, url, title ) values ('Martin Fowler', 'www.1', 'Is High Quality Software Worth the Cost?');
insert into blogs (author, url, title ) values ('Robert C. Martin', 'www.2', 'FP vs. OO List Processing');