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



/*after migrations  */
drop table readinglist;drop table blogs;drop table users;drop table migrations;

insert into users (username, name, password ) values ('test@test.com', 'tester', 'passwordhashed');
insert into blogs (author, url, title, user_id ) values ('Dan Abramov', 'www.', 'Writing Resilient Components', 1);
insert into blogs (author, url, title , user_id  ) values ('Martin Fowler', 'www.1', 'Is High Quality Software Worth the Cost?', 1);
insert into blogs (author, url, title , user_id) values ('Robert C. Martin', 'www.2', 'FP vs. OO List Processing', 1);
insert into readinglists (blog_id, user_id) values (1,1);
insert into readinglists (blog_id, user_id) values (2,1);


UPDATE users SET disabled = false WHERE id = 1;
UPDATE users SET disabled = false WHERE id = 2;

UPDATE users SET disabled = true WHERE id = 3;