---
date: 2024-07-12
updated: 2024-07-12
author: Zexin Yuan
location: GDIIST, Zhu Hai, Guang Dong, China
tags:
  - Paper
  - Software
  - Deep learning
categories:
  - Biology
---

# ImJoy

深度学习方法在各生物医学数据的分析上取得了显著效果，但是要想训练深度学习模型通常需要了解硬件平台、数据、python 脚本等，对于没有编程经验的学者并非易事。

ImJoy (Ouyang W. et al., Nature Methods Correspondence, 2019) 是一个使用 Web 技术 + 插件系统 + Deep Learning 的软件提供各类图像分析功能。

![ImJoy](https://github.com/imjoy-team/ImJoy/raw/master/docs/assets/imjoy-overview.jpg)


## 技术选型

Web 网页

可以将网页使用 electron 技术打包，然后与本地服务器组合后以软件形式运行。文章号称使用了 WebGPU 技术，但我没有发现除了图标外的任何痕迹。文章的设计思路是将所有插件都放在 web 端跑，只有在浏览器端资源不足的情况下才翻到服务器跑

插件系统与 python 运行时

不同于 ilastik，ImJoy 选择的是微内核 + “奇怪”的插件系统，内核只提供了最小化的组件，包括插件管理器、窗口管理、通知系统。我认为这有点过度的通用化设计，徒增开发难度。

所谓插件系统的 “奇怪”，主要是因为插件多数使用 python 编写，通过 pyodide 项目将 python 编译到 WebAssembly 运行，同时提供了 javascript 和 python 两套 API 和 RPC 用于插件通讯。这种选择的好处是可以方便的融入很多 python 现有的科学分析软件生态，缺点是进一步提高了开发难度。

[ImJoy-rpc](https://github.com/imjoy-team/imjoy-rpc/) 项目提供了一个 RPC 实现，用于提供 plugin 和 plugin engine 间的通讯，ImJoy 上的通讯还会更加复杂一些，需要考虑 Python 和 javascript 间跨语言通讯。这是插件系统需要考虑的一个关键模块，尤其是应用在图像数据时，传输数据量直接决定了软件性能。但是遗憾的是，看起来这个项目主要是实现了 languages binding，绝大部分数据还是以序列化方式传输。


## 写作

文章最初的版本中以 plugin 为单位组织，整体写的像是技术说明文档，甚至于格式都是 `Plugin-A: install URL, How to use`，发表版本中这一部分被移动到了 supplementary note。这些插件之间并没有形成一个完整的故事，每个插件更像是对一种现有工具的 GUI wrapper。这种写法与 ilastik 以 workflows 组织的写法相比，没有能够突出每个插件的目的，显得整篇文章非常乱。

文章的故事线还是写的不错的：
- Deep Learning 方法在医学图像分析中崭露头角，包括图像分割、医学诊断、医学图像增强
- 生物研究者有需求将这些方法应用到他们自己的图像上，但是使用起来是有困难的：
  - 一是模型在新的数据上会 mismatch；
  - 二是每个模型 retrain 流程都不同，且模型的 retrain 没有一个 general rule；
  - 三是通过命令行使用/训练模型对于缺少编程技能的 researcher 并非易事。
- 使用云服务是一种可能的策略，但是传输数据会设计数据隐私问题。
- ImJoy: open-source, easy-to-use, interactive UI ....

But，文章故事虽然这么讲，但软件并没有解决这些挑战。文章只说了 retrain 发生在服务器上，但没有说清它是如何简化用户操作，训练等复杂的事情都被一股脑扔给了插件开发者。


## 思考
这篇文章与 ilastik 处于同一时间投稿，但是只发到了 Nature Methods 的 Correspondence，个人理解是被拒了后以豆腐干形式（2页）发了出来。项目在经过 1800 个 commits，收获 181 stars 后，在 2020 年初陆续停止更新。

作者 Wei Ouyang 在后续还有其他工作，BioImage Model Zoo[(website)](https://bioimage.io/) ， 是一套用于生物 DL model 共享的标准，现在大约有 60+ models，2022 年挂在了 biorxiv 上，收获了 41 个引用，但是也没有了后续。作者还有一个 Web 版的 ImageJ 项目[ImageJ.JS](https://cnij.imjoy.io/)，技术上十分有趣。

idea：
- 这篇文章的软件在技术栈上和我的设想有着很大的重合：Modern Web 技术、Deep Learning 技术、插件系统。这类软件在技术上会很有意思，但是想要发 paper 需要明确的目标、面向人群，否则插件系统设计很容易让人越想越远。
- 随着 WebGPU 的稳定，市面上已经出现了一些 WebGPU-based ONNX runtime，也有 Web 端运行的项目如 WebGPT 出现。从技术上我们有希望在浏览器端跑起来一些模型，并且这些方法是真正无需配置环境的（全部由浏览器解决）。缺点是通常考虑支持推理阶段，使用 pytorch 等框架训练后导出到 ONNX 格式。

1. Ouyang, W., Mueller, F., Hjelmare, M., Lundberg, E. & Zimmer, C. ImJoy: an open-source computational platform for the deep learning era. *Nat Methods* **16**, 1199–1200 (2019).

