#!/bin/bash

set -e
createdb venmo-scheduler
# create tables
psql -d venmo-scheduler < /home/postgres/seed/ddl.sql
