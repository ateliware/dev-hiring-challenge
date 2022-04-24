#!/bin/sh


_build/$MIX_ENV/rel/dev_challenge/bin/dev_challenge start
status=$?
if [ $status -ne 0 ]; then
  echo "Failed get deps: $status"
  exit $status
fi
mix phx.server
status=$?
if [ $status -ne 0 ]; then
  echo "Failed start phx: $status"
  exit $status
fi


