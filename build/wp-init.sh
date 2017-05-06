WP_LANG="ja"
WP_VERSION=$(curl -s https://api.github.com/repos/WordPress/WordPress/tags | grep -m 1 -o -E '[0-9\.]+')
WP_ARCHIVE_FILE="wordpress-${WP_VERSION}-${WP_LANG}.tar.gz"
WP_ARCHIVE_URL="https://${WP-LANG}.wordpress.org/${WP_ARCHIVE_FILE}"
NPM_ROOT=$(npm root)

if [ ! -f $WP_ARCHIVE_FILE ]; then
  curl -LOk $WP_ARCHIVE_URL
fi

tar -zxf $WP_ARCHIVE_FILE

mkdir -p "${NPM_ROOT}/../public/"
mv wordpress "${NPM_ROOT}/../public/wp"
rm $WP_ARCHIVE_FILE
cd "${NPM_ROOT}/../public"
curl -LOk https://gist.githubusercontent.com/yutahaga/4252499dc9a4ec9a852a9ffba9f0a7c9/raw/743feb695fd46bbc7f0bf9e909590a4c4e0c1aaa/index.php
curl -LOk https://gist.githubusercontent.com/yutahaga/e7aca086cdd17dd3d09d8f0a351678fe/raw/a32df1049b8452ba46387731ea134c22cebd4402/.htaccess

cd wp
curl -LOk https://gist.githubusercontent.com/yutahaga/876694008af33482d7c057d8e677432f/raw/0b996b47ed04ce6286ad5727735d93c07c1608d0/wp-config.php
rm wp-config-sample.php
