pipeline {
  agent any

  environment {
    NODE_VERSION = '18'
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Cloning repository...'
        checkout scm
      }
    }

    stage('Install Node.js') {
      steps {
        echo "Using Node.js version ${NODE_VERSION}"
        sh '''
          # Install Node if not available
          if ! command -v node &> /dev/null; then
            curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
            apt-get install -y nodejs
          fi
          node -v
          npm -v
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm ci || npm install'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        echo 'Installing Playwright browsers...'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        echo 'Running Playwright tests...'
        sh 'npx playwright test --reporter=line'
      }
    }

    stage('Publish Report') {
      steps {
        echo 'Generating Playwright HTML report...'
        sh 'npx playwright show-report || true'
      }
    }
  }

  post {
    always {
      echo 'Archiving test reports...'
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
    failure {
      echo 'Build failed — check logs or reports.'
    }
    success {
      echo '✅ All tests passed!'
    }
  }
}
