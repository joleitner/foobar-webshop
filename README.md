# FooBar Webshop

### By 'joleitner'

This project is demonstrating the successful implementation of a cloud-based webshop for the so called 'FooBar GmbH'.
It uses the latest version of Next.js 13 as the frontend, and Nest.js as the backend. Both are written in TypeScript.

## Getting Started

To run the project locally, clone the repository and navigate into the `webshop-joleitner` directory.

### Setup local environment

First of all, some local variables have to be defined for the database and the payment API.
There exists two `.env_example` files, one on project root level and one in the `backend` directory.
Copy both files and rename them to `.env`. Then, fill in the predefined variables with your own values.

'''bash
cp .env_example .env
'''

### Run the project

Afterwards, run the following command to install and start all containers:

```bash
docker-compose up
```

This will start the project and make it available at http://localhost:3000.

### Migrate database

To work with the database, we use Prisma. It is a modern ORM for Node.js and TypeScript.
To migrate the database, run the following command:

```bash
npx prisma migrate dev
```

## Admin

coming...
