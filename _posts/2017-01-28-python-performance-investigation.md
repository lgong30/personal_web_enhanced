---
layout: post
title: Python Performance Investigation
tags: [python]
categories: [skill]
---


Splicing vs While Loop
----------------------


```python
import timeit


setup = '''
from copy import deepcopy
n = 10000
x = range(n)
y = range(20,2001)
'''

test_group = 1
test_num = 10000



s = '''
i = 20
while i < 2000:
    y[i - 20] = x[i]
    i += 1
'''

print "splicing: ", timeit.Timer('[z for z in x[20:2000]]', setup=setup).repeat(test_group, test_num)[0]
print "xrange: ", timeit.Timer('[x[i] for i in xrange(20,2001)]', setup=setup).repeat(test_group, test_num)[0]
print "while loop: ", timeit.Timer(s, setup=setup).repeat(test_group, test_num)[0]
```




Measurement results:

```shell
splicing:  0.950579881668
xrange:  1.10384917259
while loop:  2.56404590607
```


Delete from List
----------------


### Single Remove


```python
import timeit


setup = '''
n = 10000
x = range(n)
y = range(20,2001)
'''

test_group = 1
test_num = 10000
print "removing first element: ", timeit.Timer('del x[0]', setup=setup).repeat(test_group, test_num)[0]
print "removing the last element: ", timeit.Timer('del x[-1]', setup=setup).repeat(test_group, test_num)[0]
```


Measurement results:

```shell
removing first element:  0.0151288509369
removing the last element:  0.000619888305664
```


### Multiple Remove

