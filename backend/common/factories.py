import datetime
from collections.abc import Callable
from typing import Any, Generic

import freezegun
from faker import Faker
from polyfactory import Ignore
from polyfactory.factories.pydantic_factory import ModelFactory, T

faker = Faker('en_US')


def post_gen(argument_name: str | None = None, default: Any = None) -> Callable[[Any], Any]:
    def decorator(func: Callable) -> Callable:
        func.post_gen = True
        func.argument_name = argument_name
        func.default = default
        return func

    return decorator


class Factory(Generic[T], ModelFactory[T]):
    id = Ignore()
    __is_base_factory__ = True

    @classmethod
    def _run_post_gen(cls, obj: T, **kwargs: Any) -> None:
        for attr in dir(cls):
            method = getattr(cls, attr)
            if getattr(method, 'post_gen', False):
                method(obj, kwargs.get(method.argument_name, method.default))

    @classmethod
    def build_instance(cls, instance: T, **kwargs: Any) -> T:
        instance.commit()
        cls._run_post_gen(instance, **kwargs)

        return instance

    @classmethod
    def build(cls, **kwargs: Any) -> T:
        instance = super().build(**kwargs)

        return cls.build_instance(instance, **kwargs)

    @classmethod
    def batch(cls, size: int, **kwargs: Any) -> list[T]:
        instances = super().batch(size, **kwargs)
        for instance in instances:
            cls.build_instance(instance, **kwargs)

        return instances

    @classmethod
    def get_provider_map(cls) -> dict[type, Callable]:
        """
        Method overridden to be able to use a freezegun in tests, which monkey patches the datetime library.
        """
        mapping = super().get_provider_map()
        mapping[freezegun.api.real_datetime] = mapping[datetime.datetime]
        return mapping
