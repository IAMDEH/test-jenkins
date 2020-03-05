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
    image: docker:18.09
    command: ['cat']
    tty: true
    volumeMounts:
    - name: dockersock
      mountPath: /var/run/docker.sock
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
'''
    }
  }
  stages {

    stage('Build & Push') {
      steps {
        container('docker') {
          // Build new image
          sh "docker build -t 10.10.10.16:5000/test:${env.GIT_COMMIT} ."
          // Publish new image
          sh "docker push 10.10.10.16:5000/test:${env.GIT_COMMIT}"
        }
      }
    }
    
  }
}
