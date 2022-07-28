#!/bin/sh
ecrrepouri=$1

if [ -z "$ecrrepouri" ]
then
  echo "ERROR! ECR repo uri required: ./update.sh <ecr_repo_uri_here>"
  exit 1
fi

echo "running update for ECR repo uri: $ecrrepouri"
zappa save-python-settings-file api
docker build -t what-if-i-made:latest .
docker tag what-if-i-made:latest $ecrrepouri/what-if-i-made:latest
docker push $ecrrepouri/what-if-i-made:latest
zappa update api -d $ecrrepouri/what-if-i-made:latest