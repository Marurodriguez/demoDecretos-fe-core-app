docker-compose down
docker-compose rm
docker image prune -a -f
npm run ng build
docker-compose up -d --build
