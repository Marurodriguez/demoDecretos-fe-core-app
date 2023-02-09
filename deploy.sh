git add *
git stash
git reset --hard
git pull

docker-compose down
docker-compose rm
docker image prune -a -f
docker-compose up -d --build
