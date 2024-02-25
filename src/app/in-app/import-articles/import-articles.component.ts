import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ArticleService } from '../../shared/services/articles.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-import-articles',
  standalone: true,
  imports: [FormsModule, MatIconModule, LoadingComponent],
  templateUrl: './import-articles.component.html',
  styleUrls: ['./import-articles.component.scss']
})
export class ImportArticlesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropArea') dropArea!: ElementRef<HTMLDivElement>;
  htmlUrl: string = "";
  error: string = "";
  loading: boolean = false;

  @Output() closingEvent = new EventEmitter<boolean>();

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  fileChanged(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type !== "application/epub+zip") {
        alert("Wrong file type");
        return;
      }
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    this.loading = true;
    const formData = new FormData();
    formData.append('file', file);

    this.articleService.importEpubFromFile(formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/app/read/' + response.id]);
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      }
    });
  }

  highlightDropArea() {
    this.dropArea.nativeElement.classList.add('is-active');
  }

  unhighlightDropArea() {
    this.dropArea.nativeElement.classList.remove('is-active');
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    this.unhighlightDropArea();
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0];
      if (file && file.type === "application/epub+zip") {
        this.uploadFile(file);
      } else {
        alert("Wrong file type");
      }
    }
  }

  close() {
    this.closingEvent.emit(true);
  }
}
