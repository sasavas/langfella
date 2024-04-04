export interface Article {
  id?: string;
  languageCode?: string;
  level?: string;
  title?: string;
  source?: string;
  authors?: string[];
  chapterCount?: number;
  wordCount?: number;
  uniqueWordCount?: number;
  relatedWordCount?: number;
}

export interface DetailedArticle {
  id?: string;
  userId?: string;
  languageCode?: string;
  title?: string;
  source?: string;
  authors?: Author[];
  chapters?: Chapter[];
  wordCount?: number;
  uniqueWordCount?: number;
  words?: Word[];
}

export interface Author {
  id?: number;
  articleId?: string;
  article?: string;
  firstName?: string;
  lastName?: string;
}

export interface Chapter {
  id?: number;
  title?: string;
  articleId?: string;
  contents?: Content[];
}

export interface Content {
  id?: number;
  tag?: string;
  content?: string;
}

export interface Word {
  id?: string;
  userId?: string;
  text?: string;
  sourceLanguageCode?: string;
  targetLanguageCode?: string;
  familiarity?: Familiarity;
  articleId?: string;
  translations?: Translation[];
  exampleSentences?: ExampleSentence[];
}

export interface ExampleSentence {
  id?: number;
  text?: string;
  chapterId?: number;
  articleId?: string;
}

export interface Familiarity {
  familiarityLevel?: string;
}

export interface Translation {
  text?: string;
}
