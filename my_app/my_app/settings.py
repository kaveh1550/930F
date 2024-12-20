# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'sql_server.pyodbc',
        'NAME': 'my_database',
        'USER': 'rah',
        'PASSWORD': '123',
        'HOST': 'DESKTOP-IVK08VE\SQLEXPRESS',
        'PORT': '',  # Leave blank for default
        'OPTIONS': {
            'driver': 'ODBC Driver 17 for SQL Server',  # Ensure this is installed
            'extra_params': 'TrustServerCertificate=yes;',
        },
    },
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'consultation',  # Add your app here
]
