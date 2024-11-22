from django.db import models
from django.utils import timezone


class BaseModelQuerySet(models.QuerySet):
    def delete(self):
        self.update(deleted_at=timezone.now(), is_active=False)


class BaseManager(models.Manager):
    def get_queryset(self):
        return BaseModelQuerySet(self.model, using=self._db).filter(deleted_at__isnull=True, is_active=True)


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(editable=False, blank=True, null=True)
    is_active = models.BooleanField(editable=False, default=True)

    objects = BaseManager()

    class Meta:
        abstract = True

    def delete(self, **kwargs):
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()

    def hard_delete(self, **kwargs):
        super(BaseModel, self).delete(**kwargs)
