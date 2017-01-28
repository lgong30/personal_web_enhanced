---
layout: post
title: Running Time Measurement (C++)
excerpt: "useful skills"
tags: [C++]
categories: [skill]
author: Long Gong
---

Run Time Measurement
---

```cpp
#include <chrono>  
#define TIMING  

#ifdef TIMING  
#define INIT_TIMER auto start = std::chrono::high_resolution_clock::now();  
#define START_TIMER  start = std::chrono::high_resolution_clock::now();  
#define STOP_TIMER(name)  std::cout << "RUNTIME of " << name << ": " << \  
    std::chrono::duration_cast<std::chrono::milliseconds>( \
            std::chrono::high_resolution_clock::now()-start \
    ).count() << " ms " << std::endl; 
#else  
#define INIT_TIMER  
#define START_TIMER  
#define STOP_TIMER(name)  
#endif  
```

  
```cpp
#include <iostream>
int main()
{
    std::cout << "Hello World" << std::endl;
}
```

