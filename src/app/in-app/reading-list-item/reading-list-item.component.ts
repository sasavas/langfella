import { Component, Input } from '@angular/core';
import { Article } from '../../shared/models/articles';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reading-list-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './reading-list-item.component.html',
  styleUrl: './reading-list-item.component.scss',
})
export class ReadingListItemComponent {
  @Input() article: Article = {};

  yuvarlaVeDuzenle(sayi: number): string | number {
    // Sonucu bir ondalık basamağa yuvarla
    let yuvarlanmis = Number(sayi.toFixed(1));
    
    // Eğer sonuç .0 ile bitiyorsa tam sayı olarak döndür, değilse yuvarlanmış sonucu döndür
    if (yuvarlanmis % 1 === 0) {
      return yuvarlanmis.toFixed(0); // Tam sayıyı string olarak döndürür
    } else {
      return yuvarlanmis; // Yuvarlanmış sayıyı döndürür
    }
  }

  estimatedTime(wordCount:number){
    let estimatedTime:any = 0;
    estimatedTime = Math.ceil(wordCount/150)
      if(estimatedTime > 60){
        estimatedTime = this.yuvarlaVeDuzenle(estimatedTime / 60) + " h reading";
        return estimatedTime
      }else{
        estimatedTime = estimatedTime + " m reading"
        return estimatedTime
      }
  }




}
