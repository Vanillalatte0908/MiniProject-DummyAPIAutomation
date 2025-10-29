pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Setup Node.js') {
      steps {
        sh '''
          echo "Checking Node.js version..."
          node -v || (curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs)
          npm -v
        '''
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          echo "Installing project dependencies..."
          npm ci || npm install
        '''
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run API Test') {
      steps {
        echo 'Running specific test file with Playwright...'
        // 👇 Replace "test.js" with your actual file name
        sh 'npx playwright test --reporter=line'
      }
    }

    stage('Generate Report') {
      steps {
        sh 'npx playwright show-report || true'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
