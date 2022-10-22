# three.js

## 链接
[入门文档](https://threejs.org/manual/#zh/fundamentals)

## 基本定义

1. Renderer
首先有一个渲染器(Renderer)。这可以说是three.js的主要对象。你传入一个场景(Scene)和一个摄像机(Camera)到渲染器(Renderer)中，然后它会将摄像机视椎体中的三维场景渲染成一个二维图片显示在画布上。

2. Scene
其次有一个场景图 它是一个树状结构，由很多对象组成，比如图中包含了一个场景(Scene)对象 ，多个网格(Mesh)对象，光源(Light)对象，群组(Group)，三维物体(Object3D)，和摄像机(Camera)对象。一个场景(Scene)对象定义了场景图最基本的要素，并包了含背景色和雾等属性。这些对象通过一个层级关系明确的树状结构来展示出各自的位置和方向。子对象的位置和方向总是相对于父对象而言的。比如说汽车的轮子是汽车的子对象，这样移动和定位汽车时就会自动移动轮子。你可以在场景图的这篇文章中了解更多内容。

3. Camera
注意图中摄像机(Camera)是一半在场景图中，一半在场景图外的。这表示在three.js中，摄像机(Camera)和其他对象不同的是，它不一定要在场景图中才能起作用。相同的是，摄像机(Camera)作为其他对象的子对象，同样会继承它父对象的位置和朝向。在场景图这篇文章的结尾部分有放置多个摄像机(Camera)在一个场景中的例子。

4. Mesh
网格(Mesh)对象可以理解为用一种特定的材质(Material)来绘制的一个特定的几何体(Geometry)。材质(Material)和几何体(Geometry)可以被多个网格(Mesh)对象使用。比如在不同的位置画两个蓝色立方体，我们会需要两个网格(Mesh)对象来代表每一个立方体的位置和方向。但只需一个几何体(Geometry)来存放立方体的顶点数据，和一种材质(Material)来定义立方体的颜色为蓝色就可以了。两个网格(Mesh)对象都引用了相同的几何体(Geometry)和材质(Material)。

5. Geometry
几何体(Geometry)对象顾名思义代表一些几何体，如球体、立方体、平面、狗、猫、人、树、建筑等物体的顶点信息。Three.js内置了许多基本几何体 。你也可以创建自定义几何体或从文件中加载几何体。

6. Material
材质(Material)对象代表绘制几何体的表面属性，包括使用的颜色，和光亮程度。一个材质(Material)可以引用一个或多个纹理(Texture)，这些纹理可以用来，打个比方，将图像包裹到几何体的表面。

7. Texture
纹理(Texture)对象通常表示一幅要么从文件中加载，要么在画布上生成，要么由另一个场景渲染出的图像。

8. Light
光源(Light)对象代表不同种类的光。

## 摄像机

1. 透视摄像机

```js
const fov = 75;
const aspect = 2;  // 相机默认值
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

fov是视野范围(field of view)的缩写。上述代码中是指垂直方向为75度。 注意three.js中大多数的角用弧度表示，但是因为某些原因透视摄像机使用角度表示。

aspect指画布的宽高比。我们将在别的文章详细讨论，在默认情况下 画布是300x150像素，所以宽高比为300/150或者说2。

near和far代表近平面和远平面，它们限制了摄像机面朝方向的可绘区域。 任何距离小于或超过这个范围的物体都将被裁剪掉(不绘制)。

这四个参数定义了一个 "视椎(frustum)"。 视椎(frustum)是指一个像被削去顶部的金字塔形状。换句话说，可以把"视椎(frustum)"想象成其他三维形状如球体、立方体、棱柱体、截椎体。

<img src="../../.vuepress/public/imgs/front/front_learn/threejs/frustum-3d.svg" height="400px"/>

近平面和远平面的高度由视野范围决定，宽度由视野范围和宽高比决定。

视椎体内部的物体将被绘制，视椎体外的东西将不会被绘制。

摄像机默认指向Z轴负方向，上方向朝向Y轴正方向。我们将会把立方体放置在坐标原点，所以我们需要往后移一下摄像机才能显示出物体。

## 可能的问题

1. 拉伸问题

将相机的宽高比设置为canvas的宽高比。 我们可以通过canvas的clientWidth和clientHeight属性来实现。

我们需要将渲染循环变成这样。

```js
function render(time) {
  time *= 0.001;
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}
```

canvas大小被调整了那函数会返回true。我们可以利用 这个来检查是否有其他的东西应该更新。我们修改渲染循环 来使用我们的新函数。

```js
function render(time) {
  time *= 0.001;
 
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
 
  ...
```
因为只有canvas的显示尺寸变化时宽高比才变化所以我们 只在resizeRendererToDisplaySize函数返回true时才设置摄像机的宽高比。

## 材质

1. MeshBasicMaterial 不受光照的影响

2. MeshLambertMaterial 只在顶点计算光照

3. MeshPhongMaterial 则在每个像素计算光照，MeshPhongMaterial 还支持镜面高光，MeshPhongMaterial 的 shininess 设置决定了镜面高光的光泽度。它的默认值是30

4. MeshToonMaterial 与 MeshPhongMaterial 类似，但有一个很大的不同。它不是平滑地着色，而是使用一个渐变图（一个X乘1的纹理（X by 1 texture））来决定如何着色。默认使用的渐变图是前70%的部分使用70%的亮度，之后的部分使用100%的亮度

5. MeshPhongMaterial 和 MeshStandardMaterial 最大的区别是它们使用的参数不同。MeshPhongMaterial 有一个参数用来设置 shininess 属性。MeshStandardMaterial 有2个参数用来分别设置 roughness 和 metalness 属性。

在基本层面，roughness 是 shininess 的对立面。粗糙度（roughness）高的东西，比如棒球，就不会有很强烈的反光，而不粗糙的东西，比如台球，就很有光泽。粗糙度的范围从0到1。

另一个设定，metalness，说的是材质的金属度。金属与非金属的表现不同。0代表非金属，1代表金属。

6. MeshPhysicalMaterial 与 MeshStandardMaterial 相同，但它增加了一个clearcoat 参数，该参数从0到1，决定了要涂抹的清漆光亮层的程度，还有一个 clearCoatRoughness 参数，指定光泽层的粗糙程度。

7. ShadowMaterial 用于获取阴影创建的数据。

8. MeshDepthMaterial 渲染每个像素的深度，其中处在摄像机负近端面的像素其深度为0，处在摄像机负远端面的像素其深度为1。

9. MeshNormalMaterial 会显示几何体的法线。法线是一个特定的三角形或像素所面对的方向。MeshNormalMaterial 会绘制视图空间法线（相对于摄像机的法线）。x 是红色, y 是绿色, 以及 z 是蓝色，所以朝向右边的东西是粉红色，朝向左边的是水蓝色，朝上的是浅绿色，朝下的是紫色，朝向屏幕的是淡紫色。

10. ShaderMaterial 是通过three.js的着色器系统来制作自定义材质

11. RawShaderMaterial 则是可以用来制作完全自定义的着色器，不需要three.js的帮助。

`属性`

flatShading
对象是否使用平面着色，默认为`false`。

side
要显示三角形的哪个面。默认值是 `THREE.FrontSide`，其他选项有 `THREE.BackSide` 和 `THREE.DoubleSide`（正反两面）。

## 光照

1. 环境光（AmbientLight）
环境光 （AmbientLight）只是简单地将材质的颜色与光照颜色进行叠加（PhotoShop 里的正片叠底模式），再乘以光照强度。

2. 半球光（HemisphereLight）的颜色是从天空到地面两个颜色之间的渐变，与物体材质的颜色作叠加后得到最终的颜色效果。一个点受到的光照颜色是由所在平面的朝向（法向量）决定的 —— 面向正上方就受到天空的光照颜色，面向正下方就受到地面的光照颜色，其他角度则是两个颜色渐变区间的颜色。

3. 方向光（DirectionalLight）常常用来表现太阳光照的效果。