import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';
import { ArticleService } from '../../services/articles.service';

@Component({
  selector: 'app-import-articles',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './import-articles.component.html',
  styleUrl: './import-articles.component.scss'
})
export class ImportArticlesComponent {
  test: any = "";
  htmlUrl: any = "";

  constructor(
    private articleService: ArticleService,
  ) {}
  
  ngOnInit(){
    let fileInput:any = document.getElementById('myFile')
    console.log(fileInput);
    let droparea = $('.file-drop-area');

    // highlight drag area
    $('.file-input').on('dragenter focus click', function() {
      droparea.addClass('is-active');
    });

    // back to normal state
    $('.file-input').on('dragleave blur drop', function() {
      droparea.removeClass('is-active');
    });

    fileInput.addEventListener('change', (e:any)=> {
      let $textContainer =  $('.file-input').prev();
      let extension = fileInput.files[0].type
      if(extension!=="application/epub+zip"){
        alert("wrong file type")
        return
      }
      let fileName = fileInput.value.split('\\').pop();
      $textContainer.text(fileName);
      if(fileInput.value.length>0){
          droparea.css('background', 'var(--success-1)');
          droparea.css('color', 'white')
      }
      let file = e.target.files[0]
      console.log(file);
      this.articleService.importEpubFromFile(file).subscribe((response) => {
        console.log(response);
      });
    })
  }
  afterRender(){
  }
  ngAfterViewInıt(){
  }
}
