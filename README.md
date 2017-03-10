
[![NPM](https://nodei.co/npm/vue-feedback.png)](https://github.com/hjc22/vue-feedback)

[![npm](https://img.shields.io/npm/dm/vue-feedback.svg)]()


# vue-feedback

> Vue v2.0 自定义指令

顾名思义，这个是为vue移动端项目打造的触摸反馈指令，比如点击一个按钮会有样式反馈;默认是透明度的变化反馈，当然你也可以自定义样式；

## 安装步骤

``` bash
# 安装 npm 模块
npm install vue-feedback --save

#项目引入
import vueFeedback from 'vue-feedback'

# vue.use()加载
Vue.use(vueFeedback)

# 组件内使用
<button v-fb>按钮</button>

# 高级用法(自定义样式，添加写好的class名)
<button v-fb="{cls:'buttonActive'}"

```
