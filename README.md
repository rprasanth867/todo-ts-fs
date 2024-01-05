# todo-ts-fs
Todo list Full Stack application with typescript

## Backend
```
npx tsc --init
```
Initialize tsconfig.json with default config


### account-service
account-service runs on ```5000``` port

```npm run dev``` command for start the server

### auth-service
auth-service runs on ```5001``` port

```npm run dev``` command for start the server


## SQL

### account
Created account database

#### tables
`todos table schema`

| Field           | Type        | Null  | Key   | Default   | Extra             |
|-----------------|-------------|-------|-------|-----------|-------------------|
| todo_id         | int         | no    | pri   | NULL      | auto_increment    |
| name            | varchar(30) | no    |       | NULL      |                   |
| is_completed    | tinyint(1)  | yes   |       | 0         |                   |

`users table schema`

| Field   | Type                  | Null | Key | Default | Extra          |
|---------|-----------------------|------|-----|---------|----------------|
| user_id | int                   | NO   | PRI | NULL    | auto_increment |
| name    | varchar(50)           | NO   |     | NULL    |                |
| email   | varchar(50)           | NO   |     | NULL    |                |
| gender  | enum('male','female') | NO   |     | male    |                |
