import React, { useEffect, useRef } from 'react'
import { set, unset } from 'sanity'
import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui'

export function CloudinaryUpload(props: any) {
  const { value, onChange } = props
  const cloudinaryRef = useRef<any>(null)
  const widgetRef = useRef<any>(null)
  const onChangeRef = useRef(onChange)

  // Mantener la referencia actualizada de onChange sin recrear dependencias
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    let script = document.getElementById('cloudinary-widget-script') as HTMLScriptElement

    const handleLoad = () => {
      initWidget()
    }

    // Cargar el script de Cloudinary si no existe
    if (!script) {
      script = document.createElement('script')
      script.id = 'cloudinary-widget-script'
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.async = true
      document.body.appendChild(script)
      script.addEventListener('load', handleLoad)
    } else {
      // Si el script ya existe pero no ha terminado de cargar
      if ((window as any).cloudinary) {
        initWidget()
      } else {
        script.addEventListener('load', handleLoad)
      }
    }

    function initWidget() {
      if (!(window as any).cloudinary) return

      // Si el widget ya está instanciado, no hacerlo de nuevo
      if (widgetRef.current) return

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
            onChangeRef.current(set({ secure_url, public_id, _type: 'cloudinaryUpload' }))
          }
        }
      )
    }

    return () => {
      if (script) script.removeEventListener('load', handleLoad)
    }
  }, []) // Solo se ejecuta una vez al montar

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
