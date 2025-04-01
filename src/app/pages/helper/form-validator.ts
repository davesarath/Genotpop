import {FormGroup, FormArray, AbstractControl} from '@angular/forms';
import {ElementRef} from '@angular/core';


export class FormValidator {


    constructor(
        private validationMessages: { [strKey: string]: any }
    ) {
    }

    processMessages(container: any, blnConsiderDirty = true): { [strKey: string]: any } {
        let messages:{[x:string]:any} = {};
        for (const strControlKey in container.controls) {
            if (container.controls.hasOwnProperty(strControlKey)) {
                const objTemp:{[x:string]:any} = {};
                const c = container.controls[strControlKey];
                /**
                 * If it is a FormGroup, process its child controls.
                 */
                if (c instanceof FormGroup) {
                    const childMessages = this.processMessages(c, blnConsiderDirty);
                    objTemp[strControlKey] = childMessages;
                    messages = {...messages, ...objTemp};
                } 
                else if(c instanceof FormArray){
                    const childMessages = this.processMessages(c, blnConsiderDirty);
                    objTemp[strControlKey] = childMessages;
                    messages = {...messages, ...objTemp};
                }
                else {
                    /**
                     * Only validate if there are validation messages for the control
                      */
                    if (this.validationMessages[strControlKey]) {
                        messages[strControlKey] = '';
                        if ( (!blnConsiderDirty || (c.dirty || c.touched)) && c.errors) {
                            for (const strMessageKey in c.errors) {
                                if (this.validationMessages[strControlKey][strMessageKey]) {
                                    messages[strControlKey] += this.validationMessages[strControlKey][strMessageKey];
                                }
                            }
                        }
                    }
                }
            }
        }
        return messages;
    }
}
