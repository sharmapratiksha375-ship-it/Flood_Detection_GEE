
 Flood Detection using Sentinel-1 SAR
 Gandaki River Basin, Nepal
 Platform: Google Earth Engine
 Dataset: COPERNICUS/S1_GRD


// Center map on study area
Map.centerObject(gandaki_basin, 8);
Map.addLayer(gandaki_basin, {}, "Gandaki Basin");

Map.centerObject(table, 8);

// ------------------------------
// 1. Import Sentinel-1 Collection
// ------------------------------
var collection = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filterBounds(table)
  .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
  .filter(ee.Filter.eq("instrumentMode", "IW"))
  .filter(ee.Filter.eq("orbitProperties_pass", "ASCENDING"))
  .select("VV");

// ------------------------------
// 2. Define Time Periods
// ------------------------------
var beforeCol = collection.filterDate("2023-05-02", "2023-06-15");
var afterCol  = collection.filterDate("2023-08-02", "2023-08-15");

// Print number of images
print("Before image count:", beforeCol.size());
print("After image count:", afterCol.size());

// ------------------------------
// 3. Create Mosaics
// ------------------------------
var before = beforeCol.mosaic();
var after  = afterCol.mosaic();

print("Before bands:", before.bandNames());
print("After bands:", after.bandNames());

// ------------------------------
// 4. Clip to Area of Interest
// ------------------------------
var before_clip = before.clip(table);
var after_clip  = after.clip(table);

// ------------------------------
// 5. Apply Speckle Reduction
// ------------------------------
var before_s = before_clip.focal_median(30, "circle", "meters");
var after_s  = after_clip.focal_median(30, "circle", "meters");

// ------------------------------
// 6. Flood Detection
// ------------------------------
var difference = after_s.subtract(before_s);

// Threshold to detect flood areas
var flood_extent = difference.lt(-5);
var flood = flood_extent.updateMask(flood_extent);

// ------------------------------
// 7. Visualization
// ------------------------------
Map.addLayer(before_clip, {min: -30, max: 0}, "Before Flood");
Map.addLayer(after_clip,  {min: -30, max: 0}, "After Flood");

Map.addLayer(
  difference,
  {min: -10, max: 10, palette: ["white", "red"]},
  "Backscatter Difference"
);

Map.addLayer(
  flood,
  {min: 0, max: 1, palette: ["blue"]},
  "Flood Extent"
);
