FROM php:7.1-fpm

RUN requirements="curl rsync mysql-client-5.5 libmcrypt-dev g++ pngtools pngquant optipng gifsicle libicu-dev libmcrypt4 libicu52 zlib1g-dev libfreetype6-dev libjpeg62-turbo-dev libpng12-dev autoconf automake libtool nasm make git" \
    && apt-get update && apt-get install -y $requirements \
    && docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
    && docker-php-ext-install pdo_mysql mysqli mcrypt mbstring intl json zip gd \
    && gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 \
    && curl -sSL https://get.rvm.io | bash -s latest \
    && echo "source /etc/profile.d/rvm.sh" >> /etc/bash.bashrc \
    && /bin/bash -c "source /etc/profile.d/rvm.sh && rvm install ruby --latest && gem install wordmove"

ENV RUBYOPT="-KU -E utf-8:utf-8"

RUN git clone --depth=1 -b v3.2 https://github.com/mozilla/mozjpeg.git \
    && cd mozjpeg \
    && autoreconf -fiv \
    && mkdir build \
    && cd build \
    && sh ../configure \
    && make install \
    && cd ../../ \
    && rm -rf mozjpeg \
    && apt-get remove -y --purge libjpeg62-turbo-dev \
    && ln -s /opt/mozjpeg/bin/* /usr/local/bin

RUN mkdir /root/.ssh
ADD id_rsa /root/.ssh
RUN chmod 600 /root/.ssh/id_rsa

CMD ["php-fpm"]
