# 开源地理信息教程



## 参考

1. [GitHub - ceholden/open-geo-tutorial: Tutorial of basic remote sensing and GIS methodologies using open source software (GDAL in Python or R)](https://github.com/ceholden/open-geo-tutorial)
2. [GitHub - patrickcgray/open-geo-tutorial: Tutorial of fundamental remote sensing and GIS methodologies using open source software in python](https://github.com/patrickcgray/open-geo-tutorial)



## 1 Windows 安装 GDAL

官网：[GISInternals Support Site -GDAL](https://www.gisinternals.com/release.php)

pypi | GDAL 官网：https://pypi.org/project/GDAL/



### 1.1 可能遇到的问题


安装 GDAL 库时出现：

```
error in GDAL setup command: use_2to3 is invalid.
```

因为：[History - setuptools 58.0.0. documentation (pypa.io)](https://setuptools.pypa.io/en/latest/history.html#v58-0-0)

在 `setuptools 58.0.0` 版本中，移除了对 `use_2to3` 的支持，所以我们需要安装前一个版本

```sh
pip install setuptools==57.5.0
pip install setuptools==49.6.0
```



```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/ 
```

参考：

1. [Microsoft Visual C++ 14.0 is required解决方法 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/126669852)
2. [Microsoft Visual C++ 14.0 is required._哈哈哈，冲冲冲的博客-CSDN博客](https://blog.csdn.net/qzzzxiaosheng/article/details/125119006)

```sh
conda install libpython m2w64-toolchain -c msys2
```

解决方案：[python3.9安装gdal库（便捷版）_python3.9 gdal_橙色的小太阳的博客-CSDN博客](https://blog.csdn.net/w259775/article/details/123643956)

whl安装包下载地址：[Releases · cgohlke/geospatial-wheels (github.com)](https://github.com/cgohlke/geospatial-wheels/releases)



## 2 配置开发环境

### 2.1 配置虚拟环境

> 创建虚拟环境

```sh
conda create -n open-geo python=3.8 -y
```

> 激活环境

```sh
conda activate open-geo
```

> 安装 mamba 包管理器

```sh
conda install -c conda-forge mamba -y
```

> 为 jupyterlab 配置运行环境

```sh
mamba install -c conda-forge jupyterlab jupyterlab-language-pack-zh-CN -y
```

> 如果后续出问题，可以直接移除虚拟环境

```sh
conda remove -n open-geo --all
```

### 2.2 安装 VS C++ 生成工具

参考：[【已解决】error: Microsoft Visual C++ 14.0 or greater is required_ViatorSun的博客-CSDN博客](https://blog.csdn.net/ViatorSun/article/details/118699938)

官网下载：[Microsoft C++ Build Tools - Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

![image-20230528143409438](./img/image-20230528143409438.png)

选择 Visual C++ 生成工具进行安装即可

![image-20230528144140873](./img/image-20230528144140873.png)



[Microsoft Visual C++ 14.0 is required._哈哈哈，冲冲冲的博客-CSDN博客](https://blog.csdn.net/qzzzxiaosheng/article/details/125119006)



### 2.3 安装 GDAL 与 rasterio


rasterio 是一个 python 看栅格图像的包，依赖于 GDAL 库。

```
numpy==1.20.2
geopandas==0.9.0
fiona==1.8.18
rasterio==1.2.3
descartes==1.1.0
scikit-learn==1.0.2
click==7.1.2
seaborn==0.12.2
tensorflow==2.10.0
```



```sh
pip install -r requirements.txt
```





### 2.3 安装机器学习相关库

```sh
pip install geopandas descartes scikit-learn
```

### 2.4 安装深度学习库

```sh
pip install tensorflow
```

```

```



