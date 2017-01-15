---
layout: post
title: Cluster Building
excerpt: "MPI Cluster Building"
tags: [MPI, parallel computing]
categories: [skill]
---

# Build MPI Cluster

This guide describes how to build a simple MPICH cluster in ubuntu.

To understand this guide, a basic knowledge of command line usage and the principle mpich \& clustering is assumed.

Here we have 4 nodes running Ubuntu server with these host names: ub0, ub1, ub2, ub3.

## Configure hostnames
Edit _/etc/hosts_ like these:

	127.0.0.1 localhost
	192.168.109.103 ub0
	192.168.109.104 ub1
	192.168.109.106 ub2
	192.168.109.107 ub3

## Install NFS
*NFS* allows us to create a folder on the master node and have it synced on all the other nodes. This folder can be used to store programs. To install NFS just run the following command in the master node's terminal:

	sudo apt-get install nfs-server

To install the client program on other nodes, run this command on each of them:

	sudo apt-get install nfs-client

## Sharing Master Folder
Make a folder in all nodes, we'll store our data and program in this folder.

	sudo makedir /mirror

And then we share the contents of this folder on the master node to all the other nodes. In order to do this we first edit the /etc/exports file on the master node to contain the following line

	/mirror *(rw,sync)

This can be done by using a text editor such as vim or by using the following command:

	echo "/mirror *(rw,sync)" | sudo tee -a /etc/exports

Now restart the nfs service on the master to parse this configuration once again by using the following command:

	sudo service nfs-kernel-server restart

Note, then we store our data and programs only in the master node and other nodes are able to access them with NFS.

## Mounting /master in Nodes

Now all we need to do is to mount the folder on other nodes. This can be done by using:
	
	sudo mount ub0:/mirror /mirror

But it's better to change fstab in order to mount it on every boot. We do this by editing /etc/fstab and adding the following line:

	ub0:/mirror /mirror nfs

and remounting all partitions by using the following on all the slave nodes:

	sudo mount -a

## Defining a User for Running MPI Programs

We define a user with same name and same userid in all nodes with a home directory in /mirror.

Here we name it "mpiu"! Also we change the owner of /mirror to mpiu:

	sudo chown mpiu /mirror

## Installing SSH Server

Run the following command in all the nodes in order to install openSSH server:

	sudo apt-get install openssh-server

## Setting up Passwordless SSH 

First we login with our new user to the master node:

	su - mpiu

Then we generate an RSA key pair for mpiu:

	ssh-keygen -t rsa

You can keep the default ~/.ssh/id_rsa location. It is suggested to enter a strong passphrase for security reasons. 

Next, we add this key to authorized keys:

	cd .ssh
	cat id_rsa.pub >> authorized_keys

As the home directory of mpiu in all nodes is the same (i.e., /mirror/mpiu), there is no need to run these commands on all nodes. If you didn't mirror the home directory, though, you can use ssh-copy-id <hostname> to copy a public key to another machine's authorized_keys file safely.

To test SSH, you can run the following command on ub0:

	ssh ub1 hostname

If you are asked to enter a passphrase every time, you need to set up a keychain. This is done easily by installing Keychain by using:

	sudo apt-get install keychain

And to tell it where your keys are and to start an ssh-agent automatically edit your ~/.bashrc file to contain the following lines (where id_rsa is the name of your private key file):

	if type keychain >/dev/null 2>/dev/null; then
	   keychain --nogui -q id_rsa
	   [ -f ~/.keychain/${HOMENAME}-sh ] && . ~/.keychain/${HOSTNAME}-sh
	   [ -f ~/.keychain/${HOSTNAME}-sh-gpg ] && . ~/.keychain/${HOSTNAME}-sh-gpg
	fi

Exit and login once again or do a source ~/.bashrc for the change to take effect.

Now your hostname via ssh command should return the other node's hostname without asking for a password or passphrase. Check that this works for all the slave nodes.

## Install GCC

To be able to compile all the code on our master node (it's sufficient to do it only there if we do inside the /mirror folder and all the libraries are in place on other machines) we need a compiler.

You can get gcc and other necessary stuff by install the build-essential package:

	sudo apt-get install build-essential

## Install Other Compilers

Other preferred compilers should be installed before installing MPICH.

In this step you may install other compilers such as SGI compiler ...

## Install MPICH2

Now the last ingredient we need installed on all the machines is the MPI implementation. You can install MPICH2 using:

	sudo apt-get install mpich2

To test that the program did indeed install successfully, enter the following command on all the machines:

	which mpiexec
	which mpirun

## Setting up a Machinefile

Create a file named "machinefile" in mpiu's home directory with node names followed by a colon and a number of processes to spawn:

	ub3:4 # this will spawn 4 processes on ub3
	ub2:2
	ub1   # this will spawn 1 process on ub1
	ub0 

## Testing

Change directory to your  mirror folder and write this MPI hellowworld program in a file mpi_hello.c:

~~~
#include<stdio.h>
#inlcude<mpi.h>
int main(int argc, char** argv){
    int myrank, nprocs;
    MPI_Init(&argc,&argv);
    MPI_Comm_size(MPI_COMM_WORLD,&nprocs);
    MPI_Comm_rank(MPI_COMM_WORLD,&myrank);
    printf("Hello from processor %d of %d\n",myrank,nprocs);
    MPI_Finalize();
    return 0;
}
~~~
{:language="C++""}


compile it:

	mpicc mpi_hello.c -o mpi_hello

and run it:

	mpiexec -n 8 -f machinefile ./mpi_hello

You should now see output similar to:

	Hello from processor 0 of 8
	Hello from processor 1 of 8
	Hello from processor 2 of 8
	Hello from processor 3 of 8
	Hello from processor 4 of 8
	Hello from processor 5 of 8
	Hello from processor 6 of 8
	Hello from processor 7 of 8


