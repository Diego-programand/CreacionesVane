import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product',
    title: 'Producto',
    type: 'document',
    fields: [
        defineField({
            name: 'nombre',
            title: 'Nombre',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'nombre' },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'descripcion',
            title: 'Descripción',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'precio',
            title: 'Precio (COP)',
            type: 'number',
            validation: Rule => Rule.required().positive(),
        }),
        defineField({
            name: 'imagen',
            title: 'Imagen (subir desde aqui)',
            type: 'cloudinary.asset',
            description: 'Sube la foto directamente desde tu celular',
        }),
        defineField({
            name: 'cloudinaryPublicId',
            title: 'Imagen (Cloudinary Public ID)',
            type: 'string',
            description: 'Solo para productos antiguos migrados. Nuevos productos usan el campo Imagen de arriba.',
        }),
        defineField({
            name: 'categoria',
            title: 'Categoría',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'destacado',
            title: 'Destacado',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'legacyId',
            title: 'ID legacy (mockData)',
            type: 'string',
            description: 'ID original del mockData.ts — solo referencia, no modificar',
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'nombre',
            subtitle: 'precio',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: subtitle
                    ? `$${Number(subtitle).toLocaleString('es-CO')}`
                    : 'Sin precio',
            }
        },
    },
})