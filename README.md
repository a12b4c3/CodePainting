# CodePainting
## Goal
Code painting is designed to let gradeschool students learn to code, through a fun and intuitive language. It should be easy to understand, requring little knowledge of programming. It should be visual, and use programming syntaxes similar to those seen in existing languages.
## Overview
Users can paint with default line art images (circle, rectangle, cloud, art), svg images, or add text onto the canvas. All art, images, and text will be called 'elements'. Every line of input artts with an element, followed by zero or more operations, denoted using dot operaters ('.'). Operations are commands which 'do' something with that image, such as repeatedly draw it across a screen, or draws it into the shape of a circle, or scatters it randomly over the screen...etc.

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
### 7. we can group together elements to create one larger element. Assume that we have the following elements: cloud, circle. we can use this to create a thought bubble by defining a new element. 
```
group as thoughtbubble {
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
PROGRAM ::- ELEMENT.OPERATION* | "//"STRING"//"
ELEMENT ::- ART | IMG | TEXT
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
* triangle (simple equilateral triangle)
* rectangle

#### Art paramters
* linecolor (default: black)
* linewidth (default: 1 point)
* backgroundcolor (default: none)
* x (default: 0)
* y (default: 0)
* w (default: canvas.width/20)
* h (default: canvas.height/20)
* rotation (default: 0deg)

### Supported Img
* preset svg images in ./src/images/

#### Img parameters
* x (default: 0)
* y (default: 0)
* scale (default: 1)
* rotation (default: 0deg)

### Supported Text
* customizable text

#### Text parameters
* font (default: calibri)
* fontsize (default: 13point)
* fontcolor (default: black)
* backgroundcolor (default: none)
* rotation (default: 0deg)
