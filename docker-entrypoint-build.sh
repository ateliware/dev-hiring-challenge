#!/bin/sh



# Get environment variables to show up in SSH session
eval $(printenv | awk -F= '{print "export " "\""$1"\"""=""\""$2"\"" }' >> /etc/profile)
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to get ENV variables: $status"
  exit $status
fi

_build/$MIX_ENV/rel/dev_challenge/bin/dev_challenge start
status=$?
if [ $status -ne 0 ]; then
  echo "Failed get deps: $status"
  exit $status
fi


