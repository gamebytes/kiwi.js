///<reference path="../kiwi.ts" />

/*
 *	Kiwi - HUD - HUDWidget
 *
 *	@desc		The HUDWidget is an abstract class containing all of the fundamentals that every HUDWidget will need to have.
 *
 *	@version	1.0 - 26th July 2013
 *				
 *  @author     Ross Kettle
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.HUD {

    export class HUDWidget {
        
        /**
        *
        * @constructor
        * @param {string} name - Name of the type of HUDWidget.
        * @param {number} x 
        * @param {number} y
        * @return {Kiwi.HUD.HUDWidget}
        **/
        constructor(name: string,x:number,y:number) {
            this.name = name;
            this.container = <HTMLDivElement>document.createElement("div");
            this.container.style.position = "absolute";
            this.components = new Kiwi.ComponentManager(Kiwi.HUD_WIDGET, this);
            this.onCoordsUpdate = new Kiwi.Signal();
            this.x = x;
            this.y = y;
        }
        
        /*
        * Called when the cooridnates of the HUD Widget updates.
        * @property onCoordsUpdate
        * @type Kiwi.Signal
        */
        public onCoordsUpdate: Kiwi.Signal;

        /*
        * The x coordinate of the widget
        * @property _x
        * @type number
        */
        private _x: number;
        
        /*
        * Get the x coordinate of the widget
        * @type number
        */
        public get x():number {
            return this._x;
        }
        
        /*
        * Set the x coordinate of the widget
        * @type number
        */
        public set x(value: number) {
            this._x = value;
            this.container.style.left = this.x + "px";
            this.onCoordsUpdate.dispatch(this.x, this.y);
        }
        
        /*
        * The y coordinate of the widget
        * @property _y
        * @type number
        */
        private _y: number;
        
        /*
        * Get the y coordinate of the widget
        * @type number
        */
        public get y(): number {
            return this._y;
        }
        
        /*
        * Set the y coordinate of the widget
        * @type number
        */
        public set y(value: number) {
            this._y = value;
            this.container.style.top = this.y + "px";
            this.onCoordsUpdate.dispatch(this.x, this.y);
        }
        
        /**
        * The list of components that the HUDWidget use's.
        * @public
        **/
        public components: Kiwi.ComponentManager;
        
        /**
        * The HTMLElement of the widget.
        * @public
        **/
        public container: HTMLDivElement;

        /**
        * The name of the widget. Also used to identify the type of widget.
        * @public
        **/
        public name: string;

        /**
        * When a template has been set, this property will have a reference to the HTMLElement we can place the HUDWidget information into.
        * @public
        **/
        public tempElement: HTMLElement;

        /**
        * The parent of the template container. So that when removing a template we can place it in the right spot
        * @private
        **/
        private _tempParent: HTMLElement;

        /**
        * The container element for the template
        * @private
        **/
        private _tempContainer: HTMLElement; 

        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        *
        * Can be used by itself but maybe more useful if you customise it to suit your own needs. 
        *
        * @method setTemplate
        * @param {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param {string} element - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        **/
        public setTemplate(main: string, element?: string, ...paramsArr: any[]) {

            var containerElement: HTMLElement = document.getElementById(main);
            if (containerElement === undefined) {
                console.log('Container element not found');
                return;
            }

            if (element === undefined) {
                var fieldElement = containerElement;
            } else {
                var fieldElement: HTMLElement = document.getElementById(element);
                if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                    console.log('Field element not found inside container');
                    return;
                }
            }
            
            this.tempElement = fieldElement;
            this._tempContainer = containerElement;
            this._tempParent = containerElement.parentElement;
            this._tempParent.removeChild(containerElement);
            this.container.appendChild(containerElement);
        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * 
        * @method removeTemplate
        **/
        public removeTemplate() {
            if (this.tempElement !== undefined) {
                this.container.removeChild(this._tempContainer);
                this._tempParent.appendChild(this._tempContainer);
                this.tempElement = null;
                this._tempParent = null;
                this._tempContainer = null;
            }
        }

        /**
        * Give the container element a class so that you can make it look beautiful using CSS.
        *
        * @method setStyle
        * @param {String} cssClass
        **/
        public setStyle(cssClass: string) {
            this.container.className = cssClass;
        }

        /**
        *
        * @method update
        **/
        public update() {
            this.components.update();
        }

    }
}

