from django.test import TestCase
from .models import User, Project, Portfolio, Recommendation, Assessment


class CRUDTest(TestCase):

    def setUp(self):
        # Criando um usuário inicial
        self.user = User.objects.create(
            name="Lucas Backend",
            email="lucas.backend@example.com",
            password="12345678",
            typename="Desenvolvedor"
        )

    # User CRUD
    def test_create_user(self):
        user = User.objects.create(
            name="Novo Dev",
            email="novo.dev@example.com",
            password="senha123",
            typename="Desenvolvedor"
        )
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(user.name, "Novo Dev")

    def test_update_user(self):
        self.user.name = "Lucas Atualizado"
        self.user.save()
        updated_user = User.objects.get(id=self.user.id)
        self.assertEqual(updated_user.name, "Lucas Atualizado")

    def test_read_user(self):
        user = User.objects.get(id=self.user.id)
        self.assertEqual(user.name, "Lucas Backend")

    def test_delete_user(self):
        self.user.delete()
        self.assertEqual(User.objects.count(), 0)

    # Project CRUD
    def test_create_project(self):
        project = Project.objects.create(
            title="Projeto Bússola Dev",
            description="Um projeto incrível para desenvolvedores!",
            technologies={"frontend": ["React"], "backend": ["Django"]},
            user=self.user
        )
        self.assertEqual(Project.objects.count(), 1)
        self.assertEqual(project.title, "Projeto Bússola Dev")

    def test_update_project(self):
        project = Project.objects.create(
            title="Projeto Inicial",
            description="Descrição inicial",
            technologies={"frontend": ["Vue.js"], "backend": ["Flask"]},
            user=self.user
        )
        project.title = "Projeto Final"
        project.save()
        updated_project = Project.objects.get(id=project.id)
        self.assertEqual(updated_project.title, "Projeto Final")

    def test_delete_project(self):
        project = Project.objects.create(
            title="Projeto Excluído",
            description="Para ser deletado",
            technologies={"frontend": ["React"], "backend": ["Node.js"]},
            user=self.user
        )
        project.delete()
        self.assertEqual(Project.objects.count(), 0)

    # Portfolio CRUD
    def test_create_portfolio(self):
        portfolio = Portfolio.objects.create(user=self.user)
        self.assertEqual(Portfolio.objects.count(), 1)
        self.assertEqual(portfolio.user.name, "Lucas Backend")

    def test_update_portfolio(self):
        portfolio = Portfolio.objects.create(user=self.user)
        portfolio.image = "portfolio/updated_image.png"
        portfolio.save()
        updated_portfolio = Portfolio.objects.get(id=portfolio.id)
        self.assertEqual(updated_portfolio.image, "portfolio/updated_image.png")

    def test_delete_portfolio(self):
        portfolio = Portfolio.objects.create(user=self.user)
        portfolio.delete()
        self.assertEqual(Portfolio.objects.count(), 0)

    # Recommendation CRUD
    def test_create_recommendation(self):
        recommendation = Recommendation.objects.create(
            user=self.user,
            technologie="Django",
            typename="Backend"
        )
        self.assertEqual(Recommendation.objects.count(), 1)
        self.assertEqual(recommendation.technologie, "Django")

    def test_update_recommendation(self):
        recommendation = Recommendation.objects.create(
            user=self.user,
            technologie="React",
            typename="Frontend"
        )
        recommendation.technologie = "Vue.js"
        recommendation.save()
        updated_recommendation = Recommendation.objects.get(id=recommendation.id)
        self.assertEqual(updated_recommendation.technologie, "Vue.js")

    def test_delete_recommendation(self):
        recommendation = Recommendation.objects.create(
            user=self.user,
            technologie="Node.js",
            typename="Backend"
        )
        recommendation.delete()
        self.assertEqual(Recommendation.objects.count(), 0)

    # Assessment CRUD
    def test_create_assessment(self):
        assessment = Assessment.objects.create(
            user=self.user,
            technologie="Python",
            note=9.5,
            comment="Ótima linguagem"
        )
        self.assertEqual(Assessment.objects.count(), 1)
        self.assertEqual(assessment.note, 9.5)

    def test_update_assessment(self):
        assessment = Assessment.objects.create(
            user=self.user,
            technologie="Java",
            note=7.0,
            comment="Boa, mas verbosa"
        )
        assessment.note = 8.5
        assessment.save()
        updated_assessment = Assessment.objects.get(id=assessment.id)
        self.assertEqual(updated_assessment.note, 8.5)

    def test_delete_assessment(self):
        assessment = Assessment.objects.create(
            user=self.user,
            technologie="C#",
            note=8.0,
            comment="Muito útil para games"
        )
        assessment.delete()
        self.assertEqual(Assessment.objects.count(), 0)
