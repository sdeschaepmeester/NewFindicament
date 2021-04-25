## Requirements : 
If you're having trouble installing the project, verify if you have installed the following : 

1. Get the repository 
  - GIT
  - GitKraken or Fork, ...
2. Other 
  - npm (Test: npm -v)
  - expo 
  - nodeJS (Test: node -v)
3. Test the application
  - Expo Go application on your phone OR
  - Android Studio for simulating a device 

## 1st step : Clone the project 

Go to the root of NewFindicament project and click on the green button. Then copy the link.

![download.png](https://zupimages.net/up/21/11/peb7.png)

Open a GIT client and clone the repository.
If you don't use a GIT client, use the command : 
```git
git clone ProjectLinkUrl
```

## 2nd step : Installation 

Open a terminal, go to the src folder and type the command:
```git
npm install
```

## 3rd step : Test the project

Once you have cloned the project, you can either test it on your device or on a simulator.
First go to the command prompt and type :
```git
cd NewFindicament/src
expo start
```
Then do the following depending on where you test your app:
|Method   |  Description |
|---|---|
| Device  | On the web page, click on Tunnel. Then open your Expo go application and scan the QR code.|
| | ![download.png](https://zupimages.net/up/21/11/zbbx.png) |
| Simulator  |  Open a simulator on Android studio. On the web page, click on Open in simulator |
| | ![download.png](https://zupimages.net/up/21/11/kvs5.png) |

## 4th step : Create a new branch and start working

Create a new branch with the name of the function you are working on. Don't forget to PUSH said branch to origin.
Then, you can work in your branch. 

Once you're done working on it and the function isn't buggy, you can merge your branch to the main branch.

Place yourself on the main branch, then right clic on your branch and clic on "merge into master". 
Solve the eventuals conflicts and don't forget to push the merge. 

## Commit your changes

Do NOT commit : 
- .expo folder
- node modules

## Troubleshooting 

If you have any of the following errors, here are some tips that works for some of us :

**Problem : I can't install expo with npm command. Expo is not recognized as a command.

Possible answer: Modify the environment variable.
Search for environment variable, then click on the "Variables d'environnement"

![download.png](https://zupimages.net/up/21/16/orol.png)

Search for the Path variable in your SYSTEM variables and clic on modify.

![download.png](https://zupimages.net/up/21/16/wkou.png)

Look for the correct variable link. In order to do that, open the search bar and type %appdata%, then clic on the npm folder and copy the link.
Add the link to the path variable.

![download.png](https://zupimages.net/up/21/16/n5t5.png)

**Problem : I can't debug on Expo. Failed to install expo (after launching expo start)

Possible answer: You may be using a version of expo that is buggy. Open a command prompt and type expo --version. If it is 4.4.3, it is buggy and you must downgrade.
Then follow these steps:

- In your project, delete *nodes_modules* and *.expo*. 
- Type the following commands:
```git
cd src
```
Install an ancient version:
```javascript
npm i -g expo-cli@4.1.0
```
Recreate the nodes_modules folder with this command (still in the src folder):
```javascript
npm install
```
You can then type expo start and start debugging without bugs.
