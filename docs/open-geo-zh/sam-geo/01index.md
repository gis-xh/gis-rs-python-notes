# Segment - Geospatial



## 基本介绍

&emsp;&emsp;leafmap：由于并非地理空间社区中的每个人都可以访问 GEE 云计算平台。Leafmap 旨在为非 GEE 用户填补这一空白。它是一个免费的开源 Python 包，使用户能够在 Jupyter 环境（例如 Google Colab、Jupyter Notebook 和 JupyterLab）中以最少的编码分析和可视化地理空间数据。

- 官网：https://leafmap.org/

- GitHub：https://github.com/opengeos/leafmap



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

