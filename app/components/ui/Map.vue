<script lang="ts" setup>
import { ref } from "vue";
import L from "leaflet";

if (import.meta.client) {
  // @ts-ignore
  window.L = L;
}

const { markers, zoom, center } = defineProps<{
  center?: [number, number];
  zoom?: number;
  markers?: { lat: number; lng: number; name: string; id?: string }[];
}>();

const map = ref(null) as any;

const onMapReady = async () => {
  if (!map.value?.leafletObject) return;

  const points = markers || [];
  const { markerCluster } = await useLMarkerCluster({
    leafletObject: map.value.leafletObject,
    markers: points,
  });
};
</script>

<template>
  <LMap
    ref="map"
    class="min-h-[500px]"
    :zoom="zoom || 2"
    :center="center || [47.21322, -1.559482]"
    :use-global-leaflet="true"
    @ready="onMapReady">
    <LTileLayer
      url=" http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap" />
    <LTileLayer
      url=" http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="overlay"
      name="OpenStreetMap" />
  </LMap>
</template>
