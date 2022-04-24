#!/bin/sh

# Start SSH
service ssh start
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start ssh: $status"
  exit $status
fi

# Get environment variables to show up in SSH session
eval $(printenv | awk -F= '{print "export " "\""$1"\"""=""\""$2"\"" }' >> /etc/profile)
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to get ENV variables: $status"
  exit $status
fi

