<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="./src/assets/logo.ico" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Coffee Shop</h2>

  <p align="center">
    <a href="https://documenter.getpostman.com/view/26100678/2s93m62Mkp">Postman Documentation</a>
    ·
    <a href="mailto:4fifbuchori@gmail.com">Report Bug</a>
    ·
    <a href="mailto:4fifbuchori@gmail.com">Request Feature</a>
  </p>
</div>

## Built With

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,postgres" />
  </a>
</p>

## 𓆙 Table of Contents

- [Table of Contents](#𓆙-Table-of-Contents)
- [Requirement](#𓆙-Requirement)
- [Installation](#)
  - [Windows](#𓆙-Windows-Installation)
  - [Linux](#𓆙_Linux_Installation)
- [How to run](#𓆙-How-to-run)
- [Related Projects](#𓆙-Related-Projects)
- [Route](#𓆙-Documentation-Postman)
- [Documentation Postman](#𓆙-Documentation-Postman)

## 𓆙 Requirement

This repo require a [NodeJS](https://nodejs.org/)

[ENV](#ENV) File

## 𓆙 Windows Installation

First of all, you need to install [Git](https://git-scm.com/download/win) & [NodeJS](https://nodejs.org/). Then open your git bash, and follow this:<br>

```sh
$ git clone https://github.com/afif-buchori/coffee-shop.git
$ cd Coffee-Shop
```

## 𓆙 Linux Installation

```sh
$ apt-get update
$ apt-get install git-all
$ apt-get install nodejs-current
$ git clone https://github.com/afif-buchori/coffee-shop.git
$ cd Coffee Shop
```

## 𓆙 How to run

1. Install file using [WINDOWS](#Windows-Installation) OR [LINUX](Linux-Installation)

2. Add .env file at root folder, and add following

```sh
DB_HOST = "YOUR HOST"
DB_DATABASE = "YOUR DB NAME"
DB_PORT = "YOUR DB PORT"
DB_USER = "YOUR DB USER"
DB_PWD = "YOUR DB PASSWORD"
SERVER_PORT = "YOUR LOCALHOST"

JWT_SECRET = "YOUR SECRET JWT"

MONGO_PWD = "YOUR MONGO PASSWORD"
MONGO_DBNAME = "YOUR DB NAME"
MONGO_USER = "YOUR USERNAME MONGO"
MONGO_HOST = "YOUR MONGO HOST"

CLOUD_NAME = "YOUR CLOUDNAME"
CLOUD_KEY = "YOUR KEY CLOUD"
CLOUD_SECRET = "YOUR KEY SECRET CLOUD "

```

3. Starting application

```sh
$ npm run dev
```

## Related Projects

[Coffee-Shop Website](https://github.com/afif-buchori/coffeeshop-react)

[Coffee-Shop Mobile](https://github.com/afif-buchori/coffee-andro)

## 𓆙 Route

| Method           | Endpoint                                  | Remark                     |
| ---------------- | ----------------------------------------- | -------------------------- |
| ==> USERS        |
| `POST`           | /api/auth                                 | Login                      |
| `POST`           | /api/auth/register                        | Register                   |
| `PATCH`          | /api/auth/logout                          | Logout                     |
| `PATCH`          | /api/auth/forgot                          | Forgot pwd (get otp)       |
| `PATCH`          | /api/auth/editpassbyforgot                | Forgot pwd (change pwd)    |
| `PATCH`          | /api/auth                                 | Change pwd                 |
| `PATCH`          | /api/auth/profile                         | Edit profile               |
| `GET`            | /api/users                                | Get Profile                |
| ==> PRODUCTS     |
| `GET`            | /api/products                             | Get all products           |
| `GET`            | /api/products/:id                         | Get details product        |
| `POST`           | /api/products                             | Create new product (admin) |
| `PATCH`          | /api/products/:id                         | Edit product (admin)       |
| `DELETE`         | /api/products/:id                         | Delete product (admin)     |
| ==> PROMOS       |
| `GET`            | /api/promos                               | Get all promos             |
| `POST`           | /api/promos                               | Create new promo           |
| `PATCH`          | /api/promos/:id                           | Edit promo                 |
| `DELETE`         | /api/promos/delete/:id                    | Delete promo               |
| ==> TRANSACTIONS |
| `POST`           | /api/transactions                         | Create new transaction     |
| `GET`            | /api/transactions/get-all-order           | Get All pending order      |
| `GET`            | /api/transactions/get-done-order          | Get All pending order      |
| `GET`            | /api/transactions/change-status-order/:id | Change status order        |

## 𓆙 Documentation Postman

Click here [POSTMAN](./Coffee%20Shop.postman_collection.json)

<BR>
<BR>

<p align="center"> <samp><i>&copy; muchamad afif buchori </i></samp> </p>
