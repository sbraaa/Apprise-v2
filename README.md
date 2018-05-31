## Custom version of no longer supported Apprise project
###### Custom version of original Apprise v2 from Daniel Raftery

Some new features:

- added support for textarea
> es.
> input: \<label\>, textarea: \<lines of text area\>, textarea_id: \<id textarea\>

- added support for radio buttons and groups of radio buttons
> es.<br>
> radio_groups: {<br>
> &nbsp;&nbsp;&nbsp;&nbsp;\<group id\> : {<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title : \<group title 1\>,<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;radios: {<br>
>	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<radio 1\>: {<br>
>	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:	\<radio id\>,<br>
>	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text: \<radio text\><br>
>	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;checked: \<boolean\><br>
>	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
>	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
>	&nbsp;&nbsp;&nbsp;&nbsp;}<br>
>	}

- added support for attributes on buttons
> es.<br>
> buttons: {<br>
> &nbsp;&nbsp;&nbsp;&nbsp;\<button name\>: {<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: \<id\>,<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text:	\<text\>,<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;attrName: \<attribute name\>,<br>
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;attrVal:	\<attribute value\>,<br>


- added support for locking Enter key (useful when editing textarea)
> enable_Enter: true

- added support for scrollable contents
> scrollable_content: false

- added buttons inline display mode and buttons min height parameter
> buttons_inline: false
> buttons_inline_min_height: 30

