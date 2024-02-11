---
date: 2024-02-11
updated: 2024-02-11
author: Yuan Zexin
location: GDIIST, Zhuhai, Guangdong
tags:
  - Course
  - Neuron Science 2023
categories:
  - Neuron Science
---

# 神经系统的发生与分化

神经科学第四讲，讲者：赵春杰（东南大学），主持人：朱筱娟教授（东北师范大学）。

神经系统的发育中，有两个基本问题：胚胎发育过程中，神经组织是如何衍化而来的？神经组织是如何进一步发育为脑和脊髓及其不同功能区域的？

<!-- end -->

上一讲：[神经递质及受体（二）](../../../2023/12/21/neurotransmitters-receptors-2.md)

## 神经系统的早期发育

## 神经诱导和体轴决定

受精卵的发育过程中形成卵裂-囊胚-三胚层，神经系统由外胚层发育而来。另外一个与神经发育直接相关的是体轴的形成，即头尾轴-背腹轴-内外轴的形成。

### 人类个体发生至胎儿成熟

胚前期 (pre-embryonic) 通常为受精到 2 周末，包括受精、卵裂、胚泡形成、二胚层胚盘的出现。

胚期 (embryonic period) 通常为 3 周到 8 周末，包括三胚层的形成和分化，神经胚形成、各主要器官原基的建立，初具人形。神经诱导与体轴决定主要在胚期。

胎期 (fetal period) 通常为 9 周到出生，包括胎儿逐渐长大，各器官、系统进一步发育，功能建立。

### 原肠胚形成

#### 两栖类动物的原肠胚形成

囊胚细胞通过高度协调一致的细胞运动使得胚胎细胞重新排布的过程，称为原肠胚形成 (gastrulation)。胚胎发育为具有内胚层、中胚层和外胚层三个胚层的原肠胚。

![两栖类动物的原肠胚形成](./assets/gastrulation-amphibious.png)

#### 鸟类和哺乳类动物的原肠胚形成

鸟类和哺乳类动物的受精卵首先在输卵管内发育形成全能干细胞。

![全能干细胞的发育](./assets/gastrulation-mammalia.png)

发育到这一阶段后，受精卵从输卵管移动到子宫开始着床并逐渐形成三胚层。

![三胚层](./assets/triploblastic.png)

```mermaid
flowchart LR
  A("中细胞团(鸟类、哺乳类)") --> B(上胚层)
  B --> C("胚体外胚层（表皮及附属器官、神经系统）")
  B --> D("原条/胚孔（细胞迁移、内卷）")
  D --> E(胚胎中胚层)
  D --> F(胚胎内胚层)
  A --> G(下胚层) --> H(胚外组织)
```

### 神经发育

神经管：为中枢神经系统的原基将分化为脑和脊髓以及松果体、神经垂体、视网膜、内耳、嗅上皮和味觉上皮等。

神经嵴形成：神经管外侧的神经上皮细胞不进入神经管壁，而形成位于神经管背侧的细胞索，该细胞索很快分为左右两条，分列于神经管的背外侧，称为神经嵴。

神经嵴分化为：

1. 周围神经系统的神经节及周围神经；
2. 肾上腺髓质细胞，黑素细胞、甲状腺滤泡旁细胞、颈动脉体的 I 型细胞；
3. 头面部分骨、软骨、肌肉及大动脉根部。

外胚层表面的细胞将分化为皮肤的表皮及其附属器、牙釉质、角膜上皮、晶状体、内耳膜迷路、腺垂体、口腔、鼻腔与肛门的上皮。

### 神经诱导

神经诱导是神经组织从外胚层衍化的分子机制。

两栖类的背唇可以诱导形成神经系统（蝾螈背唇移植实验），类似的鸟类中有 Henson's node，哺乳类有 node。

## 两栖类背唇

背唇—--组织者（Spemann's organizer）：

1. 可诱导改变受体腹侧细胞的分化命运；
2. 可组织受体和供体的组织形成具有前-后和背-腹轴向的胚胎，因此，背唇又被称为组织者（organizer）；
3. 背唇组织者本质上是中胚层细胞。

背唇功能：

1. 具有形成背方中胚层的功能，脊索前板、脊索
2. 启动原肠形成的细胞迁移
3. 使背方外胚层神经化
4. 神经板的基本定型和使神经板成为神经管

### 背唇如何诱导成为神经组织？

**神经诱导的双重抑制假说**：外胚层具有形成神经组织的潜能，但是潜能被某些因子（BMP等）所抑制，当这些因子的抑制作用被阻断后，外胚层细胞产生神经组织的潜能得以发挥，进而形成神经组织。

背唇分泌 NOGGIN、CHORDIN、FOLLISTATIN 等蛋白，可阻断BMP信号通路，使背侧外胚层发育形成神经板。

### 神经系统的发育

```mermaid
flowchart LR
  subgraph G [继续发育分化]
    direction TB
    G1(中枢神经系统（脑和脊髓）)
    G2(神经垂体)
    G3(视网膜)
    G4(松果体)
  end

  subgraph J [继续发育分化]
    direction TB
    J1(周围神经)
    J2(肾上腺髓质)
  end

  A(神经板) --> 神经沟 --> B(神经管)
  A --> 神经褶 --> C(神经嵴)
  B --> G1
  B --> G2
  B --> G3
  B --> G4
  C --> J1
  C --> J2
```

神经管继续发育分化形成中枢神经系统：

- 形态：形状发生急剧变化，神经管各部位或膨胀、或压缩，最终形成大脑（brain）、脊髓（spinal cord）的各部位及各个腔室。
- 解剖结构：神经管壁的神经上皮细胞（神经干细胞）经过不断的增殖、迁移发育形成大脑和脊髓各个不同区域的组织
- 细胞水平：神经上皮细胞分化产生种类繁多的神经元和神经胶质细胞

### 神经管发育形成脑和脊髓及其不同功能区

![神经管的继续发育分化](./assets/neural-tube.png)

![体轴的形成1](./assets/body-axes-1.png)

![体轴的形成2](./assets/body-axes-2.png)

![体轴的形成3](./assets/body-axes-3.png)

## References

- 神经科学课程
- 神经科学，韩济生主编
- 发育神经生物学，蔡文琴主编
- NEUROSCIENCE Edited by DALE PURVAES et al.
- PRICIPLES of NEURAL SCIENCE Edited by ERIC R. KANDEL et al
- DEVELOPMENTAL NEUROBIOLOGY Edited by ERIC MAHENDRA S. RAO and MARCUS JACOBSON
- THE DEVELOPING HUMAN-CLINNICALLY ORIENTED EMBRYOLOGY Edited BY Keith L., Moore, et al.
- LARSEN'S HUMAN EMBRYOLOGY Edited BY GARY C. SCHOENWOLF et al.
- LANGMAN's MEDICAL EMBRYOLOGY Edited by T.W.SADLER
