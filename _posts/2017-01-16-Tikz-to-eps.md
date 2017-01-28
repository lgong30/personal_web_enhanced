---
layout: post
title: Tikz to EPS
categories: [skill]
tags: [latex]
---


LaTeX Code
---

```TeX
\documentclass{article}

\usepackage{tikz}

%% put tikzlibrary below if necessary

% set up externalization
\usetikzlibrary{external}
\tikzset{external/system call={latex \tikzexternalcheckshellescape -halt-on-error
-interaction=batchmode -jobname "\image" "\texsource";
dvips -o "\image".ps "\image".dvi;
ps2eps "\image.ps"}}
\tikzexternalize

\begin{document}

%% put your tikz code below or input your tikz code via \input


\end{document}
```

Usage
---


```shell
latex -shell-escape LATEX_FILE_NAME
```

Please make sure you are using `latex` engine, other engines
will not work. Besides, please make sure all required tools
are installed.
