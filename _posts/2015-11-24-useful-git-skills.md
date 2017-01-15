---
layout: post
title: Useful Git Commands
excerpt: "useful skills"
tags: [git]
categories: [skill]
---

## 1. Fast Commit
```shell
git commit -a -m "commit message"
```


## 2. Remember Credential on Windows
```shell
$ git config credential.helper store
$ git push http://example.com/repo.git
Username: <type your username>
Password: <type your password>

[several days later]
$ git push http://example.com/repo.git
[your credentials are used automatically]
```

## 3. Reset Last Commit
```shell
$ git commit -m "Something terribly misguided" # your last commit
$ git reset --soft HEAD^   # reset
```

It is extremely useful, when you encounter **LARGE** file problems

## 4. Skip Certain Changes
```shell
git update-index --no-skip-worktree <file>
git add -p <file>
git update-index --skip-worktree <file>
```

If you want skip (ignore) certain type of files, the following configuration can be applied: Edit file ".gitignore", and add the types you want to ignore, for example,

```shell
# ignore thumbnails created by windows
Thumbs.db
# Ignore files build by Visual Studio
*.user
*.aps
*.pch
*.vspscc
*_i.c
*_p.c
*.ncb
*.suo
*.bak
*.cache
*.ilk
*.log
[Bb]in
[Dd]ebug*/
*.sbr
obj/
[Rr]elease*/
_ReSharper*/
```
  
## Push Local Branch to New Remote Repository

Suppose you have made a empty repository and named it _myapp.git_, you can:  

```shell    
git remote add <branch_name> <repository_url>
```

where _<branch\_name>_ can be any valid name you want. Then, you can push your local branch to the newly created remote repository by using  

```shell
git push <branch_name> master
```
    

## Resolve Large File Failure Problem

Suppose you git push your local repository to Github, however it failed because of some large-size files. And you might continue to experience git push failure, even if you have removed or ignore such large files. You can use the following commands to resolve such a problem by deleting those files in your history.

```shell
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch <file/dir>' HEAD
```

Of course, by using the above solution, you cannot upload your large file to Github. Recently, Github had released a tool to help you handle with large file. More details, you can refer to [An open source Git extension for versioning large files](https://git-lfs.github.com/)




