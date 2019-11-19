import pip
try:
    import numpy
except ImportError:
    pip.main(["install", "numpy"])
try:
    import pyximport
except ImportError:
    pip.main(["install", "cython"])