#!/bin/bash

APP_PORT=${PORT: -8000} 

echo "Aguardando pelo postgres..."
sleep 5
echo "Postgres iniciado"

echo "Migrando banco de dados..."
/opt/venv/bin/python manage.py makemigrations --noinput
/opt/venv/bin/python manage.py migrate --noinput
echo "Banco de dados migrado"

echo "Criando super usuário..."
/opt/venv/bin/python manage.py superuser || true
echo "Super usuário criado"

echo "Coletando arquivos estáticos..."
/opt/venv/bin/python manage.py collectstatic --noinput
echo "Arquivos estáticos coletados"

echo "Iniciando servidor..."
/opt/venv/bin/gunicorn backend.wsgi:application --bind "0.0.0.0 ${APP_PORT}" --workers 4

