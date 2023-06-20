<script setup lang="ts">
import { randomUUID } from 'uncrypto'
import { onMounted, ref } from 'vue'
import { useEventListener, useRafFn } from '@vueuse/core'

const props = defineProps<{
  type?: 'normal' | 'shiny' | 'holographic'
}>()

const filterId = ref(`${randomUUID()}-${props.type}`)
const svg = ref<HTMLElement | undefined>()
const lightPosition = ref({ x: 200, y: 0 })
let latestMouseEvent: MouseEvent | undefined

const { resume } = useRafFn(
  () => {
    if (!latestMouseEvent)
      return

    const { top, left, width, height } = svg.value!.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    lightPosition.value.x = Math.ceil(latestMouseEvent.clientX - centerX)
    lightPosition.value.y = Math.ceil(latestMouseEvent.clientY - centerY)

    latestMouseEvent = undefined
  },
  { immediate: false },
)

onMounted(() => {
  // Update ID for Nuxt SSR support
  filterId.value = `${randomUUID()}-${props.type}`

  if (props.type === 'shiny') {
    useEventListener(
      window,
      'mousemove',
      (event) => {
        latestMouseEvent = event
        resume()
      },
      { passive: true },
    )
  }
})
</script>

<template>
  <div class="sticker">
    <svg ref="svg" width="0" height="0">
      <filter v-if="type === 'shiny'" :id="filterId" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur1" />
        <feSpecularLighting result="spec1" in="blur1" surfaceScale="5" specularConstant="0.5" specularExponent="120" lighting-color="#fff">
          <fePointLight v-bind="lightPosition" z="300" />
        </feSpecularLighting>
        <feComposite in="spec1" in2="SourceAlpha" operator="in" result="specOut2" />
        <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
      </filter>

      <filter v-else-if="type === 'holographic'" :id="filterId">
        <feMorphology in="SourceAlpha" result="Dilated" operator="dilate" radius="4" />
        <feTurbulence baseFrequency="0.03 0.03" seed="1" numOctaves="3" type="fractalNoise" result="turb" />
        <feComponentTransfer in="turb" result="gradient">
          <feFuncR type="table" tableValues="1 1 0.3 0 0.98 1" />
          <feFuncG type="table" tableValues="0 0 1 0.3 1 0" />
          <feFuncB type="table" tableValues="0 0.82 0 1 0 0" />
          <feFuncA type="table" tableValues="0 1" />
        </feComponentTransfer>
        <feComposite operator="in" in="gradient" in2="Dilated" result="holo" />
        <feComposite operator="over" in2="holo" in="SourceGraphic" result="swa" />
        <feComponentTransfer in="swa">
          <feFuncA type="discrete" tableValues="0 1 1 1 1 1" />
        </feComponentTransfer>
      </filter>

      <filter v-else :id="filterId">
        <feMorphology in="SourceAlpha" result="Dilated" operator="dilate" radius="4" />
        <feFlood flood-color="#fff" result="OutlineColor" />
        <feComposite in="OutlineColor" in2="Dilated" operator="in" result="Outline" />
        <feMerge>
          <feMergeNode in="Outline" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>

    <div class="sticker-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sticker {
  user-select: none;
  filter: drop-shadow(0.5px 0.5px 2px rgba(0, 0, 0, 0.25));
}

.sticker-content > :deep(*) {
  filter: v-bind('`url(#${filterId})`');
}
</style>
