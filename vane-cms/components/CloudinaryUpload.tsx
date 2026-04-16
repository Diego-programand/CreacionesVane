import React, { useEffect, useRef } from 'react'
import { set, unset } from 'sanity'
import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui'

export function CloudinaryUpload(props: any) {
  const { value, onChange } = props
  const cloudinaryRef = useRef<any>()
  const widgetRef = useRef<any>()

  useEffect(() => {
    // Cargar el script de Cloudinary si no existe
    if (!document.getElementById('cloudinary-widget-script')) {
      const script = document.createElement('script')
      script.id = 'cloudinary-widget-script'
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.async = true
      script.onload = () => {
        initWidget()
      }
      document.body.appendChild(script)
    } else {
      initWidget()
    }

    function initWidget() {
      if (!(window as any).cloudinary) return
      cloudinaryRef.current = (window as any).cloudinary
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: 'dw7zhnbho',
          uploadPreset: 'l4qmhurt',
          sources: ['local', 'camera'],
          multiple: false,
          cropping: false,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            const { secure_url, public_id } = result.info
            onChange(set({ secure_url, public_id, _type: 'cloudinaryUpload' }))
          }
        }
      )
    }
  }, [onChange])

  return (
    <Stack space={3}>
      {value?.secure_url ? (
        <Card padding={2} border radius={2}>
          <Flex align="center" gap={3}>
            <Box style={{ width: '100px', height: '100px', overflow: 'hidden' }}>
              <img
                src={value.secure_url}
                alt="Vista previa"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Stack space={2}>
              <Text size={1} weight="medium">Imagen actual:</Text>
              <Text size={1} muted>{value.public_id}</Text>
              <Button
                tone="critical"
                mode="ghost"
                text="Eliminar foto"
                onClick={() => onChange(unset())}
              />
            </Stack>
          </Flex>
        </Card>
      ) : null}
      
      <Button
        mode="default"
        tone="primary"
        text={value?.secure_url ? 'Cambiar foto' : 'Subir foto'}
        onClick={() => widgetRef.current?.open()}
      />
    </Stack>
  )
}
