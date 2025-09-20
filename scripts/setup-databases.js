#!/usr/bin/env node

/**
 * Database setup script for Odin platform
 * Sets up both cloud (PostgreSQL) and local (SQLite) databases
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  cloud: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || '5432',
    database: process.env.DATABASE_NAME || 'odin_cloud',
    username: process.env.DATABASE_USER || 'odin_user',
    password: process.env.DATABASE_PASSWORD || '',
  },
  local: {
    path: process.env.LOCAL_DATABASE_PATH || './data/odin_local.db',
  }
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, description) {
  try {
    log(`\n${colors.cyan}${description}...${colors.reset}`);
    execSync(command, { stdio: 'inherit' });
    log(`${colors.green}✓ ${description} completed${colors.reset}`);
  } catch (error) {
    log(`${colors.red}✗ ${description} failed: ${error.message}${colors.reset}`);
    throw error;
  }
}

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Created directory: ${dirPath}`, 'green');
  }
}

function setupCloudDatabase() {
  log('\n' + '='.repeat(50), 'blue');
  log('Setting up Cloud Database (PostgreSQL)', 'bright');
  log('='.repeat(50), 'blue');

  // Check if PostgreSQL is available
  try {
    execCommand('psql --version', 'Checking PostgreSQL installation');
  } catch (error) {
    log('PostgreSQL is not installed or not in PATH', 'red');
    log('Please install PostgreSQL and ensure psql is available', 'yellow');
    return false;
  }

  // Create database if it doesn't exist
  const createDbCommand = `psql -h ${config.cloud.host} -p ${config.cloud.port} -U ${config.cloud.username} -c "CREATE DATABASE ${config.cloud.database};" 2>/dev/null || true`;
  execCommand(createDbCommand, 'Creating database (if not exists)');

  // Run migrations
  const migrationFile = path.join(__dirname, '..', 'database', 'cloud', 'migrations', '001_initial_schema.sql');
  if (fs.existsSync(migrationFile)) {
    const migrationCommand = `psql -h ${config.cloud.host} -p ${config.cloud.port} -U ${config.cloud.username} -d ${config.cloud.database} -f "${migrationFile}"`;
    execCommand(migrationCommand, 'Running cloud database migrations');
  } else {
    log('Migration file not found, skipping cloud database setup', 'yellow');
    return false;
  }

  return true;
}

function setupLocalDatabase() {
  log('\n' + '='.repeat(50), 'blue');
  log('Setting up Local Database (SQLite)', 'bright');
  log('='.repeat(50), 'blue');

  // Create data directory
  const dataDir = path.dirname(config.local.path);
  createDirectory(dataDir);

  // Check if better-sqlite3 is available
  try {
    require('better-sqlite3');
  } catch (error) {
    log('better-sqlite3 is not installed', 'red');
    log('Installing better-sqlite3...', 'yellow');
    execCommand('npm install better-sqlite3', 'Installing better-sqlite3');
  }

  // Run migrations
  const migrationFile = path.join(__dirname, '..', 'database', 'local', 'migrations', '001_initial_schema.sql');
  if (fs.existsSync(migrationFile)) {
    const Database = require('better-sqlite3');
    const db = new Database(config.local.path);
    
    try {
      const migrationSQL = fs.readFileSync(migrationFile, 'utf8');
      db.exec(migrationSQL);
      log('Local database schema created successfully', 'green');
    } catch (error) {
      log(`Error creating local database: ${error.message}`, 'red');
      return false;
    } finally {
      db.close();
    }
  } else {
    log('Migration file not found, skipping local database setup', 'yellow');
    return false;
  }

  return true;
}

function createEnvironmentFile() {
  log('\n' + '='.repeat(50), 'blue');
  log('Creating Environment Configuration', 'bright');
  log('='.repeat(50), 'blue');

  const envContent = `# Odin Database Configuration

# Cloud Database (PostgreSQL)
DATABASE_HOST=${config.cloud.host}
DATABASE_PORT=${config.cloud.port}
DATABASE_NAME=${config.cloud.database}
DATABASE_USER=${config.cloud.username}
DATABASE_PASSWORD=${config.cloud.password}
DATABASE_SSL=false
DATABASE_CONNECTION_LIMIT=20

# Local Database (SQLite)
LOCAL_DATABASE_PATH=${config.local.path}
LOCAL_DATABASE_WAL=true
LOCAL_DATABASE_FOREIGN_KEYS=true

# Application Settings
NODE_ENV=development
PORT=3000
`;

  const envPath = path.join(__dirname, '..', '.env.local');
  fs.writeFileSync(envPath, envContent);
  log(`Environment file created: ${envPath}`, 'green');
}

function createPackageJsonScripts() {
  log('\n' + '='.repeat(50), 'blue');
  log('Adding Database Scripts to package.json', 'bright');
  log('='.repeat(50), 'blue');

  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Add database scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'db:setup': 'node scripts/setup-databases.js',
    'db:cloud:migrate': 'psql -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USER -d $DATABASE_NAME -f database/cloud/migrations/001_initial_schema.sql',
    'db:local:migrate': 'node -e "const Database = require(\'better-sqlite3\'); const db = new Database(process.env.LOCAL_DATABASE_PATH); const fs = require(\'fs\'); db.exec(fs.readFileSync(\'database/local/migrations/001_initial_schema.sql\', \'utf8\')); db.close();"',
    'db:health': 'node -e "const { checkDatabaseHealth } = require(\'./src/lib/database\'); checkDatabaseHealth().then(console.log);"'
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  log('Database scripts added to package.json', 'green');
}

function main() {
  log('🚀 Odin Database Setup', 'bright');
  log('Setting up both cloud and local databases...', 'cyan');

  let cloudSuccess = false;
  let localSuccess = false;

  try {
    // Setup cloud database
    cloudSuccess = setupCloudDatabase();
  } catch (error) {
    log(`Cloud database setup failed: ${error.message}`, 'red');
  }

  try {
    // Setup local database
    localSuccess = setupLocalDatabase();
  } catch (error) {
    log(`Local database setup failed: ${error.message}`, 'red');
  }

  // Create configuration files
  createEnvironmentFile();
  createPackageJsonScripts();

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  log('Setup Summary', 'bright');
  log('='.repeat(50), 'blue');
  
  if (cloudSuccess) {
    log('✓ Cloud Database (PostgreSQL): Ready', 'green');
  } else {
    log('✗ Cloud Database (PostgreSQL): Failed', 'red');
  }
  
  if (localSuccess) {
    log('✓ Local Database (SQLite): Ready', 'green');
  } else {
    log('✗ Local Database (SQLite): Failed', 'red');
  }

  log('\nNext steps:', 'yellow');
  log('1. Update .env.local with your actual database credentials', 'cyan');
  log('2. Run: npm run db:health to verify database connections', 'cyan');
  log('3. Start your application: npm run dev', 'cyan');

  if (!cloudSuccess || !localSuccess) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { setupCloudDatabase, setupLocalDatabase };
