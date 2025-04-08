joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    if (initialized && status) {
        radio.sendValue("lights", 2)
    }
    if (initialized && !(status)) {
        radio.sendValue("command", 2)
    }
})
input.onButtonPressed(Button.A, function () {
	
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    if (initialized && status) {
        radio.sendValue("lights", 6)
    }
    if (initialized && !(status)) {
        radio.sendValue("command", 6)
    }
})
input.onButtonPressed(Button.AB, function () {
    radio.sendValue("command", 0)
})
input.onButtonPressed(Button.B, function () {
	
})
radio.onReceivedValue(function (name, value) {
    if (name == "pong") {
        connection = value
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    if (initialized && status) {
        radio.sendValue("lights", 8)
    }
    if (initialized && !(status)) {
        radio.sendValue("command", 8)
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    if (initialized && status) {
        radio.sendValue("lights", 4)
    }
    if (initialized && !(status)) {
        radio.sendValue("command", 4)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    switch_mode()
})
function switch_mode () {
    status = !(status)
    if (status) {
        basic.showLeds(`
            . . # # .
            . # # # #
            . # # # #
            . . # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . # # .
            # # . # .
            # . . . #
            . # . # #
            . # # . .
            `)
    }
}
let position_Y = 0
let position_X = 0
let connection = 0
let initialized = false
let status = false
status = false
initialized = false
// NEED TO SET!
radio.setGroup(17)
connection = 0
joystickbit.initJoystickBit()
basic.showLeds(`
    . . # # .
    # # . # .
    # . . . #
    . # . # #
    . # # . .
    `)
initialized = true
loops.everyInterval(200, function () {
    radio.sendValue("ping", connection)
})
loops.everyInterval(100, function () {
    // Y
    //                   ⩑
    //                   ¦
    //       ⨀          ⨀ [0,1023]
    //  [1023,1023]      ¦    
    //                   ¦
    //                   ¦
    //                   ¦
    //                   ¦
    //                   ¦
    //  X <--⨀----------⨁ 
    //    [1023,0]     [0,0]
    if (initialized && status) {
        position_X = Math.trunc(Math.map(joystickbit.getRockerValue(joystickbit.rockerType.X), 1023, 0, -100, 100))
        position_Y = Math.trunc(Math.map(joystickbit.getRockerValue(joystickbit.rockerType.Y), 0, 1023, -100, 100))
        radio.sendValue("drive", ValPacker.pack(position_X, position_Y))
    }
})
