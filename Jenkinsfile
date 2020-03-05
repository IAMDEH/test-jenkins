pipeline {
  agent {
    kubernetes {
      label 'jenkins-slave'
      yaml """
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
  - name: tools
    image: argoproj/argo-cd-ci-builder:v0.13.1
    command:
    - cat
    tty: true    
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
"""
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

    stage('Promote to Staging') {
      environment {
        GIT_CREDS = credentials('git')
      }
      steps {
        container('tools') {
          sh "git clone https://$GIT_CREDS_USR:$GIT_CREDS_PSW@github.com/IAMDEH/test-jenkins-deploy.git"
          sh "git config --global user.email 'ci@ci.com'"

          dir("test-jenkins-deploy") {
            sh "cd ./e2e && kustomize edit set image 10.10.10.16:5000/test:${env.GIT_COMMIT}"
            sh "git commit -am 'Publish new version' && git push || echo 'no changes'"
          }
        }
      }
    }

    stage('Promote to Prod') {
      steps {
        input message:'Approve deployment?'
        container('tools') {
          dir("test-jenkins-deploy") {
            sh "cd ./prod && kustomize edit set image 10.10.10.16:5000/test:${env.GIT_COMMIT}"
            sh "git commit -am 'Publish new version' && git push || echo 'no changes'"
          }
        }
      }
    }
  }
}
