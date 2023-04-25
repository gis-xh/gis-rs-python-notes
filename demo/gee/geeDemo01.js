// 这里的数据是用户自己上传的
// 参考1：https://zhuanlan.zhihu.com/p/506866401
// 参考2：https://developers.google.cn/earth-engine/datasets/catalog/LANDSAT_LC08_C01_T2
var L8_RAW = ee.ImageCollection("LANDSAT/LC08/C02/T1"),
  centerPoint = /* color: #ffc82d */ ee.Geometry.Point([114.35186990208535, 30.58233381161745]),
  province = ee.FeatureCollection("users/evolto/province");

// 利用属性筛选重湖北省的行政区边界
var hb = province.filterMetadata('ID', 'equals', 'Hubei').first().geometry();

// 筛选遥感影像时间
var L8_Filtered = L8_RAW.filterDate('2020-01-01', '2021-12-31');

// 裁剪图像
var hb_No_Cloud = ee.Algorithms.Landsat.simpleComposite(L8_Filtered).clip(hb);

// 添加图层及其影像
Map.addLayer(hb, {}, '湖北省');
Map.addLayer(hb_No_Cloud, {
  bands: ['B5', 'B4', 'B3'],
  gamma: 1.3,
  max: 108,
  min: 15
}, '湖北省L8图像');

// 将地图的显示中心定位到之前添加的中心点，缩放界别调整为 6 级
Map.centerObject(centerPoint, 6);
