import pandas as pd
from django.core.management.base import BaseCommand
from django.db import transaction
from api.models import Livro

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--arquivo', default='population/livros.csv')
        parser.add_argument('--truncate', action='store_true')
        parser.add_argument('--update', action='store_true')

    @transaction.atomic
    def handle(self, *a, **o):
        df = pd.read_csv(o['arquivo'], encoding='utf-8-sig')
        df.columns = [c.strip().lower().lstrip("\ufeff") for c in df.columns]

        if o['truncate']: Livro.objects.all().delete()

        df['titulo'] = df['titulo'].astype(str).str.strip()
        df['subtitulo'] = df['subtitulo'].astype(str).str.strip()
        df['autor'] = df['autor'].astype(str).str.strip()
        df['editora'] = df['editora'].astype(str).str.strip()
        df['isbn'] = df['isbn'].astype(str).str.strip()
