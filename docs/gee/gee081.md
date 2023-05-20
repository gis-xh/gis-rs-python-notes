# GEE 教程（七）：监督分类与精度评价



## 相关参考

- [吴秋生 Geemap 教程 | 33 ML 与 GEE - 准确性评估](https://geemap.org/notebooks/33_accuracy_assessment/)



利用geemap先按照日期、云量和区域进行筛选S2_SR_HARMONIZED影像集合，然后合并成单一影像，再根据这个影像与本地采集好的shp格式的土地覆盖分类样本，进行监督分类，你可以给我写一个示例demo吗？（用markdown回答）



## 1 数据导入

```python
s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
louang_namtha = ee.FeatureCollection('projects/ee-evolto/assets/louang_namtha')
# 导入制作好的训练数据集
louang_namtha_sample = geemap.shp_to_ee("E:/researchData/laos/sample/louang_namtha_sample.shp")
```

[GEE：样本点选择教程_gee选取样本点__养乐多_的博客-CSDN博客](https://blog.csdn.net/qq_35591253/article/details/129176469)



从2022年1月1日到2022年12月31日的时间范围内筛选s2数据集，筛选出云覆盖率小于20%的影像，筛选出包含louang_namtha区域的影像，对每个影像应用maskS2clouds函数，去除云层，选择波段1到8的数据

```python
# 定义使用的哨兵影像数据
collection = s2.filterDate('2022-01-01', '2022-12-31') \
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20)) \
              .filterBounds(louang_namtha) \
              .map(maskS2clouds) \
              .select('B[1-8]')
```









| 类别编号 |   类别名称    |   验证整体 producers 准确率    |        验证整体 consumers 准确率         |
| :------: | :-----------: | :----------------------------: | :--------------------------------------: |
|    1     | agricultural  |       0.985838779956427        |            0.9546413502109705            |
|    2     |   building    |       0.9258426966292135       |            0.9832935560859188            |
|    3     | human forest  |       0.8943338437978561       |            0.9931972789115646            |
|    4     | nature forest |       0.9998959154238473       |            0.9986708348493737            |
|    5     |     road      |       0.9856565666666666       |                    1                     |
|    6     |     water     |       0.9176755447941889       |            0.9869791666666666            |
|   整体   |               | 验证准确性: 0.9982415091049136 | 验证整体 kappa 准确率: 0.959480023905596 |



