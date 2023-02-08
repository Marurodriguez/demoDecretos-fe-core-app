docker-compose down
docker-compose rm
docker image prune -a -f
ng build --prod --verbose
docker-compose up -d --build
