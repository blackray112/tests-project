const { generateModules } = require('../src/utils')
const { dependencies } = require('../package.json')

const MUI_MODULES = [
  '@emotion/react',
  '@emotion/styled',
  '@mui/material',
  '@mui/styles',
]
const REACT_MODULES = ['react', 'react-dom']
const SHARED_MODULES = [...MUI_MODULES, ...REACT_MODULES]

const getSharedModules = () => generateModules(dependencies, SHARED_MODULES)

module.exports = { getSharedModules }
