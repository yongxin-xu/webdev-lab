-- Exercise 1 (done for you):
SELECT * FROM users;



-- Exercise 2 (done for you):
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3
SELECT id, first_name, last_name 
FROM users 
ORDER BY last_name;



-- Exercise 4
SELECT id, image_url, user_id 
FROM posts 
WHERE user_id = 26;




-- Exercise 5
SELECT id, image_url, user_id
FROM posts
WHERE user_id IN (12, 26);



-- Exercise 6
SELECT COUNT(*) FROM posts;



-- Exercise 7
SELECT user_id, COUNT(*) AS count 
FROM comments 
GROUP BY user_id 
ORDER BY count DESC;



-- Exercise 8
SELECT posts.id, posts.image_url, user_id, username, first_name, last_name 
FROM posts JOIN users ON users.id = posts.user_id 
WHERE user_id IN (12, 26);



-- Exercise 9
SELECT posts.id, pub_date, following_id 
FROM posts JOIN following ON posts.user_id = following.following_id 
WHERE following.user_id = 26;



-- Exercise 10
SELECT posts.id, pub_date, following_id, username 
FROM posts JOIN following ON posts.user_id = following.following_id JOIN users ON users.id = posts.user_id 
WHERE following.user_id = 26 ORDER BY pub_date DESC;



-- Exercise 11
INSERT INTO bookmarks(user_id, post_id, timestamp) VALUES (26, 219, CURRENT_TIMESTAMP), (26, 220, CURRENT_TIMESTAMP), (26, 221, CURRENT_TIMESTAMP);



-- Exercise 12
DELETE FROM bookmarks WHERE user_id = 26 AND post_id IN (219, 220, 221);



-- Exercise 13
UPDATE users SET email = 'knick2022@gmail.com' WHERE id = 26;



-- Exercise 14
SELECT posts.id, posts.user_id, COUNT(*) AS count, caption 
FROM posts JOIN comments ON comments.post_id = posts.id WHERE posts.user_id = 26 
GROUP BY posts.id 
ORDER BY count DESC;
