# Next.js Project in Docker

This project is set up to run a Next.js application within a Docker container.

## Prerequisites

Make sure you have Docker installed on your machine.

## Getting Started

1. Run the Docker container in development environment:

```bash
 docker-compose up
```

This command will start the Next.js development server inside the Docker container and map port 3000 of the container to port 3000 on your local machine.

For the build the Docker image:

```bash
 docker build -t nextjs_docker:dev .
```

This command will build the Docker image based on the Dockerfile in the project directory.

Run the Docker container:

   ```bash
    docker run --publish 3000:3000 nextjs_docker:dev
   ```

This command will start the Next.js server from Docker build Image and map it to port 3000.

Access the application

2. Once the container is running, open your web browser and navigate to [localhost](http://localhost:3000) to view the Next.js application.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Live Demo

[Live vercel link](https://news-app-git-master-assad-akrams-projects-237fffa6.vercel.app/)
