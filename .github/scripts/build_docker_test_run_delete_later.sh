#!/bin/bash
DOCKER_IMAGE="asksenacor-frontend-nextjs"
DOCKER_TAG="SNAPSHOT"
DOCKER_FILE="docker/Dockerfile-nextjs"

echo "Building image $DOCKER_IMAGE with tag $DOCKER_TAG from $DOCKER_FILE with args $DOCKER_BUILD_ARGS"

RESOLVED_DOCKER_BUILD_ARGS=`for arg in $(echo $DOCKER_BUILD_ARGS | tr "," " "); do echo -n " --build-arg=$arg"; done`




docker build -t $DOCKER_IMAGE:$DOCKER_TAG -f $DOCKER_FILE $RESOLVED_DOCKER_BUILD_ARGS .
