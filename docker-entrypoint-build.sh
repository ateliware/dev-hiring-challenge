#!/bin/sh

while read p; do
  export ${p}
done <.env

mix phx.server
status=$?
if [ $status -ne 0 ]; then
  echo "Failed start phx: $status"
  exit $status
fi


