@echo off
REM Script de instalación rápida para JorghitoTech
REM Ejecutar como Administrador

echo ======================================
echo JorghitoTech - Setup Inicial
echo ======================================

REM Backend
echo.
echo [1/4] Instalando dependencias del Backend...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt

REM Frontend
echo.
echo [2/4] Instalando dependencias del Frontend...
cd ..\frontend
call npm install

REM Base de datos
echo.
echo [3/4] Configurando base de datos...
cd ..\backend
call venv\Scripts\activate.bat
python manage.py migrate
python manage.py createsuperuser

REM Completado
echo.
echo [4/4] ¡Instalación completada!
echo.
echo Para iniciar el proyecto:
echo - Backend: cd backend ^& venv\Scripts\activate.bat ^& python manage.py runserver
echo - Frontend: cd frontend ^& npm run dev
echo.
pause
