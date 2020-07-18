import loadModules from "@/utils/loadModules";

const createWmtsLayer = async function(id, title, wmtsUrl, _tileInfo) {
  const { SpatialReference, WebTileLayer, TileInfo } = await loadModules(
    "esri/geometry/SpatialReference",
    "esri/layers/WebTileLayer",
    "esri/layers/support/TileInfo"
  );
  if (wmtsUrl && _tileInfo) {
    let spatialReference = new SpatialReference(_tileInfo.spatialReference);
    let tileInfo = new TileInfo(_tileInfo);

    const layerInst = new WebTileLayer({
      id: id,
      title: title,
      urlTemplate: wmtsUrl, // `${wmtsUrl}&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}`,
      tileInfo: tileInfo,
      subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      spatialReference: spatialReference
    });
    return layerInst;
  } else {
    console.log("wmts config error");
  }
};
export default createWmtsLayer;
