# SnapToTop
This library helps you fix every element you want to a specific position, when the element has to be fixed.

This library is like no other in this area, because it replaces the choosen element with a hidden element, with the same size and HTML tag. This helps the content to stand still even though the element is ripped out off it.

With the arguments below, you can control the plugin:
```
options: {
  replacementClass: 'snap-to-top-replacement',
  activeClass: 'fixed-snap',
  distance_top: 20,
  distance_bottom: 20,
  animation: true,
  animationDuration: 500,
  atStart: function(element){},
  atEndVanish: true,
  atEnd: function(element){}
}
```
**replacementClass**: the class of the replacement element.

**activeClass**: the class which the element gets when it is fixed.

**distance_top & distance_bottom**: the distance from the top and bottom before its getting fixed(as default it is set to 20px, which means the element is getting *snapped* 20px before the window gets to it).

**animation**: should the element have animation when its at the bottom

**animationDuration**: if the element has animation how long time, in miliseconds, should it run through.

**atStart**: a function which is called right before the element is getting fixed.

**atEndVanish**: should the element disappear when it makes it to the end?

**atEnd**: a function which is called when the element is at the end

Even though the arguments for these events is set, when you call *$(element).SnapToTop(arguments);*, you can specify arguments with HTMl attributes, which overwrites the already started settings.

**For example:**

```
<div class="snap-to-top" data-parent=".sppb-section.frontpage-row.video.dinero-video" data-distance-top="50" data-distance-bottom="20" data-vanish="0">This is getting fixed</div>
<script>
$(document).ready(function(){
  $('.snap-to-top').SnapToTop();
});
</script>
```

I hope you like it!

Regards GWDhost

PS: This is my first plugin :P
