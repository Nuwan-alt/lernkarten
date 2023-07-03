# Lernkarten-App

## <ins>Configuration</ins>
### >>> DB setup
* Create mySQL database
* Add User, Password, Host, Port, Database to the 
`.env.development.local` file

``` 
# DATABASE
DB_USER = 
DB_PASSWORD =
DB_HOST = 
DB_PORT = 
DB_DATABASE = 
```
### >>> Secret Key
This key use for creating JWT token.

* Change the secret key in `.env.development.local` file. [`Optional`]
``` 
# TOKEN
SECRET_KEY = 
```

### >>> Create developer accounts [Seperate word file have for this]
* Create Google developer account
* Add clientID, clientSecret, callback 

```
GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET = 
GOOGLE_CALLBACK = http://localhost:3002/google/callback
```
* Create facebook developer account
* Add clientID, clientSecret, callback 

```
FACEBOOK_CLIENT_ID = 
FACEBOOK_CLIENT_SECRET = 
FACEBOOK_CALLBACK = http://localhost:3002/facebook/callback
```

### >>> Run the application
[ Open a terminal (Sometimes windows powershell doesn't work. Therefor use git bash)]
1. ``yarn install`` ( Your computer must have installed yarn )
2. `` yarn dev``
   

## <ins>Endpoints</ins> ( Try the postman collection )
You can change the port as you need. by updating `PORT` in `.env.development.local` 

### >>> Users
1.  ` Add user `
```
[POST] http://localhost:3002/users

--- body ---
{
    "email": <emai>,
    "password": <password>
}
```
2. ` Update user `
```
[PUT] http://localhost:3002/users/<user_id>

--- body ---
{
    "email": <emai>,
    "password": <password>
}
```
3. ` Delete user `
```
[DELETE] http://localhost:3002/users/<user_id>
```
### >>> Auth
4. ` Log in user - email, password`
```
[POST] http://localhost:3002/login

--- body ---
{
    "email": <emai>,
    "password": <password>
}
```
5. ` Log out user `
```
[POST] http://localhost:3002/logout

--- body ---
{
    "email": <emai>,
}
```
6. ` Log in user - google`
```
http://localhost:3002/google

* Have to check in the browser.
* If check other endpoints using post man, have to set cookies manually. Have a seperate word file for this.
```
7. ` Log in user - facebook`
```
http://localhost:3002/facebook

* Have to check in the browser.
* If check other endpoints using post man, have to set cookies manually. Have a seperate word file for this.
```

### >>> Admin
8. ` Add admin`
```
[POST] http://localhost:3002/admin

--- body ---
{
    "email": <emai>,
    "password": <password>
}
```

### >>> Exams
9. ` Add exam`
```
[POST] localhost:3002/exams

--- body ---
{
    "title": <exam name>
}
```
10. ` Update exam`
```
[PUT] localhost:3002/exams/<exam-id>

--- body ---
{
    "title": <exam name>
}
```
11. ` Detele exam`
```
[DELETE] localhost:3002/exams/<exam-id>
```
12. ` Get all exam`
```
[GET] localhost:3002/exams
```
13. ` Get all topics of a exam`
```
[GET] localhost:3002/exams/<exam_id>
```
14. ` Set next exam date`
```
[POST] localhost:3002/exams/set-next-exam

--- body ---
{
    "user_id":<userId>,
    "exam_id":<examId>,
    "exam_date":<date>
}
```
15. ` Get all upcoming exams`
```
[GET] localhost:3002/exams/up-coming/<user_id>
```
### >>> Topics
16.  ` Add topic`
```
[POST] localhost:3002/topics/<exam_id>

--- body ---
{
    "title": <topic name>
}
```
17.  ` Update topic`
```
[PUT] localhost:3002/topics/<topic_id>

--- body ---
{
    "title": <topic name>
}
```
18. ` Detele topic`
```
[DELETE] localhost:3002/topics/<topic_id>
```
19.  ` Get all topics`
```
[GET] localhost:3002/topics
```
20.  ` Get all sub-topics of a topic`
```
[GET] localhost:3002/topics/<topic_id>
```
### >>> Sub Topics
21.  ` Add sub-topic`
```
[POST] localhost:3002/sub-topics/<topic_id>

--- body ---
{
    "title": <sub-topic name>
}
```
22.  ` Update sub-topic`
```
[PUT] localhost:3002/sub-topics/<sub-topic_id>

--- body ---
{
    "title": <sub-topic name>
}
```
23. ` Detele sub-topic`
```
[DELETE] localhost:3002/sub-topics/<sub-topic_id>
```
24.   ` Get all sub-topics`
```
[GET] localhost:3002/sub-topics
```
25.   ` Get all card of a sub-topic`
```
[GET] localhost:3002/sub-topics/<sub-topic_id>
```
### >>> Cards
26.   ` Add card`
```
[POST] localhost:3002/cards/<sub-topic_id>

--- body ---
{
    "question":<question>,
    "answer":<answer>
}
```
27.   ` Update card`
```
[PUT] localhost:3002/cards/<card_id>

--- body ---
{
    "question":<question>,
    "answer":<answer>
}
```
28. ` Detele card`
```
[DELETE] localhost:3002/cards/<card_id>
```
29.    ` Get card by ID`
```
[GET] localhost:3002/cards
--- body ---
{
    "user_id":<userId>,
    "card_id":<cardId>
}
```
30.   `Add custom card`
```
[POST] localhost:3002/cards/custom/<sub-topic_id>
--- body ---
{
    "question":<question>,
    "answer":<answer>
    "user_id":<userID>
}
```
31.   `Set favourite card`
```
[POST] localhost:3002/cards/fav
--- body ---
{
    "user_id":<userID>,
    "card_id":<cardID>,
    "isFavourite":<true/false>
}
```
32.   `Set stage card`
```
[POST] localhost:3002/cards/stage
--- body ---
{
    "user_id":<userID>,
    "card_id":<cardID>,
    "stage":<stage>
}
```
33.   `Set notes card`
```
[POST] localhost:3002/cards/notes
--- body ---
{
    "user_id":<userID>,
    "card_id":<cardID>,
    "notes":<notes>
}
```
### >>> Articles
34.   `Add article`
```
[POST] localhost:3002/articles
--- body ---
{
    "title":<title>
    "content":<content>,
    "image":<image url>,
    "link":<link>
}
```
35.   `Update article`
```
[PUT] localhost:3002/articles/<articleID>
--- body ---
{
    "title":<title>
    "content":<content>,
    "image":<image url>,
    "link":<link>
}
```
36.   `Delete article`
```
[DELETE] localhost:3002/articles/<articleID>
```
### >>> Content
37.   ` Get content`
```
[GET] localhost:3002/content
```
### >>> Faveorite-subtopic
38.    `Set subtopic favourite`
```
[POST] localhost:3002/user-subtopics
--- body ---
{
    "user_id":<userID>,
    "subtopic_id":<sub-topic_id>
}
```
39.    `Remove subtopic favourite`
```
[POST] localhost:3002/user-subtopics
--- body ---
{
    "user_id":<userID>,
    "subtopic_id":<sub-topic_id>
}
```
40.    `Get all favourite subtopic by user`
```
[GET] localhost:3002/user-subtopics/<userID>
```

