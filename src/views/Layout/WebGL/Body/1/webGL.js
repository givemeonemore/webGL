// 创建着色器对象
/**
 *
 * @param {*} gl 获取到的WebGL上下文
 * @param {string} vertexSource 顶点着色器代码
 * @param {string} fragmentSource 片元着色器代码
 * @param {boolean}
 */
export function buildProgram(
  gl,
  vertexSource,
  fragmentSource,
  isReturnProgram = false
) {
  // 创建顶点着色器对象
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  // 创建片元着色器对象
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  let program = gl.createProgram(); // 创建程序
  // 用程序绑定着色器将着色器对象绑定到着色器程序对象
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 开始连接程序,把顶点着色器对象和片元着色器对象关联起来，以保证顶点着色器对象和片元着色器对象可以配合执行
  gl.linkProgram(program);
  // 查询程序对象的连接状态
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    this.$Messgae.error("程序链接失败！");
  }
  gl.useProgram(program);
  if (isReturnProgram) {
    return program;
  }
}

function createShader(gl, type, source) {
  // 创建着色器对象
  let shader = gl.createShader(type);
  // 将着色器代码写到着色器对象中
  gl.shaderSource(shader, source);
  // 编译着色器
  gl.compileShader(shader);
  // 检查着色器是否编译成功
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let info = gl.getShaderInfoLog(shader);
    this.$Messgae.error("着色器编译失败：" + info);
  }
  return shader;
}

export function initBufferObject(gl, data, size, location) {
  // 创建顶点左边缓冲区对象
  let buffer = gl.createBuffer();
  // 绑定缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // 给缓冲区填充数据
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // 把缓冲区对象分配给attitude变量，即定义的aPosition 或 aPointSize
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(location);
}

// export default buildProgram;
