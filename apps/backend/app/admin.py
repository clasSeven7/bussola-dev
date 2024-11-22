from django.contrib import admin

from .models import User, Project, Portfolio, Recommendation, Assessment

admin.site.register(User)
admin.site.register(Project)
admin.site.register(Portfolio)
admin.site.register(Recommendation)
admin.site.register(Assessment)
