import loadModules from "@/utils/loadModules";

const subclassingLayerType = async function(pt, glMatrix) {
  const {
    GraphicsLayer,
    BaseLayerViewGL2D,
    watchUtils,
    promiseUtils
  } = await loadModules(
    "esri/layers/GraphicsLayer",
    "esri/views/2d/layers/BaseLayerViewGL2D",
    "esri/core/watchUtils",
    "esri/core/promiseUtils"
  );
  // 从BaseLayerViewGL2D子类化自定义图层视图
  let CustomLayerView2D = BaseLayerViewGL2D.createSubclass({
    aPosition: 0,
    aOffset: 5,

    constructor: function() {
      // 必须在每一帧从头开始重新计算几何变换
      // $glMatrix 是一个图形计算矩阵库，里面包含多个计算矩阵，具体方法可参考http://glmatrix.net/docs/index.html

      this.transform = glMatrix.mat3.create();
      this.translationToCenter = glMatrix.vec2.create();
      this.screenTranslation = glMatrix.vec2.create();

      // 进行几何变换的时候每帧只需更新几个元素。这些元素用NaN标记
      this.display = glMatrix.mat3.fromValues(NaN, 0, 0, 0, NaN, 0, -1, 1, 1);
      this.screenScaling = glMatrix.vec3.fromValues(NaN, NaN, 1);

      // Whether the vertex and index buffers need to be updated
      // due to a change in the layer data.
      this.needsUpdate = false;

      // We listen for changes to the graphics collection of the layer
      // and trigger the generation of new frames. A frame rendered while
      // `needsUpdate` is true may cause an update of the vertex and
      // index buffers.
      let requestUpdate = () => {
        this.needsUpdate = true;
        this.requestRender();
      };

      this.watcher = watchUtils.on(
        this,
        "layer.graphics",
        "change",
        requestUpdate,
        requestUpdate,
        requestUpdate
      );
    },
    // 一旦自定义层添加到地图图层集合,此层视图被实例化
    attach: function() {
      let gl = this.context;
      // 定义和编译着色器
      let vertexSource = `
        precision highp float;
        uniform mat3 u_transform;
        uniform mat3 u_display;
        attribute vec2 a_position;
        attribute vec2 a_offset;
        varying vec2 v_offset;
        const float SIZE = 70.0;
        void main() {
          gl_Position.xy = (u_display * (u_transform * vec3(a_position, 1.0) + vec3(a_offset * SIZE, 0.0))).xy;;
          gl_Position.zw = vec2(0.0, 1.0);
          v_offset = a_offset;
        }
      `;

      let fragmentSource = `
        precision highp float;
        uniform float u_current_time;
        varying vec2 v_offset;
        const float PI = 3.14159;
        const float N_RINGS = 3.0;
        const vec3 COLOR = vec3(0.0, 0.0, 1.0);
        const float FREQ = 1.0;
        void main() {
          float l = length(v_offset);
          float intensity = clamp(cos(l * PI), 0.0, 1.0) * clamp(cos(2.0 * PI * (l * 2.0 * N_RINGS - FREQ * u_current_time)), 0.0, 1.0);
          gl_FragColor = vec4(COLOR * intensity, intensity);
        }
      `;

      let vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexSource);
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert(
          "在编译顶点着色器的时候出现该错误: " +
            gl.getShaderInfoLog(vertexShader)
        );
        gl.deleteShader(vertexShader);
        return null;
      }
      let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentSource);
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert(
          "在编译片元着色器的时候出现该错误: " +
            gl.getShaderInfoLog(fragmentShader)
        );
        gl.deleteShader(fragmentShader);
        return null;
      }

      // 创建着色器程序
      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);

      // 绑定属性.
      gl.bindAttribLocation(this.program, this.aPosition, "a_position");
      gl.bindAttribLocation(this.program, this.aOffset, "a_offset");

      // 连接着色器程序.
      gl.linkProgram(this.program);

      // 查询程序对象的连接状态
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.log("程序链接失败！");
        return;
      }

      // 删除不再使用的着色器对象，可做可不做.
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      // 获取特定的Uniform变量的位置.
      this.uTransform = gl.getUniformLocation(this.program, "u_transform");
      this.uDisplay = gl.getUniformLocation(this.program, "u_display");
      this.uCurrentTime = gl.getUniformLocation(this.program, "u_current_time");

      // 创建顶点和索引缓冲区。我们使用索引绘图，它们最初是空的。我们需要跟踪索引缓冲区的大小
      this.vertexBuffer = gl.createBuffer();
      this.indexBuffer = gl.createBuffer();

      // 定义索引缓冲区中的索引数.
      this.indexBufferSize = 0;

      //当某些情况发生时，我们更新缓冲区并重新计算和编码所有的属性。当缓冲区更新发生时，我们还要注意当前的中心我们将一个名为“translationToCenter”的向量
      //重置为[0，0]，这意味着当前中心与重新计算属性时相同。
      this.centerAtLastUpdate = glMatrix.vec2.fromValues(
        this.view.state.center[0],
        this.view.state.center[1]
      );
    },
    // 删除自定义层后调用地图图层集合和此层视图被销毁.
    detach: function() {
      // 停止`layer.graphics图层`监听器.
      this.watcher.remove();
      let gl = this.context;

      // 删除缓冲区和程序.
      gl.deleteBuffer(this.vertexBuffer);
      gl.deleteBuffer(this.indexBuffer);
      gl.deleteProgram(this.program);
    },
    // 每次渲染帧时调用
    render: function(renderParameters) {
      let gl = renderParameters.context;
      let state = renderParameters.state;

      //更新顶点位置。这可能会触发更新顶点缓冲区中包含的顶点坐标。
      //有三种更新：
      // 1、-修改layer.graphics图层集合==>缓冲区更新
      // 2、-视图状态变为非静态==>仅更新视图，不更新缓冲区
      // 3、-视图状态变为静止==>缓冲区更新
      this.updatePositions(renderParameters);

      if (this.indexBufferSize === 0) {
        return;
      }

      // 更新视图“transform”矩阵；它将地图单位转换为像素.
      glMatrix.mat3.identity(this.transform);
      this.screenTranslation[0] = (state.pixelRatio * state.size[0]) / 2;
      this.screenTranslation[1] = (state.pixelRatio * state.size[1]) / 2;
      glMatrix.mat3.translate(
        this.transform,
        this.transform,
        this.screenTranslation
      );
      glMatrix.mat3.rotate(
        this.transform,
        this.transform,
        (Math.PI * state.rotation) / 180
      );
      this.screenScaling[0] = state.pixelRatio / state.resolution;
      this.screenScaling[1] = -state.pixelRatio / state.resolution;
      glMatrix.mat3.scale(this.transform, this.transform, this.screenScaling);
      glMatrix.mat3.translate(
        this.transform,
        this.transform,
        this.translationToCenter
      );

      // Update view `display` matrix; it converts from pixels to normalized device coordinates.
      this.display[0] = 2 / (state.pixelRatio * state.size[0]);
      this.display[4] = -2 / (state.pixelRatio * state.size[1]);

      // Draw.
      gl.useProgram(this.program);
      gl.uniformMatrix3fv(this.uTransform, false, this.transform);
      gl.uniformMatrix3fv(this.uDisplay, false, this.display);
      gl.uniform1f(this.uCurrentTime, performance.now() / 1000.0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.enableVertexAttribArray(this.aPosition);
      gl.enableVertexAttribArray(this.aOffset);
      gl.vertexAttribPointer(this.aPosition, 2, gl.FLOAT, false, 16, 0);
      gl.vertexAttribPointer(this.aOffset, 2, gl.FLOAT, false, 16, 8);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawElements(gl.TRIANGLES, this.indexBufferSize, gl.UNSIGNED_SHORT, 0);

      // Request new render because markers are animated.
      this.requestRender();
    },

    // Called by the map view or the popup view when hit testing is required.
    hitTest: function(x, y) {
      // The map view.
      let view = this.view;

      if (this.layer.graphics.length === 0) {
        // Nothing to do.
        return promiseUtils.resolve(null);
      }

      // Compute screen distance between each graphic and the test point.
      let distances = this.layer.graphics.map(graphic => {
        let graphicPoint = view.toScreen(graphic.geometry);
        return Math.sqrt(
          (graphicPoint.x - x) * (graphicPoint.x - x) +
            (graphicPoint.y - y) * (graphicPoint.y - y)
        );
      });

      // Find the minimum distance.
      let minIndex = 0;

      distances.forEach((distance, i) => {
        if (distance < distances.getItemAt(minIndex)) {
          minIndex = i;
        }
      });

      let minDistance = distances.getItemAt(minIndex);

      // If the minimum distance is more than 35 pixel then nothing was hit.
      if (minDistance > 35) {
        return promiseUtils.resolve(null);
      }

      // Otherwise it is a hit; We set the layer as the source layer for the graphic
      // (required for the popup view to work) and we return a resolving promise to
      // the graphic.
      let graphic = this.layer.graphics.getItemAt(minIndex);
      graphic.sourceLayer = this.layer;
      return promiseUtils.resolve(graphic);
    },

    // Called internally from render().
    updatePositions: function(renderParameters) {
      if (!this.centerAtLastUpdate) {
        return;
      }
      let gl = renderParameters.context;
      let stationary = renderParameters.stationary;
      let state = renderParameters.state;

      // If we are not stationary we simply update the `translationToCenter` vector.
      if (!stationary) {
        glMatrix.vec2.sub(
          this.translationToCenter,
          this.centerAtLastUpdate,
          state.center
        );
        this.requestRender();
        return;
      }

      // If we are stationary, the `layer.graphics` collection has not changed, and
      // we are centered on the `centerAtLastUpdate`, we do nothing.
      if (
        !this.needsUpdate &&
        this.translationToCenter[0] === 0 &&
        this.translationToCenter[1] === 0
      ) {
        return;
      }

      // Otherwise, we record the new encoded center, which imply a reset of the `translationToCenter` vector,
      // we record the update time, and we proceed to update the buffers.

      // this.centerAtLastUpdate.set(state.center);
      glMatrix.vec2.set(state.center);
      this.translationToCenter[0] = 0;
      this.translationToCenter[1] = 0;
      this.needsUpdate = false;

      let graphics = this.layer.graphics;

      // Generate vertex data.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      let vertexData = new Float32Array(16 * graphics.length);

      let i = 0;
      graphics.forEach(graphic => {
        let point = graphic.geometry;

        // The (x, y) position is relative to the encoded center.
        let x = point.x - this.centerAtLastUpdate[0];
        let y = point.y - this.centerAtLastUpdate[1];

        vertexData[i * 16 + 0] = x;
        vertexData[i * 16 + 1] = y;
        vertexData[i * 16 + 2] = -0.5;
        vertexData[i * 16 + 3] = -0.5;
        vertexData[i * 16 + 4] = x;
        vertexData[i * 16 + 5] = y;
        vertexData[i * 16 + 6] = 0.5;
        vertexData[i * 16 + 7] = -0.5;
        vertexData[i * 16 + 8] = x;
        vertexData[i * 16 + 9] = y;
        vertexData[i * 16 + 10] = -0.5;
        vertexData[i * 16 + 11] = 0.5;
        vertexData[i * 16 + 12] = x;
        vertexData[i * 16 + 13] = y;
        vertexData[i * 16 + 14] = 0.5;
        vertexData[i * 16 + 15] = 0.5;

        ++i;
      });

      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

      // Generates index data.
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

      let indexData = new Uint16Array(6 * graphics.length);
      for (let i = 0; i < graphics.length; ++i) {
        indexData[i * 6 + 0] = i * 4 + 0;
        indexData[i * 6 + 1] = i * 4 + 1;
        indexData[i * 6 + 2] = i * 4 + 2;
        indexData[i * 6 + 3] = i * 4 + 1;
        indexData[i * 6 + 4] = i * 4 + 3;
        indexData[i * 6 + 5] = i * 4 + 2;
      }

      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);

      // Record number of indices.
      this.indexBufferSize = indexData.length;
    }
  });

  let CustomLayer = GraphicsLayer.createSubclass({
    createLayerView: function(view) {
      // We only support MapView, so we only need to return a
      // custom layer view for the `2d` case.
      if (view.type === "2d") {
        return new CustomLayerView2D({
          view: view,
          layer: this
        });
      }
    }
  });

  let layer = new CustomLayer({
    popupTemplate: {
      title: "测试",
      content: "Population: 好多人"
    },
    graphics: [
      {
        geometry: pt,
        attributes: {
          NAME: "SHANG HAI",
          POPULATION: 8175133
        }
      }
    ]
  });

  return layer;
};

export default subclassingLayerType;
