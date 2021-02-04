# Bakery API

My first RESTful API created in **Node.js** with **Express**. Data is stored on **MongoDB** using mongoose client. I'm also using **TypeScript** to avoid unnecessary errors.
Did you ever have this feeling "I need some good breads and rolls collection for my website"? Well, **Bakery API** is here for you. Enjoy!

Bakery API contains collections of:
- breads
- rolls
- users

You don't need authentication to get data from API but if you're interested in adding new breads and rolls a token will be needed.
Signing up is safe, user's password are encrypted with [bcrypt](https://www.npmjs.com/package/bcrypt) library.

## Root Endpoint

The root endpoint should prefix all resources, CORS is also enabled.
```
https://rawdanowiczdev.pl/bakery-api/
```

## Get collection

To get a collection just make **GET** request for according endpoint.

```
https://rawdanowiczdev.pl/bakery-api/breads/
https://rawdanowiczdev.pl/bakery-api/rolls/
```

To get a specific item request endpoint with it's collection followed by id number.
```
https://rawdanowiczdev.pl/bakery-api/<collection>/<id>/
```

## Create user

Signing up lets you use **POST**, **PATCH** and **DELETE** methods. Of course you cannot edit objects of other users, these methods are restricted only to your creations.
To get an authorization token you need to sign up. Tokens are created using [JSON Web Token](https://jwt.io/).

To sign up make **POST** request.

```
https://rawdanowiczdev.pl/bakery-api/auth/signup/
```

In request's body include your email and password. Password should contain min 6 and max 20 characters. If succeeded you will get an **authorization token** in respone body.

```json
{
  "email": "<youremail>",
  "password": "<yourpassword>"
}
```

In case you lost your token make **POST** request for resend endpoint with valid email and password in request's body like you did signing up.

```
https://rawdanowiczdev.pl/bakery-api/auth/resend/
```

Next steps with creating, updating and deleting objects require you to add token to your request's headers.

```
header: Authorization
value: Bearer <yourtoken>
```

## Create object

To create new object make **POST** request for endpoint with appropriate collection.

```
https://rawdanowiczdev.pl/bakery-api/breads/
https://rawdanowiczdev.pl/bakery-api/rolls/
```

In request's body follow this schema. In case of **rolls** collection you should NOT include grains.

```json
  {
    "grains": ["<grain>"],
    "name": "<name>",
    "description": "<appropriate description>",
    "imageURL": "<https image url>"
  }
```

- **grains** array should contain at least 1 string and max 10
- **name** should be min 3 and max 30 characters
- **description** should be min 5 and max 500 characters
- **imageURL** should be working https url

If succeeded object will be added to database and will get it's unique id number.

## Update object

To update object you created make **PATCH** request  for endpoint with appropriate collection followed by it's id.

```
https://rawdanowiczdev.pl/bakery-api/<collection>/<id>/
```

In request's body you can include only properties that you're willing to change but each property follows the same validation as before.

## Delete object

To delete object you created make **DELETE** request  for endpoint with appropriate collection followed by it's id. You don't need to include body.

```
https://rawdanowiczdev.pl/bakery-api/<collection>/<id>/
```

<hr>

*Created by [Marek Rawdanowicz](https://rawdanowiczdev.pl)*
