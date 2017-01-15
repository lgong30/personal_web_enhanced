---
layout: post
title: Get Rid of Winedit Expired Problem
excerpt: "useful skills"
tags: [latex, winedit]
categories: [skill]
---

## Find Configuration File "Exit.edt"

options -> options interfaces ... -> Advanced Configuration ... -> Event Handlers -> Exit

the file looks like this:


```shell
// WinEdt Exit (Cleanup) Macro
 
   PushTagsandRegisters;
 
 //  CloseAppl("YAP");         // Close YAP if running?
 //  CloseAppl("Complete");    // Close Complete Wizard if running?
 
 // Remove Local ini and edt files if they are empty or the same as global
 // Users probably forget to do this before upgrading
 // so it is best to keep it tidy as we go...
 
 Exe('%b\Config\Cleanup.edt');
 
 PopTagsandRegisters;
 
 End; 
```


## Add Following Sentence Just Before **"End;"** 

    RegDeleteValue('HKEY_CURRENT_USER', 'Software\WinEdt 9', 'Inst');


## Close WinEdit and Reopen





  


