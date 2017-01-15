---
layout: post
title: Approximation Analysis on The Greedy Maximum Bipartite Graph Matching
excerpt: "approximation ratio analysis for greedy maximum bipartite graph matching"
tags: [approximation analysis, maximum matching]
categories: [algorithm]
---

Recently, I read a paper on semi-streaming algrithm which applied some knowledge about bipartite graph matching. It mentioned a greedy algorithm which could find the maximal matching of a bipartite graph (actually, also applicable to an arbitrary graph), and the size of the maximal matching would be no less than a half of the optimal one, _i.e._, the maximum matching. In this post, we will learn about this greedy algorithm and the proof of its approximation ratio.


Now, let's start our journey ...

## Greedy Algorithm for Maximum Matching
The following code is using python-style.

```python
M = []
flag = {}
for e in E:
	if (e[0] not in flag) and (e[1] not in flag):  
        M.append(e)      
        flag.setdefault(e[0],1)       
        flag.setdefault(e[1],1)       
```

## Approximation Ratio Proof

Assume \\(M'\\) is the maximum matching of graph \\(G(V,E)\\), and \\(M\\) is the maximal matching getting from the above greedy algorithm. For any edge \\((u,v) \in M'\\), we have either \\(u\\) is matched by \\(M\\), or \\(u\\) is matched by \\(M\\). Otherwise, \\((u,v)\\) should in \\(M\\). Therefore, \\(|M|\geq \frac{1}{2}|M'|\\).

Eventually, we proved that the size of the maximal matching getting from the greedy algorithm above, is at least a half of the maximum one.



Note that, this proof is from reference [1].

[1] http://crab.rutgers.edu/~guyk/ex/flow.pdf 
  


