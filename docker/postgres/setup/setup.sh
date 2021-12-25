#!/bin/bash

set -e
createdb venmo-scheduler
psql -d venmo-scheduler < /home/postgres/seed/ddl.sql
