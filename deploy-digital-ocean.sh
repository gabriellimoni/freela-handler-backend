# Clone repo
git clone https://github.com/gabriellimoni/freela-handler-backend freela-backend
cd freela-backend

# You must have a docker-compose.prd.yaml file in the
# /etc/freela-backend/docker-compose.prd.yaml
cp /etc/freela-backend/docker-compose.prd.yaml .

# Stop and remove all containers
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

# Start MongoDB
docker-compose -f docker-compose.prd.yaml up -d mongodb
# Build and start API
docker-compose -f docker-compose.prd.yaml up -d --build api
