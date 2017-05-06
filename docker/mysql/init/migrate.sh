cd /docker-entrypoint-initdb.d/

if [ -f "./migrate.sql.gz" ]; then

  echo "import migrate.sql.gz..."

  zcat ./migrate.sql.gz | mysql -h localhost -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE

  echo "done."

fi
