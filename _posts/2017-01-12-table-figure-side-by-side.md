---
layout: post
title: Table and Figure Side by Side
tags:  [latex]
categories: [skill]
author: Long Gong
excerpt: "Simple ways to place tables and figures side by side in Latex"
---


While write a paper (or a propsoal), you might need to place a table and a figure in a same row to save some space (or
for some other reasons). In this post, I will provide two simple approaches. The first one is based on [`floatrow`](http://ctan.mackichan.com/macros/latex/contrib/floatrow/floatrow.pdf).
 The second one is based on [`minipage`](https://en.wikibooks.org/wiki/LaTeX/Boxes#minipage_and_parbox) and [`caption`](http://mirror.unl.edu/ctan/macros/latex/contrib/caption/caption-eng.pdf).


----------


floatrow Based Solution
---

```TeX
\begin{figure}\CenterFloatBoxes
\begin{floatrow}
\ffigbox[\FBwidth]
{\cpation{figure caption goes here}\label{fig: figure-label}}
{figure puts here}
\killfloatstyle\ttabbox[\Xhsize]
{\caption{table caption goes  here}\label{tab: table-label}}
{table puts here}
\end{floatrow}
\end{figure}
```

**Remarks**:

+ In two column environment, `\begin{figure}...\end{figure}` should be replaced by `\begin{figure*}...\begin{figure*}` if
you want your mixed results occupy both of the columns.
+ If you have used `float` package, you can not use this solution. Because they are incompitable.


----------



minipage Based Solution
---

```TeX
\begin{figure}
\centering
\begin{minipage}{0.5\textwidth}
\centering
figure puts here
\cpation{figure caption goes here}\label{fig: figure-label}
\end{minipage}
\begin{minipage}
\centering
\captionsetup{type=table} %% tell latex to change to table
table puts here
\caption{table caption goes  here}\label{tab: table-label}
\end{minipage}
\end{figure}
```



