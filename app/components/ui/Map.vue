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

  const customIcon = L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="custom-marker-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#253B33" d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32"/></svg>
      </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  const points = (markers || []).map((m) => ({
    ...m,
    options: { icon: customIcon },
    popup: m.id
      ? `<div>
           <h3 class="font-bold mb-1">${m.name}</h3>
           <a href="/brewery/${m.id}" class="text-[#263A32] underline font-medium">View brewery</a>
         </div>`
      : m.name,
  }));

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

<style>
.custom-marker-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #263a32;
  transition: transform 0.2s ease-in-out;
}

.custom-marker-wrapper:hover {
  transform: scale(1.2);
  color: #1e2e28;
}

.custom-marker-svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.custom-div-icon {
  background: none;
  border: none;
}
</style>
