# 开源地理信息教程



## 参考

1. [GitHub - ceholden/open-geo-tutorial: Tutorial of basic remote sensing and GIS methodologies using open source software (GDAL in Python or R)](https://github.com/ceholden/open-geo-tutorial)
2. [GitHub - patrickcgray/open-geo-tutorial: Tutorial of fundamental remote sensing and GIS methodologies using open source software in python](https://github.com/patrickcgray/open-geo-tutorial)



## 环境配置

### 1 配置开发环境

> 创建虚拟环境

```sh
conda create -n open_geo python=3.8 -y
```

> 激活环境

```sh
conda activate open_geo
```

> 为 jupyterlab 配置运行环境

```sh
conda install -c conda-forge jupyterlab jupyterlab-language-pack-zh-CN -y
```

> 如果后续出问题，可以直接移除虚拟环境

```sh
conda remove -n open_geo --all
```

### 2 安装 GDAL 与 rasterio

rasterio 是一个 python 看栅格图像的包，依赖于 GDAL 库。

```sh
pip install GDAL==3.2.2 -i https://pypi.org/simple/
pip install rasterio==1.2.3 -i https://pypi.org/simple/
```

### 3 安装机器学习相关库

```sh
pip install geopandas descartes scikit-learn
```

#### 4 安装深度学习库

```sh
pip install tensorflow
```


