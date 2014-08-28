//arduino.js - External instrumentation script for arduino-board.svg HMI display
/*
Copyright 2014 Vytroncs.com and Charles Weissman

This file is part of "Vytroncs HMI, the 100% Free, Open-Source SCADA/HMI Initiative"
herein referred to as "Vytronics HMI".

Vytronics HMI is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Vytronics HMI is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with Vytronics HMI.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
This script defines arduino-board.svg specific instrumentation code. The scripts
rely heavily on strict naming conventions to allow multiple tags and logic to be applied via
a single function call given just a group name or id attribute in liue of adding specific
instrumentation directives for each SVG element. I.e., this script is kind of supporting
a graphics templating method.
*/

console.log('Hello from arduino.js instrument script!');


//Some globals
var color_const = {
    gray: '#a39a9a',
    orange: '#fcb500',
    cyan: '#0ffafa',
    yellow: '#ffff00',
    white: '#ffffff',
    green: '#00ff00',
    red: '#ff0000'
};

var board_colors = {
    DIGI_LED_ON: color_const.green,
    DIGI_LED_OFF: color_const.white,
    TXRX_LED_ON: color_const.yellow,
    BACKGROUND: color_const.white
};

/*============ Document stuff=================*/
//Setup the page and parse. This is called at the end of this script file.
function instrument_board() {
    var i;
    
    var elem = document.documentElement;
    
    vyhmi.scale_fit_svg(elem,color_const.BACKGROUND);
    
    //Define the element classes to instrument and the function to call to do it
    var instrument_classes = {
        digital_pin: instr_digital_pin,
        analog_pin: instr_analog_pin
    };
    
    Object.getOwnPropertyNames(instrument_classes).forEach( function (class_name){
        var elems = elem.querySelectorAll('.' + class_name);
        for (var i=0; i<elems.length; i++){
            instrument_classes[class_name](elems[i]);
        }
    });
}

/*
Instrument a digital pin SVG group. Looks for the LED shape and MODE text elements and
gives them some tag callbacks. The id attribute of the group muust be of form: digital.pin.x
where x = the pin number.
*/
function instr_digital_pin(elem){
        
    var LED_elem = elem.querySelector('.lamp');
    var MODE_elem = elem.querySelector('.mode_txt');
    var mode, value; //Remember current mode and value.
    
    //Subscribe to value tag and apply to the lamp graphic
    var led_tagid = elem.id + '.value';
    vyhmi.create_tagsub(led_tagid, function(tag) {
        value = tag.value;
        LED_elem.style.fill = value=='ON' ? board_colors.DIGI_LED_ON : board_colors.DIGI_LED_OFF;
    });
    
    //Subscribe to mode tag and apply to the mode text graphic
    vyhmi.create_tagsub(elem.id + '.mode', function(tag) {
        mode = tag.value; //remember mode
        MODE_elem.textContent = mode ? mode : '????';
    });
    
    //Add click callback to toggle outut values
    elem.addEventListener('click', function(){
        if ( mode === 'OUTPUT' ) {
            var write_val = (value==='ON')? 'OFF' : 'ON'; //toggle
            console.log('####write:' + write_val);
            vyhmi.app_call('write_tag_request', { tagid:led_tagid, value: write_val });
        }
        else {
            alert('Cannot write to input pins.');
        }
    });
    
}   


/*
Instrument a analog pin SVG group. Looks for the LED shape, bar_meter and readout text elements and
gives them some tag callbacks. The id attribute of the group muust be of form: analog.pin.x
where x = the pin number.
*/
function instr_analog_pin(elem){
        
    var LED_elem = elem.querySelector('.lamp');
    var readout_elem = elem.querySelector('.readout');
    var bar_elem = elem.querySelector('.bar');
    var bar_background_elem = elem.querySelector('.bar_background');
    
    //If we do not scale the analog values they will be between 0 and 1023
    
    //Subscribe to value tag and apply to the lamp graphic
    var tagid = elem.id + '.value';
    vyhmi.create_tagsub(tagid, function(tag) {
        LED_elem.style.fill = tag.value>0 ? board_colors.DIGI_LED_ON : board_colors.DIGI_LED_OFF;
        
        //Set brightness based on value
        LED_elem.style.fillOpacity = tag.value>0? ((tag.value)/ 1023) : 1.0;
        
    });
    
    //Digital readout
    vyhmi.create_tagsub(tagid, function(tag) {
        readout_elem.textContent = tag.value.toFixed(2);
    });
    
    //Bar graph
    var max_width = bar_background_elem.getAttribute('width');
    vyhmi.create_tagsub(tagid, function(tag) {
        var bar_width = (tag.value / 1023) * max_width;
        bar_elem.setAttribute('width', bar_width);
    });
}   


instrument_board();
