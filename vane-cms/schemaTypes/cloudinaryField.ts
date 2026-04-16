import { defineField, defineType } from 'sanity'
import { CloudinaryUpload } from '../components/CloudinaryUpload'

export const cloudinaryUploadType = defineType({
  name: 'cloudinaryUpload',
  title: 'Cloudinary Upload',
  type: 'object',
  components: { input: CloudinaryUpload },
  fields: [
    defineField({ name: 'secure_url', type: 'string' }),
    defineField({ name: 'public_id', type: 'string' }),
  ],
})
