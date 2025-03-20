#!/bin/bash

docker logout $DOCKER_CONTAINER_REGISTRY
echo "Logging into container registry $DOCKER_CONTAINER_REGISTRY"

# login in with stashed secrets or CLI
if [ -n "${DOCKER_LOGIN_NAME}" ] && [ -n "${DOCKER_LOGIN_PASSWORD}" ];
then
    echo "Credentials provided, logging in to docker..."
    # avoid having the password show up in logs or shell history
    echo $DOCKER_LOGIN_PASSWORD | docker login  $DOCKER_CONTAINER_REGISTRY --username $DOCKER_LOGIN_NAME --password-stdin
else
    echo "No credentials provided, continuing with CLI login..."
    docker login $DOCKER_CONTAINER_REGISTRY
fi

# tag and push image
docker tag $DOCKER_IMAGE:$DOCKER_TAG $DOCKER_CONTAINER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG
docker push $DOCKER_CONTAINER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG