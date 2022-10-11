import { ElementRef } from "@angular/core";

declare var M: any;

export class MaterialService {

    static toast(message: string) {
        M.toast({html: message})
    }

    static initSlider(ref: ElementRef) {
        M.Carousel.init(ref.nativeElement, {
            fullWidth: false,
            numVisible: 3,
            shift: 200
        });
    }
    
}