/**
 * 计算坡度
 */ 
// 加载湖北省行政边界
var province = ee.FeatureCollection("users/evolto/China_Region/province");
var hb = province.filterMetadata('ID', 'equals', 'Hubei').first().geometry();

// 加载湖北省范围内的 SRTM 图像
var srtm = ee.Image('CGIAR/SRTM90_V4').clip(hb);

// 对图像应用坡度算法
var slope = ee.Terrain.slope(srtm);

// 显示结果
Map.setCenter(112.6437, 30.8847, 7);
Map.addLayer(slope, {
  min: 0,
  max: 60
}, '湖北省坡度图');


/**
 * 计算坡向
 */ 
// 加载湖北省范围内的 SRTM 图像
var province = ee.FeatureCollection("users/evolto/China_Region/province");
var hb = province.filterMetadata('ID', 'equals', 'Hubei').first().geometry();
var srtm = ee.Image('CGIAR/SRTM90_V4').clip(hb);

// 获取以度为单位的坡度图像
var aspect = ee.Terrain.aspect(srtm);

// 计算坡向
var sinImage = aspect.divide(180).multiply(Math.PI).sin();

// 显示结果
Map.setCenter(112.6437, 30.8847, 7);
Map.addLayer(sinImage, {
  min: -1,
  max: 1
}, '正弦计算坡向');



/**
 * 计算高程
 */
// 加载武汉市范围内的 SRTM 图像
var city = ee.FeatureCollection("users/evolto/China_Region/city");
var wh = city.filterMetadata('市', 'equals', '武汉市').first().geometry();
var srtm = ee.Image('CGIAR/SRTM90_V4').clip(wh);

// 计算武汉市的平均高程
var meanDict = srtm.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: wh,
  scale: 90
});

// 从字典里找出平均数，然后打印出来。
var mean = meanDict.get('elevation');
print('武汉市平均高程：', mean);

// 添加武汉市行政区域
Map.setCenter(114.3340, 30.6697, 9)
Map.addLayer(wh, {}, '武汉市');
