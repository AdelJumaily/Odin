# Odin Deployment Guide

This guide covers deploying Odin in two different environments:

1. **Vercel** - Cloud dashboard with PostgreSQL
2. **Docker** - Local desktop application with SQLite

## 🚀 Vercel Deployment (Cloud Dashboard)

### Prerequisites
- Vercel account
- PostgreSQL database (Neon, Supabase, or self-hosted)
- Vercel CLI installed (`npm install -g vercel`)

### Step 1: Prepare Database
1. Set up a PostgreSQL database
2. Run the cloud database migrations:
   ```bash
   psql -h your_host -p 5432 -U your_user -d your_db -f database/cloud/migrations/001_initial_schema.sql
   psql -h your_host -p 5432 -U your_user -d your_db -f database/cloud/migrations/002_fix_events_table.sql
   ```

### Step 2: Deploy to Vercel
```bash
# Option 1: Use the deployment script
npm run deploy:vercel

# Option 2: Manual deployment
vercel login
vercel --prod
```

### Step 3: Configure Environment Variables
In the Vercel dashboard, set these environment variables:

```bash
# Database Configuration
DATABASE_HOST=your_postgres_host
DATABASE_PORT=5432
DATABASE_NAME=odin_cloud
DATABASE_USER=your_postgres_user
DATABASE_PASSWORD=your_postgres_password
DATABASE_SSL=true
DATABASE_CONNECTION_LIMIT=20

# Application Settings
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Optional: File Storage
STORAGE_PROVIDER=s3
STORAGE_ENDPOINT=https://s3.amazonaws.com
STORAGE_BUCKET=odin-files
STORAGE_ACCESS_KEY=your_access_key
STORAGE_SECRET_KEY=your_secret_key
STORAGE_REGION=us-east-1

# Security
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
```

### Step 4: Verify Deployment
- Visit your Vercel URL
- Check health endpoint: `https://your-app.vercel.app/api/health`
- Test database connectivity

## 🐳 Docker Deployment (Desktop Application)

### Prerequisites
- Docker installed
- Docker Compose (optional)

### Step 1: Build and Run
```bash
# Option 1: Use the deployment script
npm run deploy:docker

# Option 2: Manual deployment
npm run docker:build
npm run docker:run
```

### Step 2: Using Docker Compose
```bash
# Run desktop application only
docker-compose up -d odin-desktop

# Run with development database
docker-compose --profile dev up -d
```

### Step 3: Verify Deployment
- Visit http://localhost:3000
- Check health endpoint: http://localhost:3000/api/health
- Verify SQLite database is created

## 🔧 Development Setup

### Local Development with Docker
```bash
# Start all services (app + postgres + redis)
docker-compose --profile dev up -d

# View logs
docker-compose logs -f odin-desktop

# Stop services
docker-compose down
```

### Environment Files
- `.env.local` - Local development
- `env.vercel` - Vercel deployment template
- `env.docker` - Docker deployment template

## 📊 Monitoring and Health Checks

### Health Endpoints
- **Vercel**: `https://your-app.vercel.app/api/health`
- **Docker**: `http://localhost:3000/api/health`

### Health Check Response
```json
{
  "success": true,
  "data": {
    "cloud": true,
    "local": true,
    "overall": true
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "vercel|docker"
}
```

## 🗄️ Database Management

### Cloud Database (PostgreSQL)
```bash
# Run migrations
npm run db:cloud:migrate

# Connect to database
psql -h your_host -p 5432 -U your_user -d your_db
```

### Local Database (SQLite)
```bash
# Database is automatically created in Docker
# Location: /app/data/odin_local.db (inside container)
# Location: ./data/odin_local.db (local development)
```

## 🔄 Data Synchronization

### Cloud to Local Sync
The desktop application can sync with the cloud database:

1. **Configure cloud endpoint** in environment variables
2. **Set up API keys** for authentication
3. **Enable auto-sync** in application settings

### Sync Configuration
```bash
# Docker environment
CLOUD_API_ENDPOINT=https://your-odin-app.vercel.app
CLOUD_API_KEY=your_api_key_here
AUTO_SYNC=true
SYNC_INTERVAL_MINUTES=5
```

## 🚨 Troubleshooting

### Common Issues

#### Vercel Deployment
- **Database connection failed**: Check environment variables
- **Build errors**: Ensure all dependencies are in package.json
- **Function timeout**: Increase timeout in vercel.json

#### Docker Deployment
- **Container won't start**: Check logs with `docker logs odin-desktop`
- **Database not found**: Ensure data volume is mounted
- **Port conflicts**: Change port mapping in docker-compose.yml

### Debug Commands
```bash
# Vercel
vercel logs
vercel env ls

# Docker
docker logs odin-desktop
docker exec -it odin-desktop sh
docker-compose logs -f
```

## 📦 Production Considerations

### Vercel (Cloud)
- Use a managed PostgreSQL service (Neon, Supabase)
- Set up proper CORS policies
- Configure rate limiting
- Set up monitoring and alerts
- Use CDN for static assets

### Docker (Desktop)
- Use multi-stage builds for smaller images
- Set up health checks
- Configure resource limits
- Use Docker secrets for sensitive data
- Set up automated updates

## 🔐 Security

### Environment Variables
- Never commit `.env` files
- Use Vercel's environment variable encryption
- Rotate secrets regularly
- Use different secrets for different environments

### Database Security
- Use SSL connections for PostgreSQL
- Implement proper authentication
- Set up firewall rules
- Regular security updates

## 📈 Scaling

### Vercel Scaling
- Vercel automatically scales serverless functions
- Consider database connection pooling
- Use Redis for caching if needed
- Monitor function execution times

### Docker Scaling
- Use Docker Swarm or Kubernetes for multiple instances
- Implement load balancing
- Set up database replication
- Monitor resource usage

## 🆘 Support

### Getting Help
1. Check the logs first
2. Verify environment variables
3. Test database connectivity
4. Check network connectivity
5. Review this documentation

### Useful Commands
```bash
# Health checks
npm run db:health
curl http://localhost:3000/api/health

# Docker management
docker ps
docker stats
docker system prune

# Vercel management
vercel ls
vercel env ls
vercel logs
```

This deployment setup provides a robust, scalable solution for both cloud and local deployments of the Odin security operations platform.
