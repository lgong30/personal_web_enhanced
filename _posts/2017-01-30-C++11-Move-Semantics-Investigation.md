---
layout: post
title: C++ 11 Move Semantics Investigation
tags: [C++]
categories: [skill]
---


Recently, I have learned about the move semantics of C++ 11 from [Bo Qian's YouTuBe Channel](https://www.youtube.com/watch?v=IOkgBrXCtfo). 
As an "old body" that is curious to all kinds of new techniques, I definitely would give myself a try. 

Define a Class
--------------

First of all, I create the following C++ class (which is similar to the one used in Bo Qian's Video), __i.e.,__, Note that, all "#include" are omitted.

```cpp
class exampleA {
    int *x;
    int size;
public:
    // default constructor
    exampleA(): x(NULL), size(0) {
        std::cout << "Default constructor is called" << std::endl;
    }
    // constructor from a std::vector
    exampleA(const std::vector<int>& vec){
        size = vec.size();
        x = new int[size];
        for (int i = 0;i < size;++ i) x[i] = vec[i];
        std::cout << "Create exampleA object from vector" << std::endl;
    }
    // copy constructor
    exampleA(const exampleA& other) 
    {
        std::cout << "Copy constructor is called" << std::endl;
        size = other.size;
        if (size > 0) {
            x = new int[size];
            for (int i = 0;i < size;++ i) x[i] = other.x[i];
        }else 
        {
            x = NULL;
        }     
    }
    // move constructor
    exampleA(exampleA&& other) 
    {
        std::cout << "Move constructor is called" << std::endl;
        size = other.size;
        x = other.x;
        // for (int i = 0;i < size;++ i) x[i] *= 3;
        other.size = 0;
        other.x = NULL;        
    }
    // deconstructor
    ~exampleA() {
        if (x != NULL) delete [] x;
        x = NULL;
        size = 0;
        std::cout << "Deconstructor is called" << std::endl;
    }
    // friend function: overloading operator <<
    friend std::ostream& operator<<(std::ostream& os, const exampleA& a);
};
// definition of (or implementation of) overloading operator <<
std::ostream& operator<<(std::ostream& os, const exampleA& a){
    for (int i = 0;i < a.size;++ i) os << a.x[i] << " ";
    return os;
}
```

Define two Functions
--------------------

Then, I defined a function that returns an exampleA object and another function that uses an object from the class exampleA as a parameter as follows.

```cpp
// function to create an exampleA object
exampleA createObject(){
    exampleA a(std::vector<int>(10, 1));
    return a;
}
// function uses an exampleA object as a parameter
void passByValue(exampleA a) {
    std::cout << a;
}
```


"Moment to Witness the Miracle"
-------------------------------

Next, I though the moment to witness the miracle (Chinese: 见证奇迹的时刻) was coming. I created the following use cases to verify my understanding.

```cpp
int main()
{
    exampleA a(std::vector<int>(10, 1));

    passByValue(a);
    std::cout << "======================================\n\n";
    passByValue(createObject());

    return 0;
}
```

Before "witnessing the miracle", let us first do some simple analysis to figure out what the "miracle" is. According to the above use cases, we first create an exampleA object -- __i.e.,__ `a` -- from an `std::vector`. Then we passed `a` to the function `passbyValue` by value, since `a` is a `lvalue`, we would expect the **copy constructor** to be called. And then, we passed a `rvalue` `createObject()` 
to the function `passbyValue`, we would expect the move constructor to be called. 

However, the following presents the output from running the above example (by using `g++ -std=c++11 example.cpp -o example && ./example`)

```shell
Create exampleA object from vector
Copy constructor is called
1 1 1 1 1 1 1 1 1 1 
Deconstructor is called
======================================

Create exampleA object from vector
1 1 1 1 1 1 1 1 1 1 
Deconstructor is called
Deconstructor is called
```

Unfortunately, we failed to witness the most important part of the miracle, __i.e.,__ the move semantics. 


Dig Out of The Chief Culprit
----------------------------

After Google, Google, and Google again, I eventually found "the chief culprit". It is the [**copy elision** feature of the compiler](https://en.wikipedia.org/wiki/Copy_elision). Now, it is really the moment to witness the miracle. The following gets the final outputs after disabling the **copy elision** (add a flag `-fno-elide-constructors`, that is to run `g++ -fno-elide-constructors -std=c++11 example.cpp -o example && ./example`).

```shell
Create exampleA object from vector
Copy constructor is called
1 1 1 1 1 1 1 1 1 1 
Deconstructor is called
======================================

Create exampleA object from vector
Move constructor is called
Deconstructor is called
Move constructor is called
1 1 1 1 1 1 1 1 1 1 
Deconstructor is called
Deconstructor is called
Deconstructor is called
```

From the above outputs, you can see that the **move constructor** was called twice. First call was during the returning from the function `createObject`, and the other one is during passing value to the function `passByValue`. 



