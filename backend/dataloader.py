import argparse
from pathlib import Path
from typing import TYPE_CHECKING

from common.factories import Factory
from common.models import Model
from common.utils import get_all_subclasses
from database.local_session import session
from users.factories import UserFactory

if TYPE_CHECKING:
    from sqlmodel import SQLModel


def import_factories() -> None:
    root_dir = Path(__file__).parent
    for module in root_dir.rglob('factories.py'):
        module_parts = module.relative_to(root_dir).with_suffix('').parts
        module_path = '.'.join(module_parts)
        __import__(module_path, locals(), globals())


class DataLoader:
    @property
    def factories(self) -> list[type[Factory]]:
        return get_all_subclasses(Factory)

    def build(self, factory_class: type[Factory]) -> Model:
        instance = factory_class.build()
        model: SQLModel = factory_class.__model__
        for field_key, field_value in model.__fields__.items():
            if getattr(field_value.field_info, 'foreign_key', None):
                related_model = field_value.field_info.foreign_key.split('.')[0]
                related_factory = next(
                    filter(
                        lambda x: x.__name__.removesuffix('Factory').lower()
                        == related_model,
                        self.factories,
                    ),
                )
                related_instance = self.build(related_factory)
                setattr(instance, field_key, related_instance.id)
                session.add(related_instance)
                session.commit()
        session.add(instance)
        session.commit()

        return instance

    def generate(self) -> None:
        for _ in range(2):
            for factory in self.factories:
                self.build(factory)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        prog='DataLoader',
        description='Fills DB with random data',
    )
    parser.add_argument('--full', action='store_true')
    args = parser.parse_args()

    with session:
        if args.full:
            import_factories()
            DataLoader().generate()
        else:
            DataLoader().build(UserFactory)
