---
comments: true
---

# GEE 小技巧

### GEE求mean值后如何保证结果为整数？

如果你想要求mean值后得到整数，你可以使用toInt()方法来把结果转换成整数。例如：

```js
var mean = imageCollection.mean(); // mean is a float image
var intMean = mean.toInt(); // intMean is an integer image
```

### GEEMAP如何获取波段数？

可以使用image.bandNames()方法来获取一个图像的波段名称列表，然后使用list.size()方法来获取列表的长度，也就是波段数。

可以使用geemap.image_props()方法来获取一个图像的属性信息，包括波段数、波段名称、分辨率、投影等。

可以使用image.getInfo()方法来获取一个图像的详细信息，包括波段数、波段名称、数据类型、元数据等。

### toBands()是什么意思？

toBands() 是一个针对 ee.ImageCollection 的数学运算方法

- 它可以将一个图像集合转换成一个多波段的图像，其中每个波段对应于图像集合中的一个图像
- 它还可以将多个单波段的图像合并成一个多波段的图像，然后进行加减乘除等操作

### ee.Reducer.mean()和直接使用mean()有什么区别？

ee.Reducer.mean()是一个用于计算输入数据的平均值的Reducer对象，它可以用于对图像集合、图像、图像区域、图像邻域等进行空间或时间上的统计分析。

mean()是一个用于计算输入数据的平均值的方法，它可以直接应用于图像集合或图像，相当于调用reduce(ee.Reducer.mean())，但是不会在输出波段名称后面添加"_mean"。

ee.Reducer.mean()和mean()在功能上是相同的，都是用于计算输入数据的平均值，但是在输出波段名称上有所不同，ee.Reducer.mean()会在波段名称后面添加"_mean"，而mean()不会。

### gee怎么打印影像属性信息？

```js
// 加载一个影像
var image = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_044034_20140318');

// 打印影像对象，包括属性信息
print(image);

// 打印影像的ID
print(image.id());

// 打印影像的波段名称
print(image.bandNames());

// 打印影像的投影信息
print(image.projection());
```

还有很多其他的方法可以打印影像的属性信息，例如：

- 使用image.get()方法来获取影像的某个属性值，然后用print()函数输出。
- 使用image.propertyNames()方法来获取影像的所有属性名称，然后用print()函数输出。
- 使用image.toDictionary()方法来将影像的属性转换成一个字典对象，然后用print()函数输出。

### map() 函数原理

使用ee.ImageCollection.map()方法来对影像集合中每个影像应用已定义的函数

map()函数，它可以对一个影像集合（ImageCollection）中的每一个影像（Image）应用一个函数，并返回一个新的影像集合。所以，map()函数返回的是一个ee.ComputedObject类型的对象，它是Earth Engine中的一种数据类型，表示一个在服务器端计算的对象。