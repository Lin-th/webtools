#!/bin/bash

# Recreate config file
rm -rf ./env-override.js
touch ./env-override.js

# Add assignment 
echo "window.__env__ = {" >> ./env-override.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s' "$line" | sed -e 's/^[^=]*=//' | tr -d '\r\n')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-override.js
done < .env.template

echo "}" >> ./env-override.js