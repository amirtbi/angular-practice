import { Directive, effect, ElementRef, inject, input, output, signal } from "@angular/core";

@Directive({
    selector:"[appHighlight]",
    standalone:true,
    host:{
        '(mouseenter)':'mouseEnter()',
        '(mouseleave)':'mouseLeave()',
        '(click)':'handleClick()',
        '[class.active]':'isHovered()'
    }
})
export class HighlightDirective{
    protected isHovered =signal(false)
    appHighligh =input()
    clickEmitter = output<string>();
    

    constructor(){
        effect(()=>{
            console.log("hovered changed")
        })
    }


    handleClick(){
        this.clickEmitter.emit("hi")
    }

    mouseEnter(){
        this.isHovered.set(true)
    }

    mouseLeave(){
        this.isHovered.set(false)
    }

}