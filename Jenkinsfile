pipeline {
  agent {
    kubernetes {
      label 'jenkins-slave'
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: dind
    image: docker:18.09-dind
    securityContext:
      privileged: true
  - name: docker
    env:
    - name: DOCKER_HOST
      value: 127.0.0.1
    - name: DOCKER_OPTS
      value: --insecure-registry="10.10.10.16:5000"
    image: docker:18.09
    command:
    - cat
    tty: true
'''
    }
  }
  stages {

    stage('Build & Push') {
      steps {
        container('docker') {
          // Build new imagee
          sh "docker build -t 10.10.10.16:5000/test:${env.GIT_COMMIT} ."
          // Publish new image
          sh "docker push 10.10.10.16:5000/test:${env.GIT_COMMIT}"
        }
      }
    }
    
  }
}
