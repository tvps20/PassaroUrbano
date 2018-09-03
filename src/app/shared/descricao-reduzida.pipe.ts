import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    
    transform(text: string, truncarEm: number, iniciarEm: number): string {
        if(text.length > truncarEm)
            return text.substr(iniciarEm, 15) + '...';

        return text;
    }

}