<template>
    <q-card :style="{ height: `${size.height}px` }">
        <div class="absolute-right row justify-end items-center q-gutter-x-sm" style="top:-40px; right: 40px; height:40px">
            zoom: {{ zoom }} - center: {{center }}
        </div>
        <div ref="mapRef" :style="{ height: `${size.height}px`, zIndex: 20 }"></div>
        <div class="absolute-center fit z-top flex flex-center" v-show="loading"> <q-spinner-cube color="primary"
                size="5.5em" />
        </div>
    </q-card>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getWidgetByTypeService } from "@/services/transactionServices";
import type { QueryParameters } from '@/utils/helpers';
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    size: {
        type: Object,
        required: false,
        default: () => ({ height: 200, width: 200 })
    },
});
const loading = ref<boolean>(false)
const map = ref<any>(null)
const mapRef = ref<any>(null)
const zoom = ref<number>(6)
const center = ref<any>([-19.601194, -57.65625])
const markers = ref<any>([])
async function createMapLayer() {
    try {
        if (!mapRef.value) return
        const coordinates: any = center.value
        map.value = L.map(mapRef.value).setView(coordinates, zoom.value)
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        }).addTo(map.value);
        map.value.on('zoomend', () => {
            zoom.value = map.value.getZoom()
        });
        map.value.on('moveend', () => {
            center.value = map.value.getCenter()
        });
        if (markers.value.length > 0) setMarkers(markers.value)

    } catch (error) {
        console.log(error)
    }
}

watch(() => props.size, () => {
    if (map.value) map.value.invalidateSize()
}, { deep: true })

async function getRegionTransactions(query: QueryParameters = {}) {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('geolocation', query)
        if (status === 200) markers.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}
async function setMarkers(markers: any[]): Promise<void> {
    loading.value = true
    markers.forEach((item: any, key: number) => {
        setTimeout(() => {
            L.marker([item.lat, item.long], { icon: L.divIcon({ className: 'poi', html: `<div class="q-pa-xs"></div>` }) }).addTo(map.value)
            if (key === markers.length - 1) loading.value = false
        }, 200)
    })
}
watch(() => markers.value, () => {
    setMarkers(markers.value)
})


onMounted(() => {
    loading.value = true
    setTimeout(async () => {
        await getRegionTransactions()
        createMapLayer()
        loading.value = false
    }, 500)
})


</script>

<style lang="sass">
.leaflet-right
    display: none !important
.poi
    background-color: $primary
    max-height: 6px
    border-radius: 50%
    max-width: 6px

.body--dark   
    .leaflet-layer,
    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out,
    .leaflet-control-attribution 
        filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)

</style>