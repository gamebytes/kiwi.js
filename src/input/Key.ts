/// <reference path="../core/Game.ts" />

/**
 *	Kiwi - Input - Key
 *
 *	@desc 		A compact object that holds the most important details about a Keyboard Event response
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 */

module Kiwi.Input {

    export class Key {

        /** 
        * Constructor
        * @param {Kiwi.Input.Keyboard} manager. 
        * @param {Number} keycode. 
        * @param {KeyboardEvent} [event].
        * @return {Kiwi.Input.Key} This object.
        */
        constructor (manager: Kiwi.Input.Keyboard, keycode: number, event?: KeyboardEvent) {

            this._manager = manager;
            this.keyCode = keycode;

            if (event)
            {
                this.update(event);
            }

        }

        public objType() {
            return "Key";
        }

        /** 
        * 
        * @property _manager
        * @type Kiwi.Input.Keyboard
        * @private
        **/
        private _manager: Kiwi.Input.Keyboard;

        /** 
        * 
        * @property keyCode
        * @type Number
        **/
        public keyCode: number;

        /** 
        * 
        * @property isDown
        * @type Boolean
        **/
        public isDown: bool = false;

        /** 
        * 
        * @property isUp
        * @type Boolean
        **/
        public isUp: bool = false;

        /** 
        * 
        * @property altKey
        * @type Boolean
        **/
        public altKey: bool = false;

        /** 
        * 
        * @property ctrlKey
        * @type Boolean
        **/
        public ctrlKey: bool = false;

        /** 
        * 
        * @property shiftKey
        * @type Boolean
        **/
        public shiftKey: bool = false;

        /** 
        * 
        * @property timeDown
        * @type Number
        **/
        public timeDown: number = 0;

        /** 
        * 
        * @property duration
        * @type Number
        **/
        public duration: number = 0;

        /** 
        * 
        * @property timeUp
        * @type Number
        **/
        public timeUp: number = 0;

        /** 
        * 
        * @property repeats
        * @type Number
        **/
        public repeats: number = 0;

        /** 
        * 
        * @method update
        * @param {KeyboardEvent} event.
        * @return {} 
        */
        public update(event: KeyboardEvent) {

            this.keyCode = event.keyCode;

            if (event.type === 'keydown')
            {
                this.altKey = event.altKey;
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;

                if (this.isDown === true)
                {
                    //  Key was already held down, this must be a repeat rate based event
                    this.repeats++;
                }
                else
                {
                    this.isDown = true;
                    this.isUp = false;
                    this.timeDown = event.timeStamp;
                    this.duration = 0;
                }
            }
            else if (event.type === 'keyup')
            {
                this.isDown = false;
                this.isUp = true;
                this.timeUp = event.timeStamp;
            }

        }

        /** 
        * 
        * @method justPressed
        * @param {Number} [duration].
        * @return {Boolean} 
        */
        public justPressed(duration:number = this._manager.justPressedRate): bool {

            if (this.isDown === true && (this.timeDown + duration) < this._manager.game.time.now())
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /** 
        * 
        * @method justReleased
        * @param {Number} [duration].
        * @return {Boolean} 
        */
        public justReleased(duration:number = this._manager.justReleasedRate): bool {

            if (this.isUp === true && (this.timeUp + duration) < this._manager.game.time.now())
            {
                return true;
            }
            else
            {
                return false;
            }

        }

    }

}