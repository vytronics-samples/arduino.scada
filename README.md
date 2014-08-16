#arduino.vytronics
Demo SCADA system to visualize and control your Arduino board.

Uses vytronics.hmi, the 100% free and open-source SCADA system.

Visit [www.vytronics.com] for more info.

Star our npm repositories if you think this is cool and want to see vytronics evolve into the worlds best open source SCADA
- [www.npmjs.org/package/vytronics.hmi] - Core vytronics components
- [www.npmjs.org/package/arduino.vytronics] - Arduino comm driver


EXPERIMENTAL
- Right now it support digital pin read/write and analog pin read. Soon will add PWM etc.
- Does not handle disconnect/reconnect but will.
- Uses [github.com/jgautier/firmata] but may eventually replace with more SCADA specific driver code

## How to use

Make sure you have [nodejs] installed on your computer.

Download the sample from https://github.com/vytronics-samples/arduino.scada.git and then do npm install.

```
git clone https://github.com/vytronics-samples/arduino.scada.git
cd arduino.scada
npm install
```


It will take a few minutes to download and build all of the dependencies. When it finishes you can run the SCADA system by typing the following command in the terminal:
```
node application
```

Browse to http://localhost:8000 to see your arduino. Click on digital pins to toggle values.

Explore the source code and have fun.


## License

AGPL

[https://github.com/vytronics-samples/arduino.scada.git]:https://github.com/vytronics-samples/arduino.scada.git
[www.vytronics.com]:http://www.vytronics.com
[github.com/vytronics/vytronics.hmi.git]:https://github.com/vytronics/vytronics.hmi.git
[www.npmjs.org/package/vytronics.hmi]:https://www.npmjs.org/package/vytronics.hmi
[www.npmjs.org/package/arduino.vytronics]:https://www.npmjs.org/package/arduino.vytronics
[github.com/jgautier/firmata]:https://github.com/jgautier/firmata
[nodejs]:http://nodejs.org/download/