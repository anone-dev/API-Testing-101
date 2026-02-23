import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export class DatabaseHelper {
  private dbHost: string;
  private dbUser: string;
  private dbPassword: string;
  private dbName: string;

  constructor() {
    this.dbHost = process.env.DB_HOST || 'localhost';
    this.dbUser = process.env.DB_USER || 'root';
    this.dbPassword = process.env.DB_PASSWORD || '';
    this.dbName = process.env.DB_NAME || 'testdb';
  }

  async executeSqlFile(sqlFilePath: string) {
    const fullPath = path.resolve(__dirname, '..', sqlFilePath);
    const sqlContent = fs.readFileSync(fullPath, 'utf8');
    
    // Example for MySQL
    const command = `mysql -h ${this.dbHost} -u ${this.dbUser} -p${this.dbPassword} ${this.dbName} < ${fullPath}`;
    
    try {
      execSync(command, { stdio: 'inherit' });
      console.log(`✓ Executed SQL file: ${sqlFilePath}`);
    } catch (error) {
      console.error(`✗ Failed to execute SQL file: ${sqlFilePath}`, error);
      throw error;
    }
  }

  async setupDatabase(env: string = 'sit') {
    await this.executeSqlFile(`db-scripts/setup.${env}.sql`);
  }

  async cleanupDatabase() {
    await this.executeSqlFile('db-scripts/cleanup.sql');
  }
}
