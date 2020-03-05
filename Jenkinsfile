pipeline {
  agent {
    kubernetes {
      label 'jenkins-slave'
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: iamdeh:docker-agent:v1
    securityContext:
      privileged: true
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
