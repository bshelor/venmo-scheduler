FROM postgres:11.5-alpine

# ENV PGCONF=/home/config/postgresql.conf
# ENV PGDATA=./postgres/data:/var/lib/postgresql/data

COPY db/ddl/*.sql /home/postgres/seed/
COPY docker/postgres/setup/* /docker-entrypoint-initdb.d/
# COPY docker/postgres/config/postgresql.conf /home/config/

ENV TZ=US/Eastern

CMD ["postgres"]
