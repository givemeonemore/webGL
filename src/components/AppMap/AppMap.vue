<template>
  <div class="map">
    <div class="map-view" ref="mapView" id="viewDiv"></div>
  </div>
</template>

<script>
import { getWmtsConfig } from "@/api/public";
import loadModules from "@/utils/loadModules";
import createWmtsLayer from "./Layer/wmtsLayer";
import customWebGLPoint from "./customWebGLPoint";
export default {
  name: "AppMap",
  // mixins: [customWebGLPoint],
  data() {
    return {
      mapInfo: {},
      locateGraphicLayer: null,
      bubbleSvg:
        '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1553587020729" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7352" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M501.987556 0C335.957333 0 142.222222 101.432889 142.222222 359.765333 142.222222 535.068444 418.986667 922.567111 501.987556 1024c73.784889-101.432889 359.765333-479.715556 359.765333-664.234667C861.752889 101.489778 668.017778 0 501.987556 0" p-id="7353" fill="#ff0000" opacity="1"></path></svg>'
    };
  },
  async created() {
    let res = await getWmtsConfig();
    if (res) {
      this.mapInfo = res;
      this.createMap();
    }
  },
  methods: {
    async createMap() {
      const {
        MapView,
        Map,
        Basemap,
        Point,
        GraphicsLayer,
        Graphic,
        lang
      } = await loadModules(
        "esri/views/MapView",
        "esri/Map",
        "esri/Basemap",
        "esri/geometry/Point",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "dojo/_base/lang"
      );
      let tbasemaps = [];
      if (Object.keys(this.mapInfo).length > 0 && this.mapInfo.url.length > 0) {
        for (let i = 0; i < this.mapInfo.url.length; i++) {
          const _wmtsLayer = await createWmtsLayer(
            this.mapInfo.id,
            this.mapInfo.name,
            this.mapInfo.url[i],
            this.mapInfo.tileInfo
          );
          _wmtsLayer.visible = true;
          if (this.mapInfo.visible === true) {
            tbasemaps.push(_wmtsLayer);
          }
        }
        const map = new Map();
        if (tbasemaps.length > 0) {
          const basemap = new Basemap({
            baseLayers: tbasemaps
          });
          map.basemap = basemap;
        }

        let pt = new Point({
          x: this.mapInfo.extent.x,
          y: this.mapInfo.extent.y,
          spatialReference: {
            wkid: this.mapInfo.extent.wkid
          }
        });

        const mapView = new MapView({
          map,
          container: this.$refs.mapView,
          spatialReference: {
            wkid: this.mapInfo.extent.wkid
          },
          constraints: {
            rotationEnabled: false
          },
          center: pt,
          zoom: this.mapInfo.extent.zoom
        });

        let layer = await customWebGLPoint(pt, this.$glMatrix);
        map.add(layer);

        this.locateGraphicLayer = map.findLayerById("locateGraphicLayer");
        if (this.locateGraphicLayer) {
          //
        } else {
          this.locateGraphicLayer = new GraphicsLayer({
            id: "locateGraphicLayer"
          });
          map.add(this.locateGraphicLayer);
        }
        let symbol = this.getBubblePictureSymbol("rgba(255,0,0,1)", 20);
        symbol.yoffset = 8;
        let graphic = new Graphic({
          geometry: pt,
          symbol: symbol
        });
        this.locateGraphicLayer.add(graphic);

        let lastFeatureId = 0;

        // Add new graphics on double click.
        mapView.on("double-click", event => {
          event.stopPropagation();
          ++lastFeatureId;

          layer.graphics.add({
            geometry: event.mapPoint,
            attributes: {
              NAME: "Feature #" + lastFeatureId,
              POPULATION: 100000
            }
          });
        });
        mapView.when(
          lang.hitch(this, function() {
            debugger;
            // let initViewPoint = mapView.viewpoint;
            this.$emit("map-ready", {
              map,
              mapView,
              mapDiv: this
            });
            // mapView.goTo(initViewPoint, {
            //   duration: 500
            // });
          })
        );
      }
    },
    /**
     * 获取气泡点symbol
     * @param {*} color
     * @param {*} size
     */
    getBubblePictureSymbol(color, size) {
      let svg = this.bubbleSvg;
      let tempColor = svg.substr(svg.indexOf('fill="') + 6, 7);
      svg = svg.replace(tempColor, color);
      let url = "data:image/svg+xml;base64," + btoa(svg);

      let pictureMarkerSymbol = {
        type: "picture-marker",
        url: url,
        width: size + "px",
        height: size + "px"
      };
      return pictureMarkerSymbol;
    }
  }
};
</script>
<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
  &-view {
    height: 100%;
    width: 100%;
  }
}
</style>
