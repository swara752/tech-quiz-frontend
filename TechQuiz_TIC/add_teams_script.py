import os
import django
import sys

# Setup Django environment
sys.path.append(os.getcwd()) # Ensure current directory is in path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from quiz.models import Team

teams = [
    {"name": "Manasvi Waghmare", "email": "manasviw43@gmail.com"},
    {"name": "Activ8*o", "email": "pranav.vasankar@gmail.com"},
    {'name': 'Manasvi Waghmare 2', 'email': 'waghmaremanasvi50@gmail.com'}
]

print("Adding/Updating Teams...")
for t in teams:
    try:
        team, created = Team.objects.get_or_create(
            email=t['email'], 
            defaults={'name': t['name']}
        )
        if created:
            print(f"  [CREATED] {team.name} ({team.email})")
        else:
            if team.name != t['name']:
                print(f"  [UPDATING] {team.name} -> {t['name']}")
                team.name = t['name']
                team.save()
            else:
                print(f"  [EXISTS] {team.name}")
    except Exception as e:
        print(f"  [ERROR] Could not add {t['name']}: {e}")

print("Done.")