```python
"""This script compares the performance of three different
methods to remove certain elements from a list. Note that
the removal indices are sorted in ascending order.
"""


def remove_with_move(myList, removalIndices):
    """Remove without inplace

    This method removes the elements in myList with
    indices specified by removalIndices by creating
    a new list for all non-removal elements

    :param myList: input list
    :param removalIndices: indices of removals (in ascending order)
    :return: list after removing
    """
    if not isinstance(removalIndices, set):
        removalIndices = set(removalIndices)
    return [v for i, v in enumerate(myList) if not (i in removalIndices)]


def remove(myList, removalIndices, inplace=False):
    """Remove w/o inplace

    This method removes certain elements in myList
    one-by-one from the largest index to the
    smallest one. Note that, usually this will not be
    an efficient way, since it might have a complexity
    close to kN, where k is the number of removals and
    N is the length of myList.

    see :fun remove_with_move
    """
    if not inplace:
        return remove_with_move(myList, removalIndices)
    else:
        for removalIndex in removalIndices[::-1]:
            del myList[removalIndex]
        return myList


def efficient_remove(myList, removalIndices, inplace=False):
    """Efficient removal method w/o inplace

    This method removes certain elements from myList
    by efficiently shift the non-removals. Note that,
    this method guarantees a O(N) complexity.

    see :fun remove
    """
    if not inplace:
        return remove_with_move(myList, removalIndices)
    else:
        nextRemovalIndex = removalIndices[0]
        indexOfRemovalIndices = 1

        numOfRemovals = len(removalIndices)
        lenOfList = len(myList)

        currentIndex = nextRemovalIndex + 1
        while currentIndex < lenOfList:
            nextIndex = removalIndices[indexOfRemovalIndices] if indexOfRemovalIndices < numOfRemovals else lenOfList
            while currentIndex < nextIndex:
                myList[nextRemovalIndex] = myList[currentIndex]
                nextRemovalIndex += 1
                currentIndex += 1
            indexOfRemovalIndices += 1
            currentIndex += 1
        # pay attention
        myList[-numOfRemovals:] = []

        return myList



if __name__ == "__main__":
    test_num = 1000
    N = 10000
    import numpy as np
    from copy import deepcopy

    myList = range(N)
    K = np.random.randint(1, high=int(0.05 * N))
    removalIndices = np.random.permutation(N).tolist()[::K]
    removalIndices = sorted(removalIndices)

    import time



    t = 0
    for test_id in range(test_num):
        myListA = deepcopy(myList)
        removalIndicesA = deepcopy(removalIndices)
        s = time.time()
        remove_with_move(myList=myListA, removalIndices=removalIndicesA)
        t += time.time() - s
    print "%s: %.3f" % ("remove_with_move", t)


    t = 0
    for test_id in range(test_num):
        myListB = deepcopy(myList)
        removalIndicesB = deepcopy(removalIndices)
        s = time.time()
        remove(myList=myListB, removalIndices=removalIndicesB, inplace=True)
        t += time.time() - s
    print "%s: %.3f" % ("remove", t)


    t = 0
    for test_id in range(test_num):
        myListC = deepcopy(myList)
        removalIndicesC = deepcopy(removalIndices)
        s = time.time()
        efficient_remove(myList=myListC, removalIndices=removalIndicesC, inplace=True)
        t += time.time() - s
    print "%s: %.3f" % ("efficient_remove", t)




    K = np.random.randint(int(0.7 * N), high=int(0.95 * N))
    test_num = 400
    removalIndices = np.random.permutation(N).tolist()[::K]
    removalIndices = sorted(removalIndices)

    import time



    t = 0
    for test_id in range(test_num):
        myListA = deepcopy(myList)
        removalIndicesA = deepcopy(removalIndices)
        s = time.time()
        remove_with_move(myList=myListA, removalIndices=removalIndicesA)
        t += time.time() - s
    print "%s: %.3f" % ("remove_with_move", t)

    t = 0
    for test_id in range(test_num):
        myListA = deepcopy(myList)
        removalIndicesA = set(deepcopy(removalIndices))
        s = time.time()
        remove_with_move(myList=myListA, removalIndices=removalIndicesA)
        t += time.time() - s
    print "%s: %.3f" % ("remove_with_move with set input", t)

    t = 0
    for test_id in range(test_num):
        myListB = deepcopy(myList)
        removalIndicesB = deepcopy(removalIndices)
        s = time.time()
        remove(myList=myListB, removalIndices=removalIndicesB, inplace=True)
        t += time.time() - s
    print "%s: %.3f" % ("remove", t)


    t = 0
    for test_id in range(test_num):
        myListC = deepcopy(myList)
        removalIndicesC = deepcopy(removalIndices)
        s = time.time()
        efficient_remove(myList=myListC, removalIndices=removalIndicesC, inplace=True)
        t += time.time() - s
    print "%s: %.3f" % ("efficient_remove", t)


    removalIndices = range(2000)

    import time



    t = 0
    for test_id in range(test_num):
        myListA = deepcopy(myList)
        removalIndicesA = deepcopy(removalIndices)
        s = time.time()
        remove_with_move(myList=myListA, removalIndices=removalIndicesA)
        t += time.time() - s
    print "%s: %.3f" % ("remove_with_move", t)


    t = 0
    for test_id in range(test_num):
        myListB = deepcopy(myList)
        removalIndicesB = deepcopy(removalIndices)
        s = time.time()
        remove(myList=myListB, removalIndices=removalIndicesB, inplace=True)
        t += time.time() - s
    print "%s: %.3f" % ("remove", t)


    t = 0
    for test_id in range(test_num):
        myListC = deepcopy(myList)
        removalIndicesC = deepcopy(removalIndices)
        s = time.time()
        efficient_remove(myList=myListC, removalIndices=removalIndicesC, inplace=True)
        t += time.time() - s
    print "%s: %.3f" % ("efficient_remove", t)
```

Measurement results:

```shell
remove_with_move: 1.273
remove: 0.111
efficient_remove: 1.765
remove_with_move: 0.447
remove_with_move with set input: 0.547
remove: 0.004
efficient_remove: 0.212
remove_with_move: 0.509
remove: 2.481
efficient_remove: 0.739
```