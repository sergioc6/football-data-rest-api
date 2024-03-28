# Football Data REST API

## Requirements
Make you sure that you have this tools installed in your computer:
- git
- docker
- docker-compose


## Configuration
Create a new enviroment file.

```sh
cd football-data-rest-api
cp .env.example .env
```

Add your own env variables.

| ENV      | Savings |
| -------- | ------- |
| FOOTBALL_DATA_API_TOKEN  | Add your own API TOKEN for use Football Data API    |


Create the containers
```sh
docker-compose up -d
```

### Database
Enter inside the db container
```sh
docker-compose exec app bash
```
#### Run migrations
```sh
npx sequelize-cli db:migrate
```

### Server Development
By default, the API must be running in localhost:8000

### API Docs
You could find the API Documentation in the follow [link](https://documenter.getpostman.com/view/1096358/2sA35D6j2E) 

### TODO
- Add filters and order in Get List endpoints
- Add validations in each endpoint (express-validator)
- Add DB Transaction in import competition process.
- Add Unit Tests