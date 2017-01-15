---
layout: post
title: How to Calculate Summation of n square
excerpt: "Method to calculate the summation of n square."
tags: [math]
categories: [math]
---

When doing complexity analysis on some algorithms, we might encounter the cases where we need to calcaulate \\(S = 1^2 + 2^2 + 3^2 + \cdots + n^2\\). However, not like the summation of an arithmetic sequence or geometric sequence, this calculation is not that easy. In this post, I'll introduce a simple method to finish this calculation.

First of all, let's define,

$$f(x) = x + 2x^2 + \cdots + nx^n = \sum_{i = 1}^{n}ix^i$$

Get its first-order derivative as follows,

$$f'(x) = \sum_{i = 1}^{n} i^2 x^{i - 1}$$

It's easy to verify that,

$$S = 1^2 + 2^2 + 3^2 + \cdots + n^2 = f'(x)|_{x = 1}$$

Therefore, our mission is to calculate the value of \\(f'(x)\\) when \\(x = 1\\).

As,

$$f'(x) = 1 + 2^2 x + 3^2 x^2 + \cdots + n^2 x^{n - 1}$$

$$xf'(x) = x + 2^2 x^2 + 3^2 x^3 + \cdots + (n - 1)^2 x^{n - 1} + n^2 x^n$$

By minusing them, we can get,

$$(1 - x)f'(x) = 1 + (2 + 1) x + (3 + 2)x^2 + \cdots + (2n -1)x^{n-1} - n^2 x^n$$

Therefore,

$$(1 - x)f'(x) = \sum_{i = 1}^{n}(2i - 1) (x^{i - 1} - x^n)$$

Dividing by \\((1 -x)\\) on each side, we can obtain,

$$f'(x) = \sum_{i = 1}^n (2i - 1)x^{i -1}\frac{1 - x^{n - i +1}}{1 - x}$$

Since \\(\frac{1 - x^{n - i +1}}{1 - x} = 1 + x + x^2 + \cdots + x^{n - i}\\), hence,

$$f'(x) = \sum_{i = 1}^n (2i - 1)x^{i - 1}(1 + x + x^2 + \cdots + x^{n - i})$$

Let \\(x = 1\\), then,

$$f'(x)|_{x = 1} = \sum_{i = 1}^n(2i - 1)(n -i + 1)$$

Denote \\(S = 1^2 + 2^2 + 3^2 + \cdots + n^2\\), we can get,

$$S = -2S + (n + 1)\sum_{i = 1}^n(2i - 1) + \sum_{i = 1}^n i$$

Therefore,

$$S = \frac{n(n + 1)(2n + 1)}{6}$$



