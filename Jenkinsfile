pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ticket-booking-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_HUB_REPO = 'sam361/ticket-booking-app'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat "docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npm test"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat "docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%"
                    bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                    bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_HUB_REPO}:latest"
                    bat "docker push ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                    bat "docker push ${DOCKER_HUB_REPO}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                bat 'kubectl apply -f k8s/deployment.yaml'
                bat 'kubectl apply -f k8s/service.yaml'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            bat 'docker rmi %DOCKER_IMAGE%:%DOCKER_TAG% 2>nul || echo "Image cleanup failed"'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
