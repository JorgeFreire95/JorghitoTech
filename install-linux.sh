#!/bin/bash

# Script de instalación rápida para JorghitoTech
# Para macOS/Linux

echo "======================================"
echo "JorghitoTech - Setup Inicial"
echo "======================================"

# Backend
echo ""
echo "[1/4] Instalando dependencias del Backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
echo ""
echo "[2/4] Instalando dependencias del Frontend..."
cd ../frontend
npm install

# Base de datos
echo ""
echo "[3/4] Configurando base de datos..."
cd ../backend
source venv/bin/activate
python manage.py migrate
python manage.py createsuperuser

# Completado
echo ""
echo "[4/4] ¡Instalación completada!"
echo ""
echo "Para iniciar el proyecto:"
echo "- Backend: cd backend && source venv/bin/activate && python manage.py runserver"
echo "- Frontend: cd frontend && npm run dev"
echo ""
