#!/bin/bash

set -e
createdb venmo-scheduler
# create tables
psql --set=SCHEMA="public" -d venmo-scheduler < /home/postgres/seed/ddl.sql
