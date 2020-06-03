# CodePainting
[Click here to go to App](https://a12b4c3.github.io/CodePainting/src/ "CodePainting App")

## Goal
Code painting is designed to let gradeschool students learn to code, through a fun and intuitive language. It should be easy to understand, requring little knowledge of programming. It should be visual, and use programming syntaxes similar to those seen in existing languages.
## Overview
Users can paint with default line art images (circle, rectangle, cloud, art), svg images, or add text onto the canvas. All art, images, and text will be called 'elements'. Every line of input artts with an element, followed by zero or more operations, denoted using dot operaters ('.'). Operations are commands which 'do' something with that image, such as repeatedly draw it across a screen, or draws it into the shape of a circle, or scatters it randomly over the screen...etc.

## QuickStart Overview of All Features
### Making A Flag
We want to make something that looks like this. (Copy and paste the code in the text box)
```
draw {art(shapename=rectangle x=100 y=100 w=500 h=300 fillcolor=white linecolor=white)
art(shapename=rectangle x=100 y=100 w=500 h=20 fillcolor=red linecolor=red).repeatvertically(spacing=43 repeat=6)
art(shapename=rectangle x=100 y=100 w=250 h=150 fillcolor=blue linecolor=blue)
background(color=teal)
art(shapename=circle x=118 y=118 w=10 h=10 fillcolor=yellow linecolor=yellow).repeathorizontally(spacing=43 repeat=5).repeatvertically(spacing=56 repeat=2)
art(shapename=circle x=140 y=145 w=10 h=10 fillcolor=yellow linecolor=yellow).repeathorizontally(spacing=43 repeat=4).repeatvertically(spacing=56 repeat=1)
}
```
The code will be explained, step by step.

1. To draw something, we issue the draw{command}. For example, lets draw a white flag, using a rectangular art element. Don't forget to press "Paint!" to paint your code onto the canvas!
```
draw{art(shapename=rectangle x=100 y=100 w=500 h=300 fillcolor=white linecolor=white)}
```

2. Next, let's begin to build an American flag. CodePainting has layers, elements drawn later will appear on TOP of elements drawn earlier. We want to start drawing the stripes of the flag. Let's draw a red rectangle.
```
draw{art(shapename=rectangle x=100 y=100 w=500 h=20 fillcolor=red linecolor=red)}
```

3. We need to do this with rectangle all the way down... we could either issue the same command again and again like so..
```
draw{art(shapename=rectangle x=100 y=100 w=500 h=20 fillcolor=red linecolor=red)
art(shapename=rectangle x=100 y=140 w=500 h=20 fillcolor=red linecolor=red)
art(shapename=rectangle x=100 y=180 w=500 h=20 fillcolor=red linecolor=red)}
.....
```
or we can use a feature of codepainting - OPERATORS!
```
draw{art(shapename=rectangle x=100 y=100 w=500 h=20 fillcolor=red linecolor=red).repeatvertically(spacing=43 repeat=6)}
```
Notice that we can accomplish the same task, but in one single line! The red bar will now copy itself over and over, setting itself 43pixels apart and repeating 6 more times.

4. Now we need to build the blue rectangle and put it on the top left corner.. this is easy.
```
draw{art(shapename=rectangle x=100 y=100 w=250 h=150 fillcolor=blue linecolor=blue)}
```

5. We need to fill in the stars now... Note that the american flag alternates 6 stars in the first row, 5 stars on the second, and repeats. We can do this easily - by CHAINING OPERATORS! We will use circles instead of stars. Without operators, we would have needed to copy each star over 20x, while keeping track of the x and y-offsets! Note how easy this task becomes with operators!
```
draw{art(shapename=circle x=118 y=118 w=10 h=10 fillcolor=yellow linecolor=yellow).repeathorizontally(spacing=43 repeat=5).repeatvertically(spacing=56 repeat=2)}

draw{art(shapename=circle x=140 y=145 w=10 h=10 fillcolor=yellow linecolor=yellow).repeathorizontally(spacing=43 repeat=4).repeatvertically(spacing=56 repeat=1)}
```

6. And we have a flag! Let's add a cool background with the following command.
```
draw{background(color=teal)}
```
Oops! Why did the flag disappear?? Oh! Remember that CodePainting paints in layers. If we paint the background last, it will paint OVER the flag! Let's make the background paint first. Much better!

7. What if we want to use this flag again? Let's remove the background and create a variable called "usflag". We can do that by defining the variable, lets remove all of the "draw" calls and only keep the element calls. To use the flag, we call draw with an img operator. Be sure to name the variable name in the varname parameter of the img element, as well as the position and scale.
```
def usflag{art(shapename=rectangle x=100 y=100 w=500 h=300 fillcolor=white linecolor=white)
art(shapename=rectangle x=100 y=100 w=500 h=20 fillcolor=red linecolor=red).repeatvertically(spacing=43 repeat=6)
art(shapename=rectangle x=100 y=100 w=250 h=150 fillcolor=blue linecolor=blue)
background(color=teal)
art(shapename=circle x=118 y=118 w=10 h=10 fillcolor=yellow linecolor=yellow).repeathorizontally(spacing=43 repeat=5).repeatvertically(spacing=56 repeat=2)
art(shapename=circle x=140 y=145 w=10 h=10 fillcolor=yellow linecolor=yellow).repeathorizontally(spacing=43 repeat=4).repeatvertically(spacing=56 repeat=1)
}

draw{img(varname=usflag x=0 y=0 scale=1)}
```

And thats it! To summarize, codepainting supports...
* basic shape manipulation of circles and rectangles (width, height, x, y)
* basic color manipulation of shape elements (linecolor, linewidth, fillcolor)
* img manipulation
* operations on the elements
* chaining of operations on elements
* variable naming and variable painting

## Elements

<b> types of elements </b>
1. art - these are base elements supplied by the program that can be manipulated with more granularity. eg. position, rotiation, the line color, line width, background color, etc...
2. images - these are svg images which can be manipulated in a basic manner. eg. rotation, scale, position. However, they are typically more rich in their color/styling.
3. text - customizable text with some text specific things that can be changed. eg. text color, text background color.

<b> examples of valid inputs </b>
```
[element] eg. art()
[element].[operation] eg. art().repeathorizontally()
[element].[operation].[operation] eg. art().repeathorizontally().repeatvertically()
```

Every operation has parameters which specify certain things about the element or the operation. eg. where to place the image, or how many times to repeatedly paint the image.

<b> example of a possible command with some sample paramters </b>
```
art(name=art x=0 y=0 scale=0.5).repeathorizontally(spacing=30 repeat=10)
```
in the above examle, a art is put at (0,0) and is scaled to 50% of its default size. the art is the painted repeatedly 10 times across the screen, with each art being 30 pixels away from the previous. 

## General grammar layout and usage
### 1. every new line in the input describes the manipulation of a particular element.
eg. assume that we are going to manipulate art images.
```
circle(<some parameters described later>)
art(<some parameters described later>)
square(<some parameters described later>)
```
### 2. we can apply the dot operator to do some operation on the image described above.
eg. assume that we want to repeat repeateadly paint a art across the screen.
```
art(<some parameters described later>).repeathorizontally(<some parameters described later>)
```
### 3. the previous step can be though of as grouping individual elements to creating a new, larger element. This new element can again be operated on. These operations can be repeated. <b>'some parameter described later' will be shortened to spdl.</b> 
```
art(<spdl>).repeathorizontally(<spdl>)
```
### 4. each dot operation can be thought of as creating a new element (image), that can again be operated upon. The following is a valid input.
```
art(<spdl>).repeathorizontally(<spdl>).repeathorizontally(<spdl>)
```
Although the above is not particularly useful, we can chain different commands together. Assume that we have another command that repeatedly paints some element vertically instead of horizontally.
```
art(<spdl>).repeathorizontally(<spdl>).repeatvertically(<spdl>)
```
### 5. we can chain different operations together, since each operation yields a new picture, there is no practical limit on the types of chaining that can be done. Assume that we have an operation called <i>drawcircularly</i> that repeatedly paints the element in a circular pattern (think of the EU flag). The following would be valid input.
```
art(<spdl>).drawcircularly(<spdl>).repeathorizontally(<spdl>)
```
### 6. note that since each operation on an element (image) yields a new element (image), order can matter.
```
art(<spdl>).drawcircularly(<spdl>).repeathorizontally(<spdl>)
```
is not the same as
```
art(<spdl>).repeathorizontally(<spdl>).drawcircularly(<spdl>)
```
They are not the same because the first one draws circles with art (in this case, the art is a star), and then repeatedly pastes the circle of stars. The second one draws a line of stars, then pastes that line of stars into one circle. 

<b>first scenario</b> - art(spdl).drawcircularly(spdl).repeathorizontally(spdl)
```
    *   *   *
   * * * * * *
    *   *   *
    ^ that is a circle of stars
   |__________| 
     | that is a circle of stars being repeathorizontally drawna cross.
```
<b>second scenario</b> - art(spdl).repeathorizontally(spdl).drawcircularly(spdl)
```
    ***                  \  the stripe of repeated stars
  *** ***                 | being drawn into the shape
    ***                  /  of a circle. 
    ^ that is the stars 
      being repeated 
      horizontally
```
### 7. we can group together elements to create varialbe. Assume that we have the following elements: cloud, circle. we can use this to create a thought bubble by defining a new varialbe. 
```
def thoughtbubble {
art(name=cloud spdl)
art(name=circle spdl)
art(name=circle spdl)
art(name=circle spdl)
}
```
suppose the above element was defined, we can then use that element later on without having to define using the base elements (cloud, circle) again -- saving us time!
```
thoughtbubble(spdl)
```
note that since each newly defined element is treated as a new element, it supports all of the same parameters as image elements ('img') (more on this later). 

### 8. you can leave comments by entering "//" before a string. and terminating it with "//"
```
// this is a proper comment //
// this comment is not terminated
```

### 9. spacing and newlines matters when inputting commands!
* recall that every newline ('\n') involves the manipulation of one image. 
The following are valid inputs
```
art(...)
img(...)
text(...)
```
The following are invalid inputs
```
art(...) img(...) text(...)
```
* parameters have strict spacing requirements
1. each parameter specification must be separated by <i> atleast <b>one</b> space</i> from the next parameter. However, whether there are more than one spacing is inconsequential. 
2. parameters are case-sensitive. ie. h=12 is not the same as H=12.
the following are valid ways of entering parameters for each element.
```
art(name=star x=12 y=32 w=29 h=239)
art(name=star x=12    y=32 w=29     h=30)
```
the following are invalid ways of entering parameters for each element.
```
art(name=star x  = 12 y= 32 w =29 h=  239)
```
## EBNF
```
PROGRAM ::-  (DEF * DRAW ?)*
DEF ::- "def"  "{" ELEMENT.OPERATION* "}"
DRAW ::- "draw" "(" ELEMENT.name ")"
ELEMENT ::- ART | IMG | TEXT | BACKGROUND
BACKGROUND ::- "background"("color")
ART ::- "art"(APARAMETER)
APARAMETER ::- "x" | "y" | "w" | "h" | "rotation" | "linecolor" | "linewidth" | "backgroundcolor" | "name"
IMG ::- "img"(IPARAMETER?)
IPARAMETER ::- "x" | "y" | "scale" | "rotation" | "name"
TEXT ::- "text"(TPARAMETER)
TPARAMETER ::- "font" | "fontsize" | "fontcolor" | "backgroundcolor" | "rotation"
OPERATION ::- OPERATOR(OPARAMETER?)
OPERATOR ::- "repeathorizontally" | "repeatvertically" | "scatter" | "drawcircularly"
OPARAMETER ::- <<depends on the operator...>>
```

## The following types of elements are supported, and their possible parameters are described. The default values are also supplied for each paramter, as well as the unit each value is in.
### Supported Art
* circle
* rectangle

#### Art paramters
* linecolor (default: black)
* linewidth (default: 3 px)
* fillcolor (default: none)
* x (default: 0)
* y (default: 0)
* w (default: 100)
* h (default: 100)
* rotation (default: 0deg)
* shapename (circle | rectangle, string)

### Supported Img
* preset svg images in ./src/images/

#### Img parameters
* x (default: 0)
* y (default: 0)
* scale (default: 1)
* rotation (default: 0deg)
* name (filename, string)
* varname (string)

### Supported Text
* customizable text

#### Text parameters
* font (default: calibri)
* fontsize (default: 13point)
* fontcolor (default: black)
* fillcolor (default: none)
* rotation (default: 0deg)
