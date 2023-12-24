## node-csi
This is something that I've found myself writing over and over again (or at least parts of) for the various projects that I've worked on. ANSI color schemes were all the rage growing up (*yes I'm old*) and I've written a few different things in node.js now where I've desired more color than the console typically delivers these days.

### How It Works
Based largely in part on the information present in [the wikipedia page on ANSI escape codes](http://en.wikipedia.org/wiki/ANSI_escape_code), this small modules attempts to make it easier to colorize the output in various projects and do simple things with the cursor.

I'm honestly not sure if this version is at all the way I'd like to continue using the product but it is good enough to base a few other of my features on.

### Version

1.0.2 - This is essentially the first commit and provides basic functionality with very little documentation or extensibility.

### Potential Plans

#### Installation
`npm install node-csi`

#### Features
All of the following features are dependant upon your terminal program and it's capabilities.

- Move the cursor up/down/left/right etc...
- Erase part of a line or the entire line
- Erase part of the display or the entire display
- Scroll the contents up or down
- Move the cursor from one position to another
- Show or hide the cursor
- Make text BOLD or not BOLD
- Make text FAINT or NORMAL
- Make text ITALIC or not ITALIC
- Make the text blink and possibly blink fast
- Reverse the foreground/background colors
- Conceal or cross out the text (rarely supported)
- Change the font to one of the predefined ones (rarely supported)
- Set the foreground and background colors to normal or high intensity colors
- If supported the RGB color text
- If supported the 256 color text
- If supported ideogramming, framed, encircled and/or overlined text

#### Caveats
Not all of these features are tested as my terminal doesn't support all of them. That being said, if you find a bug or wish the library functioned differently, let me know. I'm not convinced I like it very well myself just yet.
