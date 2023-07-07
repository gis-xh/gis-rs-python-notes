# Segment - Geospatial



## 基本介绍

&emsp;&emsp;segment-geospatial 包的灵感来自[Aliaksandr Hancharenka](https://github.com/aliaksandr960)编写的[segment-anything-eo](https://github.com/aliaksandr960/segment-anything-eo)存储库。为了便于将 Segment Anything Model (SAM) 用于地理空间数据，吴秋生老师开发了[segment-anything-py](https://github.com/opengeos/segment-anything)和[segment-geospatial](https://github.com/opengeos/segment-geospatial) Python 包，现在可在 PyPI 和 conda-forge 上使用。主要目标是简化利用 SAM 进行地理空间数据分析的过程，让用户能够以最少的编码工作实现这一点。吴秋生老师从 [segment-anything-eo](https://github.com/aliaksandr960/segment-anything-eo) 存储库中改编了 segment-geospatial 的源代码，其原始版本归功于 Aliaksandr Hancharenka。

- 官网：https://samgeo.gishub.org/

- GitHub：https://github.com/opengeos/segment-geospatial



## 衍生扩展

### 树木提取

&emsp;&emsp;使用Segment -geospatial v0.5和Segment Anything Model (SAM)从卫星图像中提取树木——由 Lucas Prado Osco提供

- LinkedIn post: https://www.linkedin.com/posts/lucas-osco_segmentanything-geospatial-deeplearning-activity-7062293462477418496-Qzs7

- Notebook: https://github.com/LucasOsco/RemoteSensingAI/blob/main/SegmentGeospatial_Point_vShared.ipynb





### GEE 支持

&emsp;&emsp;基于 Segment Anything Model (SAM) 的 GEE 遥感影像自动分割

官网：https://samgeo.gishub.org/

- Notebook: https://geemap.org/notebooks/135_segmentation

- GitHub: https://github.com/opengeos/segment-geospatial









## 环境配置

### 使用官方镜像源安装

```sh
pip install segment-geospatial -i https://pypi.python.org/simple
```

在安装时可能会出现如下错误：

```sh
Building wheels for collected packages: pycocotools
  Building wheel for pycocotools (pyproject.toml) ... error
  error: subprocess-exited-with-error

  × Building wheel for pycocotools (pyproject.toml) did not run successfully.
  │ exit code: 1
  ╰─> [16 lines of output]
      running bdist_wheel
      running build
      running build_py
      creating build
      creating build\lib.win-amd64-cpython-39
      creating build\lib.win-amd64-cpython-39\pycocotools
      copying pycocotools\coco.py -> build\lib.win-amd64-cpython-39\pycocotools       
      copying pycocotools\cocoeval.py -> build\lib.win-amd64-cpython-39\pycocotools   
      copying pycocotools\mask.py -> build\lib.win-amd64-cpython-39\pycocotools       
      copying pycocotools\__init__.py -> build\lib.win-amd64-cpython-39\pycocotools   
      running build_ext
      cythoning pycocotools/_mask.pyx to pycocotools\_mask.c
      C:\Users\Evolto\AppData\Local\Temp\pip-build-env-f254pz2l\overlay\Lib\site-packages\Cython\Compiler\Main.py:369: FutureWarning: Cython directive 'language_level' not set, using 2 for now (Py2). This will change in a later release! File: C:\Users\Evolto\AppData\Local\Temp\pip-install-upx_j1d1\pycocotools_367defad2a9241128b6de8f51e718eaf\pycocotools\_mask.pyx
        tree = Parsing.p_module(s, pxd, full_module_name)
      building 'pycocotools._mask' extension
      error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
      [end of output]

  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for pycocotools
Failed to build pycocotools
ERROR: Could not build wheels for pycocotools, which is required to install pyproject.toml-based projects
```

&emsp;&emsp;使用 conda 来安装 pycocotools 包，这样可以避免编译的问题。

```sh
conda install -c conda-forge pycocotools -y
```

