from pydantic import BaseModel

from common.factories import Factory, post_gen


class Obj(BaseModel):
    name: str
    value: int

    def commit(self) -> None:
        pass


class ObjFactory(Factory[Obj]):
    __model__ = Obj

    @staticmethod
    @post_gen()
    def set_name(obj: Obj, _) -> None:
        obj.name = 'Hello World!'

    @staticmethod
    @post_gen('val', 1337)
    def set_value(obj: Obj, value: int) -> None:
        obj.value = value


def test_post_gen() -> None:
    assert ObjFactory.build().name == 'Hello World!'


def test_values() -> None:
    assert ObjFactory.build(val=1).value == 1


def test_default_value() -> None:
    assert ObjFactory.build().value == 1337


def test_batch() -> None:
    objs = ObjFactory.batch(2)
    assert len(objs) == 2
    for i in objs:
        assert i.name == 'Hello World!'
        assert i.value == 1337


def test_batch_arguments() -> None:
    objs = ObjFactory.batch(2, val=1)
    assert len(objs) == 2
    for i in objs:
        assert i.value == 1
