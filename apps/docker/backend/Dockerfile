# 3.12.3

FROM  python:3.12-slim

WORKDIR /apps/backend

COPY ./apps/backend .

RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt && \
    chmod +x /apps/backend/entrypoint.sh

CMD [ "/apps/backend/entrypoint.sh" ]

