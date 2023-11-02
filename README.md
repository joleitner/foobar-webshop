# FooBar Webshop

This project is demonstrating the successful implementation of a cloud-based webshop for the so called 'FooBar GmbH'.
It uses the latest version of Next.js 13 as the frontend, and Nest.js as the backend. Both are written in TypeScript.

The webshop was developed for a study project and got deployed on the kubernetes vcluster of the university of applied sciences Munich.

| **Technical requirement** | **Path / folder**                                                 |
| ------------------------- | ----------------------------------------------------------------- |
| Article list              | frontend/app/page.tsx                                             |
| Shopping cart             | frontend/app/cart/                                                |
| Checkout                  | frontend/app/checkout/                                            |
| Orders                    | frontend/app/orders/                                              |
| Docker                    | docker-compose.yml <br>frontend/Dockerfile <br>backend/Dockerfile |
| Payment interface         | backend/src/payment/payment.service.ts                            |
| Delivery interface        | backend/src/warehouse/warehouse.service.ts                        |
| Terraform                 | terraform/                                                        |
| Kubernetes deployment     | k8s/                                                              |

## Getting Started

To run the project locally, clone the repository and navigate into the `foobar-webshop` directory.

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

This will first build and then start the project and make it available at http://localhost:3000.

> **Note:** Because of the volume for development the node_modules could be missing.
> In this case, run `docker-compose run frontend npm install` and `docker-compose run backend npm install` to install the dependencies. They then will be mapped into your local project.

### Migrate database locally

To work with the database, we use Prisma. It is a modern ORM for Node.js and TypeScript.
To migrate the database, run the following command:

```bash
docker-compose exec backend npx prisma migrate dev
```

## Terraform AWS deployment

To create the infrastructure (SQS) on AWS, Terraform is used. The config file can be found in the `terraform` directory.
The SQS queue is used to receive all messages from the warehouse SNS via backend.

1. Terraform and AWS CLI need to be installed.
2. The AWS credentials need to be configured with the `aws configure` command.

Afterwards the SQS queue can be created with the following commands:

```bash
cd terraform
terraform init
terraform apply
```

The output sqs_queue_url needs to be copied into the backend `.env` file.

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
5. That the environment variables we defined in our `.env` files are availabe as secrets for the kubernetes cluster, a script got created:

```bash
./bin/create-k8s-secrets
```

6. To deploy the webshop, the following commands have to be executed:

```bash
cd k8s
# create in order of dependencies
kubectl apply -f pvc.yaml
kubectl apply -f db.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
```

## Admin

Admin panel is accessible at `/admin`. New articles can be created here.
