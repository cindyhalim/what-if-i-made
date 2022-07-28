FROM lambci/lambda:build-python3.8
FROM umihico/aws-lambda-selenium-python:latest

ARG FUNCTION_DIR="/var/task/"

COPY ./ ${FUNCTION_DIR}

RUN pip install Django djangorestframework django-cors-headers webdriver-manager zappa selenium

RUN ZAPPA_HANDLER_PATH=$( \
    python -c "from zappa import handler; print (handler.__file__)" \
    ) \
    && echo $ZAPPA_HANDLER_PATH \
    && cp $ZAPPA_HANDLER_PATH ./

CMD [ "handler.lambda_handler" ]