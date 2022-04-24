#!/bin/sh



# Get environment variables to show up in SSH session
eval $(printenv | awk -F= '{print "export " "\""$1"\"""=""\""$2"\"" }' >> /etc/profile)
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to get ENV variables: $status"
  exit $status
fi

_build/$MIX_ENV/rel/api/bin/api start
status=$?
if [ $status -ne 0 ]; then
  echo "Failed get deps: $status"
  exit $status
fi


