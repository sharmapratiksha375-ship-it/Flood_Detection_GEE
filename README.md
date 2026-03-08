# Flood_Detection_GEE
# Flood Detection using Sentinel-1 SAR in Google Earth Engine

## Overview

This project detects flood extent in the Gandaki River Basin (Nepal)** using Sentinel-1 Synthetic Aperture Radar (SAR) imagery within **Google Earth Engine (GEE).

Flood detection is performed by comparing before-flood and after-flood radar backscatter values and applying a threshold to identify inundated areas.

---

## Study Area

Gandaki River Basin, Nepal

The Gandaki Basin is one of Nepal’s major river systems and frequently experiences flooding during the monsoon season.

---

## Data Source

Satellite data used:

- **Sentinel-1 SAR**
- Dataset: `COPERNICUS/S1_GRD`
- Polarization: **VV**
- Mode: **Interferometric Wide Swath (IW)**
- Orbit: **Ascending**

SAR data is used because it can detect water **through clouds and during nighttime**, making it ideal for flood monitoring.

---

## Methodology

The flood detection workflow follows these steps:

1. Import Sentinel-1 image collection
2. Filter images by
   - Study area
   - Polarization (VV)
   - Instrument mode (IW)
   - Orbit pass (Ascending)
3. Define **before-flood** and **after-flood** periods
4. Mosaic images for each period
5. Apply **speckle reduction using focal median filter**
6. Calculate **backscatter difference**
7. Apply threshold to detect flooded areas
8. Visualize flood extent on the map

---

## Time Period Used

| Period | Date Range |
|------|------|
| Before Flood | 2 May 2023 – 15 June 2023 |
| After Flood | 2 Aug 2023 – 15 Aug 2023 |

---

## Flood Detection Logic

Flooded areas are identified using the difference:
