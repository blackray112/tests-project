
import pytest

from common.models import Model
from common.utils import get_all_subclasses
from database.local_session import session


@pytest.fixture(autouse=True)
def db():
    with session:
        model_classes = get_all_subclasses(Model)
        for model_class in reversed(model_classes):
            if getattr(model_class.__config__, 'table', False):
                session.query(model_class).delete()

        session.commit()
        yield session
