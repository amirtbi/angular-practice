import { DestroyRef, Directive, ElementRef, inject, input, Renderer2, signal } from "@angular/core";

@Directive({
    selector:"[appTooltip]",
    standalone:true,
    host:{
       '(mouseenter)': 'show()',
        '(mouseleave)': 'hide()',
        '(focus)': 'show()',
        '(blur)': 'hide()'
    }
})
export class AppTooltip{
    appTooltip = input("")

    private element = inject(ElementRef)
    private renderer =inject(Renderer2)
    private destroyRef = inject(DestroyRef)

    private tooltipElement?:HTMLElement


    constructor(){
        this.destroyRef.onDestroy(()=>{this.hide()})
    }


    show(){
        if(this.tooltipElement) return

        const tooltip = this.renderer.createElement("span");

        this.renderer.setProperty(
            tooltip,
            "textContent",
            this.appTooltip()
        )

        this.renderer.addClass(tooltip,"app-tooltip")

        this.renderer.appendChild(
            this.element.nativeElement,
            tooltip
        )

        this.tooltipElement = tooltip
    }

    hide(){

        if(!this.tooltipElement) return;

        this.renderer.removeChild(this.element.nativeElement,this.tooltipElement)


        this.tooltipElement = undefined
    }

}