pipeline {
  agent {
    kubernetes {
      yaml """
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
    image: docker:18.09
    command:
    - cat
    tty: true
"""
    }
  }
  stages {

    stage('Build') {
      steps {
        container('docker') {
          // Build new image
          sh "until docker ps; do sleep 3; done && docker build -t 10.10.10.16:5000/test:${env.GIT_COMMIT} ."
          // Publish new image
          sh "docker push 10.10.10.16:5000/test:${env.GIT_COMMIT}"
        }
      }
    }
    
  }
}
