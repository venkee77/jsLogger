# jsLogger #

During development for debugging, we like to output the values during run time to the console.  
At the same time, it will be better for us to see the difference in messages for log, info, warn and error.
This javascript library will help in identifying the type of messages.

### Reference to the library ###

- Refer the "debugger.js" or "debugger.min.js" in the script tag.

```sh
<script src="js/debugger.js"/>

   or

<script src="js/debugger.min.js"/>
```

### Code Sample and Usage ###

The global variable will be used by this library with the name "SmartLogger".  Please make sure, you are
not using this variable name globally anywhere in your project.

The "SmartLogger" object exposes four types of methods.

- log
- info
- warn
- error

```sh
- SmartLogger.log("Hello World!");
- SmartLogger.info("javascript makes our job easy.");
- SmartLogger.warn("JS code runs locally.");
- SmartLogger.error("Troubleshoot in javascript sucks.");

```

Similarly, multiple arguments can be passed to the above mentioned methods.

For example,

```sh
- SmartLogger.log("Hello World!","Welcome.");
- SmartLogger.info("Hello World!","javascript is awesome.");
- SmartLogger.info("Hello World!","javascript is loosely typed.");
- SmartLogger.info("Hello World!","troubleshoot in javascript sucks.");

```

The above codes will print the output in console with various specific background colors in the console window.  In case of multiple arguments, the values are outputted into separate lines.

### Styling messages ###

The message styles are CSS based.  You can override the style of the messages through the method ** init **

Sample is as follows

```sh

   var obj = {
      styles:{
           log:"color: blue; font-style: italic; background-color: white;padding: 2px",
           warn:"color: yellow; font-style: italic; background-color: blue;padding: 2px",
           info:"color: white; font-style: italic; background-color: blue;padding: 2px",
           error:"color: yellow; font-style: italic; background-color: red;padding: 2px"
         }
   };

  SmartLogger.init(obj);

```

> Note: This library will output the functions, objects, arrays etc as it is.
