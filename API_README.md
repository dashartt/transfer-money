# API Transfer-Money

# 📁 Collection: Account

## End-point: Auth - register or login

OBS: depois do <code>option=</code> adicione <code>login</code> ou <code> register </code>

> ```
> POST http://localhost:3001/auth?option=
> ```

### Body (**raw**)

```json
{
  "username": "dashartx1",
  "password": "12345678"
}
```

### Response - register

```json
{
  "message": "Account created successfully. Login with your account to proceed"
}
```

### Response - login

```json
{
  "username": "dashartx1",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhc2hhcnR4MSIsImFjY291bnRJZCI6MSwiaWF0IjoxNjcwNDI4MTIzfQ.i7oWXC4GTRh2jcOCqS05WcUUn16BxfG79xeDWcmpyU0",
  "balance": 0,
  "message": "User authenticated successfully"
}
```

---

## End-point: Make Deposit

> ```
> PATCH http://www.localhost:3001/account/deposit
> ```

### Headers

| Content-Type  | Value       |
| ------------- | ----------- |
| Authorization | <token_jwt> |

### Body (**raw**)

```json
{
  "value": 1
}
```

### Response

```json
{
  "message": "Successful transfer"
}
```

---

# 📁 Collection: Transaction

## End-point: Send Money

> ```
> POST http://www.localhost:3001/transactions/transfer
> ```

### Headers

| Content-Type  | Value       |
| ------------- | ----------- |
| Authorization | <token_jwt> |

### Body (**raw**)

```json
{
  "creditedAccount": "dashartz",
  "debitedAccount": "dashart",
  "value": 150
}
```

### Response

```json
{
  "message": "Successful transfer"
}
```

---

## End-point: Transation History

> ```
> GET http://www.localhost:3001/transactions/history
> ```

### Headers

| Content-Type  | Value       |
| ------------- | ----------- |
| Authorization | <token_jwt> |

### Response

```json
[
  {
    "creditedAccount": "dashart2",
    "debitedAccount": "dashartx1",
    "inCome": 50,
    "outCome": 211,
    "date": "07/12/2022"
  },
  {
    "creditedAccount": "dashart2",
    "debitedAccount": "dashartx1",
    "inCome": 10,
    "outCome": 749,
    "date": "07/12/2022"
  }
]
```
