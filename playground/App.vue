<script lang="ts" setup>
import { Sticker } from '../src/components'
</script>

<template>
  <div class="h-[100svh] flex items-center bg-sunglo-500">
    <div class="mx-auto aspect-[16/9] w-[min(100%-2rem,1280px)] flex items-center justify-center p-4">
      <div class="polka flex items-center justify-center leading-[0.75]">
        <Sticker class="-rotate-20">
          <span
            class="from-sunglo-500 to-[#28292b] from-50% to-50% bg-gradient-to-r bg-clip-text text-size-[8rem] font-styro text-transparent"
            style="--un-gradient-shape: 140deg"
          >
            Stickers
          </span>
        </Sticker>
        <Sticker class="" type="shiny">
          <span class="text-size-[12rem]">🍦</span>
        </Sticker>
        <Sticker class="rotate-20" type="holographic">
          <span class="text-size-[9rem]">👻</span>
        </Sticker>
      </div>
    </div>
  </div>
</template>

<style>
.polka {
  background-image:
    radial-gradient(#28292b 1px, transparent 1px),
    radial-gradient(#28292b 1px, #e57066 1px);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
}
</style>
