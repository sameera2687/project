pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ticket-booking-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_HUB_REPO = 'sushmithamittapally13/ticket-booking-app'
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
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    dockerImage.inside {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        dockerImage.push("${DOCKER_TAG}")
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                script {
                    bat 'kubectl apply -f k8s/deployment.yaml'
                    bat 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            bat 'docker rmi %DOCKER_IMAGE%:%DOCKER_TAG% || echo "Image cleanup failed"'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
