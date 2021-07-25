# Set the path
import sys, pathlib
sys.path.append( pathlib.Path(__file__).parents[0] )

import unittest
loader = unittest.TestLoader()
tests = loader.discover( './tests' )
runner = unittest.runner.TextTestRunner()

if __name__ == '__main__':
    print( tests )
    runner.run(tests)