FROM php:7.1-fpm

RUN requirements="libmcrypt-dev g++ libicu-dev libmcrypt4 libicu52 zlib1g-dev libfreetype6-dev libjpeg62-turbo-dev libpng12-dev git ruby" \
    && apt-get update && apt-get install -y $requirements \
    && docker-php-ext-install pdo_mysql mysqli mcrypt mbstring intl json zip gd opcache \
    && pecl install apcu \
    && gem install wordmove

CMD ["php-fpm"]
