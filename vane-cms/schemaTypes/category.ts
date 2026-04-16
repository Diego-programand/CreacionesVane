import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Categoría',
    type: 'document',
    fields: [
        defineField({
            name: 'nombre',
            title: 'Nombre',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'valor',
            title: 'Valor interno',
            type: 'string',
            description: 'Debe ser exactamente: Detalles, Refrigerios o Decoraciones',
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
            name: 'subtitulo',
            title: 'Subtítulo',
            type: 'string',
        }),
        defineField({
            name: 'descripcion',
            title: 'Descripción',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'icono',
            title: 'Ruta del ícono',
            type: 'string',
            description: 'Ruta relativa, ej: /images/corazon.svg',
        }),
        defineField({
            name: 'ruta',
            title: 'Ruta de la página',
            type: 'string',
            description: 'Ej: /creaciones-vane',
        }),
    ],
    preview: {
        select: { title: 'nombre', subtitle: 'subtitulo' },
    },
})