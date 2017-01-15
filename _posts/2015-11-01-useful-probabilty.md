---
layout: post
title: Probability
excerpt: "useful probability"
tags: [probability]
categories: [math]
---


## 1. Moment Generating Function

Given random variable \\(X\\), its moment generating function is defined as,

$$
g(t) = E(e^{tX}),
$$

**Property**: 

$$
\frac{d^n}{d t^n}g(t)|_{t=0} = \mu_n,
$$

where \\(\mu_n\\) is the order n moment.


## 2. Large Deviation

### 2.1 Markov's Theorem
If $$R$$ is a non-negative random variable, then for any $$x >0 $$, we have,

$$\mathbb{P}(R \ge x) \le \frac{\mathbb{E}(R)}{x}.$$

_proof_: 


**Corollary**: If $$R$$ is a non-negative r.v., then for any $$c > 0$$,

$$\mathbb{P}(R \ge c \mathbb{E}(R)) \le \frac{1}{c}.$$


**Corollary**: If $$R \le u$$ for some $$u \in \mathbb{R}$$, then for any $$x < u$$,

$$\mathbb{P}(R \le x) \le \frac{u - \mathbb{E}(R)}{u-x}.$$

### 2.2 Chebyshev's Theorem
For any $$x > 0$$ and any r.v. $$R$$,

$$\mathbb{P}(\mid R - \mathbb{R} \mid \ge x) \le \frac{Var(R)}{x^2}.$$

**Corollary**: For any $$c > 0$$,

$$\mathbb{P}(\mid R - \mathbb{R}\mid \ge c \sigma(R)) \le \frac{1}{c^2}.$$

**Theorem**: For any r.v. $$R$$,

$$\mathbb{P}(R - \mathbb{E}(R) \ge c \sigma(R)) \le \frac{1}{c^2 + 1}.$$

$$\mathbb{P}(R - \mathbb{E}(R) \le - c \sigma(R)) \le \frac{1}{c^2 + 1}.$$

### 2.3 Chernoff Bound
Let $$T_1, T_2, T_3, ..., T_n$$ be any mutually independent r.v.'s such that for any $$j \in \{1,2,3,...,n\}$$, $$0 \le T_j \le 1$$. Let $$T = \sum_{j = 1}^n T_j$$, then for any $$c > 1$$,

$$\mathbb{P}(T \ge c \mathbb{E}(T)) \le e^{-z\mathbb{E}(T)}$$

where $$z = c \ln c + 1 - c > 0$$.


## 3. Bayes's Rule

### 3.1. Discrete Case

$$\mathbb{P}_{X|Y}(x\mid y) = \frac{\mathbb{P}_{X,Y}(x,y)}{\mathbb{P}_Y(y)} = \frac{\mathbb{P}_X(x)\mathbb{P}_{Y|X}(y\mid x)}{\mathbb{P}_Y(y)}.$$

$$ \mathbb{P}_Y(y) = \sum_{x}\mathbb{P}_X(x)\mathbb{P}_{Y\mid X}(y \mid x).$$

### 3.2. Continuous Counterpart

$$f_{X\mid Y}(x|y)=\frac{f_{X,Y}(x,y)}{f_Y(y)} = \frac{f_X(x)f_{Y|X}(x|y)}{f_Y(y)}.$$

$$f_Y(y) = \int f_X(x)f_{Y|X}(y|x) dx.$$

### 3.3. Mixed Case 
Discrete $$X$$, and Continuous $$Y$$,

$$\mathbb{P}_{X\mid Y}(x \mid y) = \frac{\mathbb{P}_X(x)f_{Y\mid X}(y\mid x)}{f_Y(y)}.$$

$$f_Y(y) = \sum_{x} \mathbb{P}_{X}(x) f_{Y\mid X}(y\mid x).$$

## 4. Union Bound

**Union bound** also known as [**Boole's inequality**](https://en.wikipedia.org/wiki/Boole%27s_inequality), which is a very simple but useful inequality in probability theory. 

Mathematically, let $$A_i,i=1,2,...,n$$ be a series of events, and $$\mathbb{P}(A_i)$$ denotes its occurrence probability. The **Boole's inequality** says that,

$$
\mathbb{P}(\cup_{j=1}^{n}A_j) \leq \sum_{j=1}^{n}\mathbb{P}(A_i).
$$

Which can be considered as a special case of [**sub-additivity property** of Lebesgue measure](http://math.stackexchange.com/questions/71605/proof-of-subadditivity-of-the-lebesgue-measure). I guess the **additivity** of the probabilities for mutual excursive events (_i.e._, the countable additivity property of the measure for disjoint measurable sets) which is usually stated in the definition of [**probability**](https://en.wikipedia.org/wiki/Probability) might be better-known to most of us.



  


