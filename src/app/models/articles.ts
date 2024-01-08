export interface Article {
  id?: string;
  languageCode?: string;
  title?: string;
  source?: string;
  authors?: string[];
  chapterCount?: number;
  wordCount?: number;
  uniqueWordCount?: number;
  relatedWordCount?: number;
}
