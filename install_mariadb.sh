sudo apt install -y software-properties-common
sudo apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
sudo add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://mariadb.mirror.liquidtelecom.com/repo/10.6/ubuntu focal main'
sudo apt update && sudo apt install -y mariadb-server mariadb-client
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
sudo mariadb -u root -p

#CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'secret_password';
#GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'localhost';
#FLUSH PRIVILEGES;
#EXIT;
