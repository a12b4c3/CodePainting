# CodePainting
## Goal
Code painting is designed to let gradeschool students learn to code, through a fun and intuitive language. It should be easy to understand, requring little knowledge of programming. It should be visual, and use programming syntaxes similar to those seen in existing languages.
## Overview
Users can paint with default line art images (circle, rectangle, cloud, star), svg images, or add text onto the canvas. All art, images, and text will be called 'elements'. Every line of input starts with an image, followed by zero or more operations, denoted using dot operatrs ('.'). Operations are commands which 'do' something with that image, such as repeatedly draw it across a screen, or draws it into the shape of a circle, or scatters it randomly over the screen.

<b> types of elements </b>
1. art - these are base images supplied by the program that can be manipulated with more granularity. eg. position, rotiation, the line color, line width, background color, etc...
2. images - these are svg images which can be manipulated in a basic manner. eg. rotation, scale, position
3. text - customizable text with some text specific things that can be changed. eg. text color, text background color.

<b> examples of valid inputs </b>
```
[element] eg. star()
[element].[operation] eg. star().repeathorizontally()
[element].[operation].[operation] eg. star().repeathorizontally().repeatvertically()
```

Every operation has parameters which specify certain things about the element or the operation. eg. where to place the image, or how many times to repeatedly paint the image.

<b> example of a possible command with some sample paramters </b>
```
star(x=0 y=0 scale=0.5).repeathorizontally(spacing=30 repeat=10)
```
in the above examle, a star is put at (0,0) and is scaled to 50% of its default size. the star is the painted repeatedly 10 times across the screen, with each star being 30 pixels away from the next. 

## General grammar layout and usage
### 1. every new line in the input describes the manipulation of a particular element.
eg. assume that we are going to manipulate art images.
```
circle(<some parameters described later>)
star(<some parameters described later>)
square(<some parameters described later>)
```
### 2. we can apply the dot operator to do some operation on the image described above.
eg. assume that we want to repeat repeateadly paint a star across the screen.
```
star(<some parameters described later>).repeathorizontally(<some parameters described later>)
```
### 3. the previous step can be though of as grouping individual elements to creating a new, larger element. This new element can again be operated on. These operations can be repeated. <b>'some parameter described later' will be shortened to spdl.</b> 
```
star(<spdl>).repeathorizontally(<spdl>)
```
### 4. each dot operation can be thought of as creating a new element (image), that can again be operated upon. The following is a valid input.
```
star(<spdl>).repeathorizontally(<spdl>).repeathorizontally(<spdl>)
```
Although the above is not particularly useful, we can chain different commands together. Assume that we have another command that repeatedly paints some element vertically instead of horizontally.
```
star(<spdl>).repeathorizontally(<spdl>).repeatvertically(<spdl>)
```
### 5. we can chain different operations together, since each operation yields a new picture, there is no practical limit on the types of chaining that can be done. Assume that we have an operation called <i>drawcircularly</i> that repeatedly paints paints the element in a circular pattern (think of the EU flag). The following would be valid input.
```
star(<spdl>).drawcircularly(<spdl>).repeathorizontally(<spdl>)
```
### 6. note that since each operation on an element (image) yields a new element (image), order can matter.
```
star(<spdl>).drawcircularly(<spdl>).repeathorizontally(<spdl>)
```
is not the same as
```
star(<spdl>).repeathorizontally(<spdl>).drawcircularly(<spdl>)
```
They are not the same because the first one draws circles with stars, and then repeatedly pastes the circle of stars. The second one draws a line of stars, then pastes that line of stars into one circle. 

<b>first scenario</b> - star(spdl).drawcircularly(spdl).repeathorizontally(spdl)
```
    *   *   *
   * * * * * *
    *   *   *
    ^ that is a circle of stars
   |__________| 
     | that is a circle of stars being repeathorizontally drawna cross.
```
<b>second scenario</b> - star(spdl).repeathorizontally(spdl).drawcircularly(spdl)
```
    ***                  \  the stripe of repeated stars
  *** ***                 | being drawn into the shape
    ***                  /  of a circle. 
    ^ that is the star 
      being repeated 
      horizontally
```
### 7. we can group together elements to create one larger element. Assume that we have the following elements: cloud, circle. we can use this to create a thought bubble by defining a new element. 
```
group as thoughtbubble {
cloud(spdl)
circle(spdl)
circle(spdl)
circle(spdl)
}
```
suppose the above element was defined, we can then use that element later on without having to define using the base elements (cloud, circle) again -- saving us time!
```
thoughtbubble(spdl)
```
note that since each newly defined element is treated as a new element, it supports all of the same parameters as images (more on this later). 

## EBNF
```
PROGRAM ::- (ART) "(" ARTPARAMS ")." ( OPERATOR "("OPERATOR PARAMETERS" ")"

```
