import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Creaciones Vane',

  projectId: 'nh1i4g00',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  deployment: {
    appId: 'rdzne3823c86kuh0wmpja0vn',
  },

  schema: {
    types: schemaTypes,
  },
})
