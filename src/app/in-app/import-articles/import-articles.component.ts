import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';
import { ArticleService } from '../../shared/services/articles.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';


@Component({
  selector: 'app-import-articles',
  standalone: true,
  imports: [FormsModule, MatIconModule, LoadingComponent],
  templateUrl: './import-articles.component.html',
  styleUrl: './import-articles.component.scss'
})
export class ImportArticlesComponent {
  test: any = "";
  htmlUrl: any = "";
  error: string = "";
  loading: boolean = false;

  @Output() closingEvent = new EventEmitter<boolean>();

  constructor(
    private articleService: ArticleService,
    private router: Router
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
      this.loading = true;
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      this.articleService.importEpubFromFile(formData).subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/app/read/'+response.id])
        },
        error: (err) => {
          //TO DO: SWITCH CASE ALL ERRORS
          this.loading = false;
          this.error = err;
        }
      });
    })
  }
  afterRender(){
  }
  ngAfterViewInıt(){
  }

	close() {
		this.closingEvent.emit(true);
	}
}
