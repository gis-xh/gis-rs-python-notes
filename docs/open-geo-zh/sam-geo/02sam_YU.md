# 开源地理信息教程（一）分割一切！SamGeo 实现快速矢量化



## 前言

&emsp;&emsp;本文是开源地理信息教程的第一篇教程，针对目前较为火热的 Segment Anything Model (SAM) 分割一切模型，介绍如何通过 Geemap 与 Segment-geospatial 包的结合使用，实现对本地超高分辨率的栅格数据的快速分割提取，最终得到 shapefile 格式的矢量数据。

&emsp;&emsp;Segment-geospatial 是 Geemap 包的作者吴秋生老师基于 SAM 分割一切模型开发的一个对地理空间数据进行快速分割的 Python 包，可以根据感兴趣区域高分辨率影像快速有效地提取矢量边界。



## 1 相关介绍

### 1.1 Segment Anything Model

&emsp;&emsp;[Segment Anything](https://github.com/facebookresearch/segment-anything) 是 Meta AI 研究的一个新项目，它提出了一种新的图像分割任务、模型和数据集。Segment Anything Model (SAM) 是一个可以根据输入提示（如点或框）产生高质量的对象掩码的模型，它还可以用于生成图像中所有对象的掩码。SAM 在一个包含 1100 万张图像和 10 亿多个掩码的大规模数据集上进行了训练，具有强大的零样本泛化能力，可以应对各种分割任务。SAM 的设计和训练还使得它可以被提示，即可以根据不同的输入提示转移到新的图像分布和任务上，而无需额外的训练。

![sam_masks2](./img/sam_masks2.jpg)

<center>图 1-1 SAM 分割示例</center>

### 1.2 Segment-geospatial

&emsp;&emsp;Segment-geospatial (samgeo) 是一个开源的 Python 包，旨在简化使用 Segment Anything 模型分割地理空间数据的过程。该包利用流行的 Python 库，如 `leafmap`、`ipywidgets`、`rasterio`、`geopandas` 和 `segment-anything-py`，为用户提供了一个简单的界面，以分割和遥感图像，并以各种格式导出结果，包括矢量和栅格数据。它还提供了在 Jupyter 环境中交互式下载遥感图像和可视化分割结果的功能。Segment-Geospatial 旨在通过提供一个用户友好、高效和灵活的地理空间分割工具来填补 Python 生态系统中的空白，而不需要训练深度学习模型。

![Automatic_mask_generator](./img/Automatic_mask_generator.gif)

<center>图 1-2 samgeo 分割示例</center>



## 2 环境配置

&emsp;&emsp;由于国内镜像源与官方镜像源对包的版本更新存在延迟，所以这里我们使用官方镜像源（[https://pypi.python.org/simple](https://pypi.python.org/simple)） 进行安装和升级。

### 2.1 创建虚拟环境

&emsp;&emsp;在 [Geemap 教程（一）：Geemap 包的介绍与使用](../../gee/geemap01.md) 中，我们使用 mamba 库配置了 geemap 的虚拟环境。

&emsp;&emsp;由于其复杂的依赖环境，必须使用 mamba 库创建虚拟环境

> 给基础环境安装 mamba 库

```sh
conda install -n base mamba -c conda-forge -y
```

> mamba 库安装环境

```sh
mamba create -n samgeo segment-geospatial python=3.9 -c conda-forge
```

> 激活环境

```sh
conda activate samgeo
```

### 2.2 检查环境

&emsp;&emsp;由于 `segment-geospatial` 包是基于 `Pytorch` 的环境，为了更好地利用 GPU 的性能训练模型，我们需要安装 CUDA 工具。

> 检查 CUDA 版本

```sh
nvcc -V
```

&emsp;&emsp;可以看到，当前电脑安装的是 CUDA 11.2 版本，具体内容如下。

```
(samgeo) E:\github\self-website\gis-rs-python-notes>nvcc -V
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2020 NVIDIA Corporation
Built on Mon_Nov_30_19:15:10_Pacific_Standard_Time_2020
Cuda compilation tools, release 11.2, V11.2.67
Build cuda_11.2.r11.2/compiler.29373293_0
```

&emsp;&emsp;需要注意的是：pip、conda 以及 pytorch 官方都没有给出对 CUDA11.2 版本的支持。但是不用担心，我们直接安装 11.3 版本的就可以。pytorch自带cuda包，不需要和电脑的cuda一致，只需要驱动能够兼容11.3。

### 2.3 安装 CUDA 支持

[Previous PyTorch Versions | PyTorch](https://pytorch.org/get-started/previous-versions/)

> 使用 conda 安装 cuda 支持

```sh
conda install cudatoolkit=11.3 -c pytorch -c conda-forge -y
```

> 使用 pip 重新安装 Pytorch

&emsp;&emsp;这里需要使用 pip 安装，使用 conda 安装会保持原状，不会重新安装 pytorch。

```sh
pip install torch==1.12.1+cu113 torchvision==0.13.1+cu113 --extra-index-url https://download.pytorch.org/whl/cu113
```

![image-20230606201139166](./img/image-20230606201139166.png)

<center>图 2-1 重新安装 Pytorch</center>



## 3 编程实现


### 3.1 基本配置

&emsp;&emsp;首先我们导入 leafmap 以及刚刚安装的 Segment-geospatial 包。

```
import os
import leafmap
from samgeo import SamGeo, tms_to_geotiff
```

### 3.2 下载并显示地图瓦片

&emsp;&emsp;接下来，加载谷歌卫星影像为底图，绘制矢量边界，下载矢量边界内的地图切片。

```python
point = [30.532181687, 114.024938132]
Map = leafmap.Map(center=point, zoom=16)
Map.add_basemap("SATELLITE")
Map
```

&emsp;&emsp;绘制多边形边界，先检查是否已绘制边界，如果没有就按照指定左上右下角的坐标绘制。

```python
if Map.user_roi_bounds() is not None:
    bbox = Map.user_roi_bounds()
else:
    bbox = [114.018859863, 30.540618896, 114.030532837, 30.526885986]
```

&emsp;&emsp;按照指定输出路径下载地图，可以根据需求设置以下参数:

- `zoom=16`: 缩放级别为 16 级，下载影像时与分辨率二选一即可

- `resolution=None`: 设置分辨率，float 类型，以米为单位，默认为 None

- `source="SATELLITE"`: 下载的地图源为谷歌卫星影像（如 "OPENSTREETMAP", "ROADMAP", "SATELLITE" 等）

- `crs='EPSG:4326'`: 以 EPSG 码设置下载影像的坐标系

- `overwrite=True`: 若同名文件已存在，则会覆写文件

```python
yangtzeu = "..\\data\\tif\\yangtzeu_wh_L16.tif"
tms_to_geotiff(
    output=yangtzeu,
    bbox=bbox,
    zoom=16,
    resolution=None,
    source="Satellite",
    crs='EPSG:4326',
    overwrite=True,
)
```

&emsp;&emsp;使用 `add_raster()` 函数加载下载好的影像

```python
Map.add_raster(yangtzeu, alpha=0.5, layer_name="长江大学武汉校区")
Map
```



### 3.3 初始化 SAM 类

```python
sam = SamGeo(
    model_type="vit_h",
    checkpoint="sam_vit_h_4b8939.pth",
    device="cuda",
    sam_kwargs=None,
)
```

### 3.4 分割影像

```python
sam.generate(
    source=yangtzeu,
    output=out_mask,
    foreground=True,
    batch=True,
    erosion_kernel=None,
    unique=True
)
```

&emsp;&emsp;为输入图像生成 mask 掩膜，根据需要修改三个参数：

- `batch=True`: 批量分割图像，这对于无法放入内存的大图像很有用。

- `erosion_kernel=None`: 过滤对象掩码和提取边界的侵蚀核的参数设置。侵蚀核是一个矩阵，用于对图像进行形态学变换，以去除噪声或细化边缘，它的值是 None 或矩阵（如(3,3)或(5,5)）。矩阵的大小决定了侵蚀的程度，矩阵越大，侵蚀越强，图像中的白色区域越小。选择合适的矩阵大小要根据图像的特征和目标来决定。如果矩阵太小，可能无法有效地去除噪声或分离物体；如果矩阵太大，可能会损失图像中的重要信息或造成过度腐蚀

- `unique=True`: 给每个对象分配唯一编码值

&emsp;&emsp;然后，我们将分割好的 mask 掩膜显示出来，查看效果。

```python
sam.show_masks(cmap="binary_r")
```





`generate()`方法是segment-geospatial包中的一个函数，它可以根据你输入的文字或者标记来分割地理空间数据，比如卫星影像。分割的结果是一个对象掩码，也就是一个只有黑白两种颜色的图片，白色的部分表示你想要提取的对象，黑色的部分表示你不想要的背景。

`erosion_kernel`参数是一个可选的参数，它可以让你对对象掩码进行一些处理，使得分割的结果更加准确和美观。具体来说，它可以让你去除对象掩码中的一些小白点或者小黑洞，这些可能是由于图像质量不好或者分割模型不够精确造成的  。

`erosion_kernel`参数的值是一个元组，比如(3, 3)或者(5, 5)，表示一个矩阵的大小。这个矩阵会在对象掩码上滑动，每次滑动到一个位置，就会检查这个位置周围的像素点是否和矩阵中的值相同  。如果相同，就保持不变；如果不同，就把这个位置的像素点变成黑色  。这样就可以把一些小白点变成黑色，消除掉；也可以把一些小黑洞用周围的白色填补上。

`erosion_kernel`参数的默认值是None，表示不对对象掩码进行处理。如果你想要使用这个参数，你需要根据你的图像和目标来选择合适的矩阵大小 。一般来说，矩阵越大，处理的效果越明显，但也可能会损失一些细节；矩阵越小，处理的效果越微弱，但也可能会保留一些噪声 。所以你需要根据实际情况来调整这个参数，使得分割结果既清晰又完整。



提取分割腌膜

```sh
out_annotation = os.path.join(tif_dir, "yangtzeu_wh_annotations.tif")

sam.show_anns(axis="off", alpha=1, output=out_annotation)
```





### 3.5 矢量化栅格数据

```python
sam.tiff_to_vector(out_mask, out_mask_shp)
```





### 3.6 地图可视化



```sh
style = {
    "color": "#3388ff",
    "weight": 2,
    "fillColor": "#7c4185",
    "fillOpacity": 0.5,
}
Map.add_vector(out_mask_shp, layer_name="Vector", style=style)
Map
```





### 3.6 在 QGIS 中查看数据





## 总结









## 参考文献

[1] Kirillov A, Mintun E, Ravi N, et al. Segment Anything[J]. arXiv:2304.02643, 2023.

[2] Wu, Q., (2020). geemap: A Python package for interactive mapping with Google Earth Engine. The Journal of Open Source Software, 5(51), 2305. https://doi.org/10.21105/joss.02305

[3] Qiusheng Wu. 135 segmentation - geemap [EB/OL]. [2023-06-07]. https://geemap.org/notebooks/135_segmentation/.

[4] Qiusheng Wu, & Lucas Osco. (2023). samgeo: A Python package for segmenting geospatial data with the Segment Anything Model (SAM). Zenodo. https://doi.org/10.5281/zenodo.7966658

[5] coder_yang56. 已有cuda11.2情况下Pytorch 环境配置 [EB/OL]. (2022-04-22)[2023-06-07]. https://blog.csdn.net/qq_41330902/article/details/124355474.