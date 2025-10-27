# Ticket Booking Application - DevOps Pipeline

This project demonstrates a complete DevOps pipeline for a Node.js ticket booking application using Git, Docker, Jenkins, and Kubernetes.

## Overview

The application is a simple web-based ticket booking system built with Express.js and EJS templating. It allows users to book tickets for events by providing their name, email, number of tickets, and selecting an event.

## Architecture

- **Frontend**: EJS templates with CSS styling
- **Backend**: Node.js with Express.js
- **Database**: None (in-memory for demo purposes)
- **Containerization**: Docker
- **CI/CD**: Jenkins
- **Orchestration**: Kubernetes

## Prerequisites

- Node.js (v16 or higher)
- Docker
- Git
- Jenkins
- Kubernetes cluster (Minikube for local development)
- kubectl

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sameera2687/project.git
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## GitFlow Branching Strategy

This project uses GitFlow for version control:

- `master`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- `release/*`: Release branches
- `hotfix/*`: Hotfix branches

### GitFlow Commands

1. Initialize GitFlow:
   ```bash
   git flow init
   ```

2. Start a new feature:
   ```bash
   git flow feature start <feature-name>
   ```

3. Finish a feature:
   ```bash
   git flow feature finish <feature-name>
   ```

4. Start a release:
   ```bash
   git flow release start <version>
   ```

5. Finish a release:
   ```bash
   git flow release finish <version>
   ```

## Containerization with Docker

### Build Docker Image

```bash
docker build -t ticket-booking-app .
```

### Run Container Locally

```bash
docker run -d -p 3000:3000 --name ticket-booking-container ticket-booking-app
```

### Test Container

```bash
docker ps
curl http://localhost:3000
```

## CI/CD with Jenkins

### Jenkins Setup

1. Install Jenkins on your system or use a Docker container:
   ```bash
   docker run -d -p 8080:8080 -p 50000:50000 --name jenkins jenkins/jenkins:lts
   ```

2. Access Jenkins at `http://localhost:8080`

3. Install required plugins:
   - Docker Pipeline
   - Kubernetes CLI
   - Git

4. Configure credentials:
   - Docker Hub credentials
   - Git repository credentials

### Jenkins Pipeline

The `Jenkinsfile` defines the following stages:

1. **Checkout**: Clone the repository
2. **Build Docker Image**: Build the Docker image
3. **Test**: Run application tests inside the container
4. **Push to Docker Hub**: Push the image to Docker Hub
5. **Deploy to Kubernetes**: Deploy to Kubernetes cluster

### Pipeline Configuration

1. Create a new pipeline job in Jenkins
2. Configure SCM to point to your Git repository
3. Set up webhooks for automatic triggering on Git pushes
4. Configure build triggers for automatic pipeline execution

## Kubernetes Deployment

### Prerequisites

1. Install Minikube:
   ```bash
   # For Windows
   choco install minikube
   ```

2. Start Minikube:
   ```bash
   minikube start
   ```

3. Enable ingress (optional):
   ```bash
   minikube addons enable ingress
   ```

### Deploy to Kubernetes

1. Update the Docker image in `k8s/deployment.yaml` with your Docker Hub username

2. Apply the manifests:
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

3. Check deployment status:
   ```bash
   kubectl get pods
   kubectl get services
   ```

4. Access the application:
   ```bash
   minikube service ticket-booking-service
   ```

### Scaling

Scale the application by updating the replica count:

```bash
kubectl scale deployment ticket-booking-app --replicas=5
```

## Pipeline Screenshots

Screenshots are not included in this repository. Below are descriptions of the expected outputs:

### Application Screenshot
The application interface displays a form for booking tickets with fields for name, email, event, and number of tickets.

### Jenkins Pipeline Stages

1. **Checkout Stage**: Displays "Checking out code..." and successful checkout message.

2. **Build Stage**: Shows "Building Docker image..." and successful build output.

3. **Test Stage**: Indicates "Running tests..." and test results (npm test output).

4. **Push Stage**: Logs "Pushing image to Docker Hub..." and push confirmation.

5. **Deploy Stage**: Outputs "Deploying to Kubernetes..." and deployment status.

### Docker Build
Console output showing successful Docker build with layers and final image creation.

### Kubernetes Deployment
- kubectl get pods: Shows 3 running pods for ticket-booking-app.
- kubectl get services: Displays LoadBalancer service with external IP.

## Monitoring and Logging

### Application Logs

```bash
kubectl logs -f deployment/ticket-booking-app
```

### Kubernetes Dashboard

```bash
minikube dashboard
```

## Troubleshooting

### Common Issues

1. **Jenkins Pipeline Fails**: Check Jenkins logs and ensure all credentials are configured correctly.

2. **Docker Build Fails**: Verify Dockerfile syntax and ensure all dependencies are available.

3. **Kubernetes Deployment Fails**: Check pod status with `kubectl describe pod <pod-name>` and ensure image is accessible.

4. **Application Not Accessible**: Verify service configuration and port mappings.

### Useful Commands

- Check pod status: `kubectl get pods`
- Check service status: `kubectl get services`
- View logs: `kubectl logs <pod-name>`
- Describe resource: `kubectl describe <resource-type> <resource-name>`
- Delete resources: `kubectl delete -f k8s/`

## Contributing

1. Fork the repository
2. Create a feature branch: `git flow feature start <feature-name>`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature/<feature-name>`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
