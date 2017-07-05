#!/usr/bin/env groovy

pipeline {
    agent any
    tools {
        nodejs 'Node 7.x'
    }
    stages {
        stage('Build') {
            steps {
                sh 'node --version'
                sh 'npm install'
                sh 'node lint'
            }
        }
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'node test'
            }
        }
    }
    post {
        always {
            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
        success {
            echo 'I succeeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }
}
