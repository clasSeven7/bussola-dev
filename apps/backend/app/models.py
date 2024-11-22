from django.db import models
from softdelete.models import BaseModel


class User(BaseModel):
    TYPE_CHOICES = (
        ('Desenvolvedor', 'Desenvolvedor'),
        ('Recrutador', 'Recrutador'),
    )
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)
    icon = models.ImageField(upload_to='icon/', null=True, blank=True)
    typename = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES,
        default='Desenvolvedor'
    )

    def __str__(self):
        return self.name


class Project(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='project/', null=True, blank=True)
    technologies = models.JSONField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='projects'
    )

    def __str__(self):
        return self.title


class Portfolio(BaseModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='portfolio'
    )
    projects = models.ManyToManyField(Project, related_name='portfolios')
    image = models.ImageField(upload_to='portfolio/', null=True, blank=True)

    def __str__(self):
        return self.user.name


class Recommendation(BaseModel):
    TYPE_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Fullstack', 'Fullstack'),
        ('DevOps', 'DevOps'),
        ('Data Science', 'Data Science'),
    ]
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='recommendations'
    )
    technologie = models.CharField(max_length=200)
    typename = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES,
        default='Frontend'
    )

    def __str__(self):
        return self.user.name


class Assessment(BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='assessments'
    )
    technologie = models.CharField(max_length=200)
    note = models.FloatField()
    comment = models.TextField()

    def __str__(self):
        return self.user.name
