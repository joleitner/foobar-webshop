# FooBar Webshop

### By 'joleitner'

This project is demonstrating the successful implementation of a cloud-based webshop for the so called 'FooBar GmbH'.
It uses the latest version of Next.js 13 as the frontend, and Nest.js as the backend. Both are written in TypeScript.

The webshop is deployed to the HM vcluster and is accessible at: https://jonasleitner-webshop.lab.kube.cs.hm.edu. (Inside the HM network)

| **Technical requirement** | **Path / folder**                                                 |
| ------------------------- | ----------------------------------------------------------------- |
| Article list              | frontend/app/page.tsx                                             |
| Shopping cart             | frontend/app/cart/                                                |
| Checkout                  | frontend/app/checkout/                                            |
| Orders                    | frontend/app/orders/                                              |
| Docker                    | docker-compose.yml <br>frontend/Dockerfile <br>backend/Dockerfile |
| Payment interface         | backend/src/payment/payment.service.ts                            |
| Delivery interface        | backend/src/warehouse/warehouse.service.ts                        |
| Kubernetes deployment     | k8s/                                                              |

## Getting Started

To run the project locally, clone the repository and navigate into the `webshop-joleitner` directory.

### Setup local environment

First of all, some local variables have to be defined for the database, the payment API, and the delivery interface.
There exists two `.env_example` files, one on project root level and one in the `backend` directory.
Copy both files and rename them to `.env`. Then, fill in the predefined variables with your own values.

```bash
cp .env_example .env
```

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
docker-compose exec backend npx prisma migrate dev
```

## Production deployment

To deploy the webshop to the HM vcluster, kubernetes is used. The config files can be found in the `k8s` directory.
The images for the frontend and the backend are pushed into the Gitlab registry.

1. First in the project settings an access token has to be created (and the container registry needs to be activated).
2. With this token you have to locally login to the registry

```bash
docker login gitlab.lrz.de:5005
```

3. Afterwords build and push the images for frontend and backend:

```bash
# example for frontend
cd frontend
docker build -t gitlab.lrz.de:5005/ebke-2023/cc/webshop-joleitner/frontend .
docker push gitlab.lrz.de:5005/ebke-2023/cc/webshop-joleitner/frontend
```

4. That the images can be accessed inside the vcluster, the imagePullSecret `regcred` got created like described [here](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).
5. Some other stuff with env and secrets.. (coming soon)
6. To deploy the webshop, the following commands have to be executed:

```bash
cd k8s
# create ConfigMap and Secret
kubectl apply -f config.yaml
kubectl apply -f secrets.yaml
# create in order of dependencies
kubectl apply -f db.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
```

The webshop is accessible at: https://jonasleitner-webshop.lab.kube.cs.hm.edu.

## Admin

coming...
